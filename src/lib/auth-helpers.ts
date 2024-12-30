// lib/auth-helpers.ts
import { supabase } from './supabase';
import { prisma } from "@/libs/prismaDb";
import bcrypt from 'bcrypt';
import { AuthError, Session, User as SupabaseUser } from '@supabase/supabase-js';
import { User, UserRole } from '@prisma/client';

export interface UserCreateData {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
}

export interface UserAuthResult {
  user: User | null;
  supabaseSession: Session | null;
  error?: string | null;
}

export async function syncUserToSupabase(
  email: string, 
  password: string
): Promise<Session | null> {
  try {
    // Check if user exists in Supabase
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    
    const existingUser = users?.users.find(user => user.email === email);

    if (!existingUser && !listError) {
      // Create new user in Supabase
      const { data: { user }, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {  // Changed from options to user_metadata
            platforms: ['visiontrack']
          }
      });

      if (createError) {
        console.error('Error creating Supabase user:', createError);
        return null;
      }

      // Sign in the newly created user to get a session
      const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Error signing in new user:', signInError);
        return null;
      }

      return session;
    }

    // If user exists, authenticate them
    const { data: { session }, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error('Error signing in to Supabase:', authError);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error in syncUserToSupabase:', error);
    return null;
  }
}

export async function createUserWithSync(userData: UserCreateData): Promise<UserAuthResult> {
  try {
    // Input validation
    if (!userData.email || !userData.password) {
      return {
        user: null,
        supabaseSession: null,
        error: 'Email and password are required'
      };
    }

    // Check if user already exists in Prisma
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email.toLowerCase() }
    });

    if (existingUser) {
      return {
        user: null,
        supabaseSession: null,
        error: 'User already exists'
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // Create user in Prisma
    const prismaUser = await prisma.user.create({
      data: {
        email: userData.email.toLowerCase(),
        password: hashedPassword,
        name: userData.name,
        role: userData.role || 'STAFF'
      }
    });

    // Sync to Supabase
    const supabaseSession = await syncUserToSupabase(
      userData.email,
      userData.password
    );

    return {
      user: prismaUser,
      supabaseSession,
      error: null
    };
  } catch (error) {
    console.error('Error in createUserWithSync:', error);
    return {
      user: null,
      supabaseSession: null,
      error: error instanceof Error ? error.message : 'Failed to create user'
    };
  }
}

export async function authenticateUser(email: string, password: string): Promise<UserAuthResult> {
  try {
    // Input validation
    if (!email || !password) {
      return {
        user: null,
        supabaseSession: null,
        error: 'Email and password are required'
      };
    }

    // Check Prisma first
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user || !user.password) {
      return {
        user: null,
        supabaseSession: null,
        error: 'User not found'
      };
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        user: null,
        supabaseSession: null,
        error: 'Invalid password'
      };
    }

    // Sync with Supabase
    const supabaseSession = await syncUserToSupabase(email, password);

    // Handle case where Supabase sync fails but Prisma auth succeeds
    if (!supabaseSession) {
      console.warn('Supabase sync failed but Prisma auth succeeded');
    }

    return {
      user,
      supabaseSession,
      error: null
    };
  } catch (error) {
    console.error('Error in authenticateUser:', error);
    return {
      user: null,
      supabaseSession: null,
      error: error instanceof Error ? error.message : 'Authentication failed'
    };
  }
}
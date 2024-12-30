import bcrypt from "bcrypt";
import { prisma } from "@/libs/prismaDb";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
	const body = await request.json();
	const { name, email, password } = body;

	if (!name || !email || !password) {
		return new NextResponse("Missing Fields", { status: 400 });
	}

	const formatedEmail = email.toLowerCase();

	const exist = await prisma.user.findUnique({
		where: {
			email: formatedEmail,
		},
	});

	if (exist) {
		throw new Error("Email already exists");
	}

	const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];

	// Function to check if an email is in the list of admin emails
	function isAdminEmail(email: string) {
		return adminEmails.includes(email);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = {
		name,
		email: formatedEmail,
		password: hashedPassword,
		role: "ADMIN",
	};

	if (isAdminEmail(formatedEmail)) {
		newUser.role = "ADMIN";
	}

	try {
		const user = await prisma.user.create({
			// @ts-ignore
			data: {
				...newUser,
			},
		});

		// sync to Supabase
		try {
			await supabase.auth.admin.createUser({
			  email: email,
			  password: password,
			  email_confirm: true,
			  user_metadata: {  // Changed from options to user_metadata
				platforms: ['visiontrack']
			  }
			});
		  } catch (supabaseError) {
			// If Supabase fails, just log it - don't disrupt main flow
			console.error('Supabase sync failed:', supabaseError);
		  }

		return NextResponse.json(user);
	} catch (error) {
		return new NextResponse("Something went wrong", { status: 500 });
	}
}

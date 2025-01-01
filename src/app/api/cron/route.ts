// app/api/cron/route.ts
import { NextResponse } from 'next/server';
import { jobs } from '@/lib/cron/jobs';

export async function POST(request: Request) {
 try {
   const { jobName } = await request.json();
   
   if (!jobName || !(jobName in jobs)) {
     return NextResponse.json({ error: 'Invalid job name' }, { status: 400 });
   }

   // @ts-ignore
   await jobs[jobName]();
   return NextResponse.json({ success: true });

 } catch (error) {
   return NextResponse.json({ error: 'Job execution failed' }, { status: 500 }); 
 }
}
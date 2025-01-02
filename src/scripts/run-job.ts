import { jobs } from '../lib/cron/jobs';

async function main() {
  const jobName = process.argv[2] as keyof typeof jobs;
  if (!jobName || !(jobName in jobs)) {
    console.log('Available jobs:', Object.keys(jobs));
    process.exit(1);
  }

  await jobs[jobName]();
}

main().catch(console.error);
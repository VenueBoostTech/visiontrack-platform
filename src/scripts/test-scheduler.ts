import { initScheduler } from '../lib/cron/scheduler';

initScheduler(); // Will run every 10 minutes
console.log('Scheduler started, waiting for jobs to run...');
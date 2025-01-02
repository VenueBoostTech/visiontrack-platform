import cron from 'node-cron';
import { jobs } from './jobs';

export function initScheduler() {
    // Test job runs every minute
    cron.schedule('* * * * *', jobs.testCron);
    // Properties job runs every 10 minutes  
    cron.schedule('*/10 * * * *', jobs.updateProperties);
    console.log('Scheduler initialized');
  }
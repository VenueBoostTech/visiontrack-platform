// lib/cron/index.ts
import { initScheduler } from './scheduler';

// Initialize on app start
try {
  initScheduler();
} catch (error) {
  console.error('Failed to initialize scheduler:', error);
}
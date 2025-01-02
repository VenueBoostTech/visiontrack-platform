import { prisma } from '@/libs/prismaDb';

export const jobs = {
  async updateProperties() {
    const properties = await prisma.property.findMany();
    console.log(`[${new Date().toISOString()}] Found ${properties.length} properties`);
    return properties;
  },
  
  async testCron() {
    console.log(`[${new Date().toISOString()}] Test cron running`);
  }
};
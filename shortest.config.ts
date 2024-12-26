import type { ShortestConfig } from '@antiwork/shortest';

const config: ShortestConfig = {
  headless: false,
  baseUrl: 'http://localhost:3000',
  testDir: './src/app/__tests__',
  anthropicKey: process.env.ANTHROPIC_API_KEY || ''
};

export default config;
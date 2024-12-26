# VisionTrack Platform Testing Guide

## Overview

This directory contains end-to-end tests for VisionTrack Platform using [Shortest](https://shortest.com) - an AI-powered testing framework built on Playwright.

## Setup

1. Install required dependencies:

```bash
npm add -D @antiwork/shortest
```

2. Add testing artifacts directory to .gitignore:

```bash
echo ".shortest/" >> .gitignore
```

3. Add Anthropic API key to .env:

```bash
ANTHROPIC_API_KEY=your_key_here
```

## Configuration

Create `shortest.config.ts` in project root:

```typescript
import type { ShortestConfig } from "@antiwork/shortest";

const config: ShortestConfig = {
  headless: false,
  baseUrl: "http://localhost:3000",
  testDir: "./src/app/__tests__",
  anthropicKey: process.env.ANTHROPIC_API_KEY || "",
};

export default config;
```

## Writing Tests

### Authentication Tests

Example login test (`login.test.ts`):

```typescript
import { shortest } from "@antiwork/shortest";

shortest("Login to the app using email and password", {
  email: "placeholder@visiontrack.xyz",
  password: "owner123",
}).after(async ({ page }) => {
  const isAuthenticated = await page.evaluate(() => {
    return document.cookie.includes("next-auth.session-token");
  });

  expect(isAuthenticated).toBeTruthy();
});
```

import { shortest } from '@antiwork/shortest';

shortest(`
Sign in to VisionTrack:
1. Wait for the sign in page to load completely
2. Look for a button labeled "Password" or "password" and click it
3. Once the password form appears, locate the email input field
4. Type owner+joindasiy@visiontrack.xyz into the email field
5. Find the password input field 
6. Type owner123 into the password field
7. Look for a button containing "Sign In" text and click it
8. Wait for redirect to dashboard
`, { 
  email: 'owner+joindasiy@visiontrack.xyz', 
  password: 'owner123',
  selectors: {
    tabButton: 'button:has-text("Password")',
    emailInput: '[name="email"]',
    passwordInput: '[name="password"]',
    submitButton: 'button:has-text("Sign In")'
  },
  actions: [
    { type: 'click', selector: 'button:has-text("Password")' },
    { type: 'fill', selector: '[name="email"]', value: 'owner+joindasiy@visiontrack.xyz' },
    { type: 'fill', selector: '[name="password"]', value: 'owner123' },
    { type: 'click', selector: 'button:has-text("Sign In")' }
  ]
})
.after(async ({ page }) => {    
  // Wait for navigation to complete
  await page.waitForURL('**/platform/dashboard', { timeout: 10000 });
  
  // Simple URL check is sufficient since the redirect only happens on successful login
  const currentUrl = page.url();
  expect(currentUrl).toContain('/platform/dashboard');
});
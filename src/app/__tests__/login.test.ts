import { shortest } from '@antiwork/shortest';

shortest('Login to the app using email and password', { 
  email: 'owner+joindasiy@visiontrack.xyz', 
  password: 'owner123' 
})
// Add only the session check first
.after(async ({ page }) => {    
  const isAuthenticated = await page.evaluate(() => {
    return document.cookie.includes('next-auth.session-token');
  });

  expect(isAuthenticated).toBeTruthy();
});
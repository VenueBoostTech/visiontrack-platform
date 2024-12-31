import { shortest } from '@antiwork/shortest';

shortest(`
Test properties functionality
`, { 
  email: 'owner+joindasiy@visiontrack.xyz', 
  password: 'owner123',
  actions: [
    { type: 'click', selector: 'button:has-text("Password")' },
    { type: 'fill', selector: '[name="email"]', value: 'owner+joindasiy@visiontrack.xyz' },
    { type: 'fill', selector: '[name="password"]', value: 'owner123' },
    { type: 'click', selector: 'button:has-text("Sign In")' }
  ]
})
.after(async ({ page }) => {    
  // Wait for login to complete
  await page.waitForLoadState('networkidle');
  
  // Go to properties page
  await page.goto('http://localhost:3000/user/properties');
  
  // Wait for the page content
  await page.waitForSelector('h2:has-text("Your Properties")', { timeout: 30000 });

  // Click Add New Property
  await page.click('button:has-text("Add New Property")');

  // Wait for modal and form
  await page.waitForSelector('form', { timeout: 30000 });

  // Fill the form using label text since inputs don't have name attributes
  await page.fill('input[type="text"][placeholder*="name" i], input[type="text"]:above(select)', 'Test Property');
  await page.selectOption('select', 'COMMERCIAL');
  await page.fill('input[type="text"]:below(select)', '123 Test St');
  
  // Submit form
  await page.click('button:has-text("Create Property")');

  // Wait for new property to appear in table
  await page.waitForSelector('td:has-text("Test Property")', { timeout: 30000 });

  // Edit the property
  const row = await page.locator('tr:has-text("Test Property")');
  const buttons = await row.locator('button').all();
  await buttons[1].click(); // Edit is the second button

  // Wait for edit form and update
  await page.waitForSelector('form', { timeout: 30000 });
  await page.fill('input[type="text"][placeholder*="name" i], input[type="text"]:above(select)', 'Updated Property');
  await page.click('button:has-text("Update")');

  // Wait for update
  await page.waitForSelector('td:has-text("Updated Property")', { timeout: 30000 });

  // Delete property
  const updatedRow = await page.locator('tr:has-text("Updated Property")');
  const deleteButtons = await updatedRow.locator('button').all();
  await deleteButtons[2].click(); // Delete is the third button

  // Confirm deletion
  await page.waitForSelector('button:has-text("Delete Property")', { timeout: 30000 });
  await page.click('button:has-text("Delete Property")');

  // Wait for property to be removed
  await page.waitForSelector('td:has-text("Updated Property")', { 
    state: 'detached',
    timeout: 30000 
  });
});
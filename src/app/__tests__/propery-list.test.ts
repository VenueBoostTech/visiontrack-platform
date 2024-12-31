import {shortest} from '@antiwork/shortest'; // Ensure you install this package first

shortest(`
Test Properties Page:
1. Log in to the platform
2. Navigate to the properties page
3. Verify the properties list
4. Add a new property
5. Edit an existing property
6. Delete a property
7. Verify metadata
`, {
  login: {
    url: 'http://localhost:3000/auth/signin',
    email: 'owner+joindasiy@visiontrack.xyz',
    password: 'owner123',
    selectors: {
      tabButton: 'button:has-text("Password")',
      emailInput: '[name="email"]',
      passwordInput: '[name="password"]',
      submitButton: 'button:has-text("Sign In")',
    },
    actions: [
      { type: 'click', selector: 'button:has-text("Password")' },
      { type: 'fill', selector: '[name="email"]', value: 'owner+joindasiy@visiontrack.xyz' },
      { type: 'fill', selector: '[name="password"]', value: 'owner123' },
      { type: 'click', selector: 'button:has-text("Sign In")' },
    ],
  },
  tests: [
    {
      description: 'Verify the properties list displays correctly',
      actions: [
        { type: 'goto', url: 'http://localhost:3000/user/properties' },
        { type: 'assert', selector: 'h1', content: 'Your Properties' },
        { type: 'assert', selector: 'table tr', count: 3 }, // Header + 2 properties
      ],
    },
    {
      description: 'Add a new property',
      actions: [
        { type: 'click', selector: 'button:has-text("+ Add New Property")' },
        { type: 'fill', selector: '[name="name"]', value: 'Test Property' },
        { type: 'fill', selector: '[name="type"]', value: 'Commercial' },
        { type: 'fill', selector: '[name="address"]', value: 'Test Address' },
        { type: 'click', selector: 'button:has-text("Submit")' },
        { type: 'assert', selector: 'table tr td', content: 'Test Property' },
      ],
    },
    {
      description: 'Edit an existing property',
      actions: [
        { type: 'click', selector: 'button:has-text("Edit"):nth-of-type(1)' }, // Edit the first property
        { type: 'fill', selector: '[name="name"]', value: 'Updated Property' },
        { type: 'click', selector: 'button:has-text("Submit")' },
        { type: 'assert', selector: 'table tr td', content: 'Updated Property' },
      ],
    },
    {
      description: 'Delete a property',
      actions: [
        { type: 'click', selector: 'button:has-text("Delete"):nth-of-type(1)' }, // Delete the first property
        { type: 'click', selector: 'button:has-text("Confirm")' },
        { type: 'assert', selector: 'table tr', count: 2 }, // 1 less property after deletion
      ],
    },
    {
      description: 'Verify metadata',
      actions: [
        { type: 'goto', url: 'http://localhost:3000/user/properties' },
        { type: 'assert', meta: 'title', content: `Properties - ${process.env.PLATFORM_NAME}` },
        { type: 'assert', meta: 'description', content: 'Manage your properties' },
      ],
    },
  ],
}).after(async ({ page }) => {
  console.log('All tests completed successfully.');
});

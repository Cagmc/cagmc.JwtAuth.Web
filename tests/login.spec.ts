import { expect, test } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('/login');

  await expect(page).toHaveURL('/login');

  // Set email
  await page.fill('input[type=text]', 'admin@cagmc.com');
  await page.fill('input[type=password]', '<PASSWORD>');

  // Submit
  await page.click('button[type=submit]');

  await expect(page).toHaveURL('/home');
});

test('logout', async ({ page }) => {
  await page.goto('/login');

  // Set email
  await page.fill('input[type=text]', 'admin@cagmc.com');
  await page.fill('input[type=password]', '<PASSWORD>');

  // Submit
  await page.click('button[type=submit]');

  await page.click('a:has-text("Logout")');

  await expect(page).toHaveURL('/');
});

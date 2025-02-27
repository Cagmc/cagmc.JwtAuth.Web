import { expect, Page } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('/login');

  await expect(page).toHaveURL('/login');

  // Set email and password fields
  await page.fill('input[type="text"]', 'admin@cagmc.com');
  await page.fill('input[type="password"]', '<PASSWORD>');

  // Submit the login form
  await page.click('button[type="submit"]');

  // Verify that the user is logged in by checking the URL
  await expect(page).toHaveURL('/home');
}

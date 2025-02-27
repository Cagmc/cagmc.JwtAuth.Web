import { expect, test } from '@playwright/test';
import { login } from './login.helper';

test('login', async ({ page }) => {
  await login(page);
});

test('logout', async ({ page }) => {
  await login(page);

  await page.click('a:has-text("Logout")');

  await expect(page).toHaveURL('/');
});

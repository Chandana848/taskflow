import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test('navigates to login page and displays form fields', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('navigates to register page and allows user entry', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('input[placeholder="Alex Rivera"]')).toBeVisible();
  });
});

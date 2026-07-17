import { test, expect } from '@playwright/test';

test.describe('Workspace Management', () => {
  test('renders workspace overview', async ({ page }) => {
    await page.goto('/workspaces');
    await expect(page.locator('h1')).toContainText('Workspaces');
  });
});

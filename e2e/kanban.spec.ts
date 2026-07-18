import { test, expect } from '@playwright/test';

test.describe('Kanban Board Interactions', () => {
  test('displays board columns and tasks', async ({ page }) => {
    await page.goto('/boards/board_demo');
    await expect(page).toHaveTitle(/TaskFlow/);
  });
});

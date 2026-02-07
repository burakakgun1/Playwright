import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly welcomeMessage: Locator;
    readonly actionButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeMessage = page.getByTestId('welcome-message');
        this.actionButton = page.getByTestId('action-btn');
        this.successMessage = page.getByTestId('success-message');
    }

    async verifyLoaded() {
        await expect(this.welcomeMessage).toBeVisible();
        await expect(this.welcomeMessage).toHaveText('Hoşgeldin');
    }

    async clickAction() {
        await this.actionButton.click();
    }

    async verifySuccess() {
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toHaveText('İşlem Başarılı');
    }
}

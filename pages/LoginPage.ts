import { Page, Locator, expect, test } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Login sayfası elementleri (Auth0 / Generic uyumlu)
        this.emailInput = page.getByTestId('email-input');
        this.passwordInput = page.getByTestId('password-input');

        this.submitButton = page.getByTestId('submit-btn');

        this.errorMessage = page.getByTestId('error-message');
    }

    async verifyLoaded() {
        await test.step('Login sayfasının yüklendiği doğrulanıyor', async () => {
            await expect(this.page).toHaveURL(/.*login/);
        });
    }

    async login(email: string, pass: string) {
        await test.step(`Kullanıcı giriş yapıyor: ${email} / ***`, async () => {
            // Inputların görünür olmasını bekle
            await expect(this.emailInput).toBeVisible({ timeout: 10000 });

            await this.emailInput.fill(email);
            await this.passwordInput.fill(pass);
            await this.submitButton.click();
        });
    }

    async verifyLoginAttempt() {
        await test.step('Giriş denemesi sonrası hata mesajı kontrol ediliyor', async () => {
            // Hata mesajı varsa yakala, yoksa genel screenshot al
            try {
                await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
                console.log('POM: Hata mesajı tespit edildi.');
                await this.page.screenshot({ path: 'login-error-pom.png', fullPage: true });
            } catch (e) {
                console.log('POM: Hata mesajı görünmedi.');
                await this.page.screenshot({ path: 'login-attempt-pom.png', fullPage: true });
            }
        });
    }
}

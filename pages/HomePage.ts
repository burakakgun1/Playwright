import { Page, Locator, expect, test } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Selector'ı merkezi bir yerde tanımlıyoruz. İlerde değişirse sadece burayı güncelleriz.
        // data-testid mantığı: Eğer sitede olsa `page.getByTestId('login-btn')` kullanırdık.
        this.loginButton = page.getByTestId('login-link');
    }

    async goto() {
        await test.step('Ana sayfaya gidiliyor', async () => {
            await this.page.goto('/');
            // Başlık kontrolü, sayfanın yüklendiğini teyit eder
            await expect(this.page).toHaveTitle(/Gayrimenkul Kiralama|Hayalinizdeki Evi Keşfedin|Emlak Otomasyon/i);
        });
    }

    async clickLogin() {
        await test.step('Ana sayfadaki "Giriş Yap" butonuna tıklanıyor', async () => {
            await expect(this.loginButton.first()).toBeVisible();
            await this.loginButton.first().click();
        });
    }
}

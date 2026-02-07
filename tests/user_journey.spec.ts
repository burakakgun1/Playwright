import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('User Journey', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await homePage.goto();
    });

    test('Kullanıcı login olur ve dashboard aksiyonunu tamamlar', async ({ page }) => {
        // 1. Given kullanıcı ana sayfada (Handled in beforeEach)

        // 2. When login olur
        await startTestStep('Kullanıcı login olur', async () => {
            await homePage.clickLogin();
            await loginPage.login('test@example.com', 'password123');
        });

        // 3. And dashboard sayfasına yönlendirilir
        await startTestStep('Dashboard sayfasına yönlendirilir', async () => {
            await dashboardPage.verifyLoaded();
        });

        // 4. And "Aksiyon Al" butonuna tıklar
        await startTestStep('Aksiyon butonuna tıklar', async () => {
            await dashboardPage.clickAction();
        });

        // 5. Then "İşlem Başarılı" mesajını görür
        await startTestStep('Başarılı mesajını görür', async () => {
            await dashboardPage.verifySuccess();
        });
    });
});

// Helper to wrap steps for better reporting
async function startTestStep(name: string, stepFunction: () => Promise<void>) {
    await test.step(name, stepFunction);
}

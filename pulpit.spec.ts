import { test, expect } from '@playwright/test';



test.describe('Pulpit test', () => {

    const userId = 'testtest';
    const userPassword = 'testtest';

    test.beforeEach(async ({ page }) => {
        const url = 'https://demo-bank.vercel.app/';
        await page.goto(url);
        //await page.goto('/')  //wymaga konfiguracji w playwright.config.ts ->  baseURL: 'https://demo-bank.vercel.app',
    })

    test('Transfer', async ({ page }) => {
        // Arrange
        const receiverId = '2';
        const transferAmount = '150';
        const transferTitle = 'pizza';
        const expectedTransferReceiver = 'Chuck Demobankowy';

        // Act
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
        await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
        await page.locator('#widget_1_transfer_amount').fill(transferAmount);
        await page.locator('#widget_1_transfer_title').fill(transferTitle);
        await page.locator('#execute_btn').click();
        //await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();
        //await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();

        // Assert
        await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
        //await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - Zwrot środków');
    });

    test('Phone', async ({ page }) => {
        // Arrange
        const phoneAmount = '50';
        const topUpReceiver = '500 xxx xxx';

        // Act 
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
        await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
        await page.locator('#widget_1_topup_amount').fill(phoneAmount);
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        // Assert
        await expect(page.locator('#show_messages')).toHaveText(`Doładowanie wykonane! ${phoneAmount},00PLN na numer ${topUpReceiver}`);
    });

});

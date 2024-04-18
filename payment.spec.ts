import { test, expect } from '@playwright/test';


test.describe('Pulpit test', () => {

    

test.beforeEach(async ({ page }) => {

  const userId = 'testtest';
  const userPassword = 'testtest';
  const url = 'https://demo-bank.vercel.app/';
  await page.goto(url);
  //await page.goto('/')  //wymaga konfiguracji w playwright.config.ts ->  baseURL: 'https://demo-bank.vercel.app',
  await page.getByTestId('login-input').fill(userId);
  await page.getByTestId('password-input').fill(userPassword);
  await page.getByTestId('login-button').click();
  await page.getByRole('link', { name: 'płatności' }).click();
        
    })


test('simple paymant', async ({ page }) => {
  //Arrange
  
  const transferReceiver = 'Jan Janowski';
  const transferAccount = '12 3456 7891 2345 6789 0123 4567';
  const transferAmount = '200';

  //Act
  await page.getByTestId('transfer_receiver').fill(transferReceiver);
  await page.getByTestId('form_account_to').fill(transferAccount);
  await page.getByTestId('form_amount').fill(transferAmount);
  await page.getByTestId('form_title').fill('przelew');
  await page.getByRole('button', { name: 'wykonaj przelew' }).click();
  await page.getByTestId('close-button').click();

  //Assert
  await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`)
});

});

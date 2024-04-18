import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('User login to Demobank', () => {
  //test.only - wykonuje tylko ten test
  // test('login with correct cridentials', async ({ page }) => {
  //   await page.goto('https://demo-bank.vercel.app/');
  //   await page.getByTestId('login-input').fill('testtest');
  //   await page.getByTestId('password-input').fill('testtest');
  //   await page.getByTestId('login-button').click();

  //   await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
  // });

  test.beforeEach(async ({ page }) => {
    // const url = 'https://demo-bank.vercel.app/';   //uruchamianie strony przed podjęciem procesu testowego
    // await page.goto(url);  //wymaga konfiguracji w playwright.config.ts ->  baseURL: 'https://demo-bank.vercel.app',

    await page.goto('/')
  })

  test('login with correct cridentials', async ({ page }) => {
    // Arrange
    const userId = 'testtest' // loginData.userId;
    const userPassword = 'testtest' // loginData.password;
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });


  test('negative login', async ({ page }) => {
    // Arrange
    const incorrectUserId = 'tester';
    const expectedErrorLoginMessage = 'identyfikator ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(expectedErrorLoginMessage);
  });

  test('negative pass', async ({ page }) => {
    // Arrange
    const userId = 'testtest';
    const incorrectUserPassword = '123';
    const expectedErrorPassMassage = 'hasło ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectUserPassword);
    await page.getByTestId('password-input').blur(); //blur - zdjęcie skupienia z pola password

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(expectedErrorPassMassage);
  });

});

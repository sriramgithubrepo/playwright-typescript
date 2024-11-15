import { test, expect } from '../fixtures/pomFixtures.ts';
import { Page } from '@playwright/test';
import * as testData from './testData/sauceDemoTestData.json';
import * as constants from './testData/constants.json';
import {allure} from 'allure-playwright';

/**
 * Test that validates all 3 navigation links in the Hamburger icon
 */
test.beforeEach('Sauce demo login', async ({ loginPage }) => {
    await allure.feature('UI Suite');
    await loginPage.navigateTo(constants.url);
    await loginPage.completeLogin(testData.validUserName, testData.validPassword);
})

test('Verify Navigation to products page', async ({ commonPage,hamburgerIconPage,page,cartPage,checkoutInformationPage,overviewPage }) => {
    await commonPage.clickCartButton();
    await navigateToAllItems(commonPage,hamburgerIconPage,page);

    await commonPage.clickCartButton();
    await cartPage.clickCheckoutButton();
    await navigateToAllItems(commonPage,hamburgerIconPage,page);

    await commonPage.clickCartButton();
    await cartPage.clickCheckoutButton();
    await checkoutInformationPage.fillDetailsAndProceed(testData.userDetails);
    await navigateToAllItems(commonPage,hamburgerIconPage,page);

    await commonPage.clickCartButton();
    await cartPage.clickCheckoutButton();
    await checkoutInformationPage.fillDetailsAndProceed(testData.userDetails);
    await overviewPage.clickFinishButton();
    await navigateToAllItems(commonPage,hamburgerIconPage,page);

})

test('Verify Navigation to about page', async ({ commonPage,hamburgerIconPage,page  }) => {
    await commonPage.clickCartButton();
    await commonPage.clickHamburgerIcon();
    await hamburgerIconPage.clickAboutButton();
    expect(page.url()).toContain('saucelabs.com/');   
})

test('Verify Navigation to login page', async ({ commonPage,hamburgerIconPage,page  }) => {
    await commonPage.clickCartButton();
    await commonPage.clickHamburgerIcon();
    await hamburgerIconPage.clickLogoutButton();
    expect(page.url()).toBe('https://www.saucedemo.com/');   
})

async function navigateToAllItems(commonPage,hamburgerIconPage,page){
    await commonPage.clickHamburgerIcon();
    await hamburgerIconPage.clickAllItems();
    expect(page.url()).toContain('/inventory');
}
import { test, expect } from '../fixtures/pomFixtures.ts';
import * as testData from './testData/sauceDemoTestData.json';
import * as constants from './testData/constants.json';
import {allure} from 'allure-playwright';

/**
 * Test that validates the end to end functional flow of placing an order in sauce demo website
 */
test.beforeEach('Sauce demo login and add item', async ({ loginPage,productPage,commonPage }) => {
    await allure.feature('UI Suite');
    await loginPage.navigateTo(constants.url);
    await loginPage.completeLogin(testData.validUserName, testData.validPassword);
    await productPage.addItems(testData.itemsToAdd);
    await commonPage.clickCartButton();
})

test('Verify order completion', async ({ cartPage,checkoutInformationPage,overviewPage,orderCompletePage }) => {
    expect(await cartPage.getAllItemDescription()).toEqual(testData.itemsToAdd);
    await cartPage.clickCheckoutButton();
    await checkoutInformationPage.fillDetailsAndProceed(testData.userDetails);
    expect(await overviewPage.getAllItemDescription()).toEqual(testData.itemsToAdd);
    expect(await overviewPage.getTotalPrice()).toEqual(await overviewPage.calculateTotalPrice());
    await overviewPage.clickFinishButton();
    expect(await orderCompletePage.getOrderSuccessText()).toBe(constants.orderSuccessText);
})

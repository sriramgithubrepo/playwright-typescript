import { test, expect } from '../fixtures/pomFixtures.ts';
import * as testData from './testData/sauceDemoTestData.json';
import * as constants from './testData/constants.json';
import { sortAndCompareStringArray, sortAndCompareNumberArray } from './helper/utils.ts';
import {allure} from 'allure-playwright';

/**
 * Test that validates all 4 sorting functionalities(Description ascending/descending and Price ascending/descending) available in products page
 */
test.beforeEach('Sauce demo login', async ({ loginPage }) => {
    await allure.feature('UI Suite');
    await loginPage.navigateTo(constants.url);
    await loginPage.completeLogin(testData.validUserName, testData.validPassword);
})

test('Verify product page default sorting order', async ({ productPage  }) => {
    const allItemDesc = await productPage.getAllItemDescription();
    expect(sortAndCompareStringArray(allItemDesc, 'ascending')).toBe(true);
});

test('Verify product page is sorted from A-Z', async ({ productPage }) => {
    await productPage.selectDropdown('za', 'value');
    await productPage.selectDropdown('az', 'value');
    const allItemDesc = await productPage.getAllItemDescription();
    expect(sortAndCompareStringArray(allItemDesc, 'ascending')).toBe(true);
});

test('Verify product page is sorted from Z-A', async ({ productPage }) => {
    await productPage.selectDropdown('za', 'value');
    const allItemDesc = await productPage.getAllItemDescription();
    expect(sortAndCompareStringArray(allItemDesc, 'descending')).toBe(true);
});

test('Verify product page is sorted from low-high', async ({ productPage }) => {
    await productPage.selectDropdown('lohi', 'value');
    const allItemPrice = await productPage.getAllItemPrice();
    expect(sortAndCompareNumberArray(allItemPrice, 'ascending')).toBe(true);
});

test('Verify product page is sorted from high-low', async ({ productPage }) => {
    await productPage.selectDropdown('hilo', 'value');
    const allItemPrice = await productPage.getAllItemPrice();
    expect(sortAndCompareNumberArray(allItemPrice, 'descending')).toBe(true);
});


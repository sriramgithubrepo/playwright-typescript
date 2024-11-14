import { test, expect, Page } from '@playwright/test';
import { LoginPage } from './pages/loginPage.ts'
import { ProductPage } from './pages/productPage.ts';
import { CartPage } from './pages/cartPage.ts';
import { CheckoutInformationPage } from './pages/checkoutInformationPage.ts'; 
import { OverviewPage } from './pages/overviewPage.ts';
import { OrderCompletePage } from './pages/orderCompletePage.ts';
import { CommonPage } from './pages/commonPage.ts';
import { HamburgerIconPage} from './pages/hamburgerIconPage.ts';
import * as testData from './testData/sauceDemoTestData.json';
import * as constants from './testData/constants.json';

let loginPage: LoginPage;
let productPage: ProductPage;
let cartPage: CartPage;
let checkoutInformationPage:CheckoutInformationPage;
let overviewPage:OverviewPage;
let orderCompletePage:OrderCompletePage;
let commonPage:CommonPage;
let hamburgerIconPage:HamburgerIconPage;

test.beforeEach('Sauce demo login', async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutInformationPage =new CheckoutInformationPage(page);
    overviewPage = new OverviewPage(page);
    orderCompletePage= new OrderCompletePage(page)
    commonPage = new CommonPage(page);
    hamburgerIconPage = new HamburgerIconPage(page);
    await loginPage.navigateTo(constants.url);
    await loginPage.completeLogin(testData.validUserName, testData.validPassword);
})

test('Verify Navigation to products page', async ({ page  }) => {
    await productPage.clickCartButton();
    await navigateToAllItems(commonPage,hamburgerIconPage,page);

    await productPage.clickCartButton();
    await cartPage.clickCheckoutButton();
    await navigateToAllItems(commonPage,hamburgerIconPage,page);

    await productPage.clickCartButton();
    await cartPage.clickCheckoutButton();
    await checkoutInformationPage.fillDetailsAndProceed(testData.userDetails)
    await navigateToAllItems(commonPage,hamburgerIconPage,page);

    await productPage.clickCartButton();
    await cartPage.clickCheckoutButton();
    await checkoutInformationPage.fillDetailsAndProceed(testData.userDetails);
    await overviewPage.clickFinishButton();
    await navigateToAllItems(commonPage,hamburgerIconPage,page);

})

test('Verify Navigation to about page', async ({ page  }) => {
    await productPage.clickCartButton();
    await commonPage.clickHamburgerIcon();
    await hamburgerIconPage.clickAboutButton();
    expect(page.url()).toContain('saucelabs.com/');   
})

test('Verify Navigation to login page', async ({ page  }) => {
    await productPage.clickCartButton();
    await commonPage.clickHamburgerIcon();
    await hamburgerIconPage.clickLogoutButton();
    expect(page.url()).toBe('https://www.saucedemo.com/');   
})

async function navigateToAllItems(commonPage:CommonPage,hamburgerIconPage:HamburgerIconPage,page:Page){
    await commonPage.clickHamburgerIcon();
    await hamburgerIconPage.clickAllItems();
    expect(page.url()).toContain('/inventory');
}
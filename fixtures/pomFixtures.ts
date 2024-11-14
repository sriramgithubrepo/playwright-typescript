import {test as baseTest} from '@playwright/test';
import { CartPage } from '../tests/pages/cartPage';
import { CheckoutInformationPage } from '../tests/pages/checkoutInformationPage';
import {CommonPage} from '../tests/pages/commonPage';
import { HamburgerIconPage } from '../tests/pages/hamburgerIconPage';
import {LoginPage} from '../tests/pages/loginPage';
import {OrderCompletePage} from '../tests/pages/orderCompletePage';
import {OverviewPage} from '../tests/pages/overviewPage';
import {ProductPage} from '../tests/pages/productPage';

 type pages ={
    cartPage: CartPage;
    checkoutInformationPage:CheckoutInformationPage;
    commonPage: CommonPage;
    hamburgerIconPage:HamburgerIconPage;
    loginPage:LoginPage;
    orderCompletePage:OrderCompletePage;
    overviewPage:OverviewPage;
    productPage:ProductPage
 };

 const testPages = baseTest.extend<pages>({
    cartPage: async({page},use)=>{await use(new CartPage(page))},
    checkoutInformationPage: async({page},use)=>{await use(new CheckoutInformationPage(page))},
    commonPage: async({page},use)=>{await use(new CommonPage(page))},
    hamburgerIconPage: async({page},use)=>{await use(new HamburgerIconPage(page))},
    loginPage: async({page},use)=>{await use(new LoginPage(page))},
    orderCompletePage: async({page},use)=>{await use(new OrderCompletePage(page))},
    overviewPage: async({page},use)=>{await use(new OverviewPage(page))},
    productPage: async({page},use)=>{await use(new ProductPage(page))},
 })

 export const test=testPages;
 export const expect=testPages.expect;
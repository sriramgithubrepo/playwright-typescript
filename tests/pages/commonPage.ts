import {Locator, Page} from '@playwright/test';
import BasePage from './basePage';

/**
 * Common page class handles the locators and associated functions related to common page
 */
export class CommonPage extends BasePage{
    readonly page: Page;
    private readonly hamburgerButton:Locator;
    private readonly cartButton: Locator;

     /**
   * Initializes locators for the common page
   *  @param {Page} page - playwright page object
   */
    constructor(page:Page){
        super(page);
        this.page=page;
        this.hamburgerButton=page.locator('#react-burger-menu-btn');
        this.cartButton = page.locator('#shopping_cart_container');
    }

    /**
     * Clicks on hamburger menu icon
     * {Promise<void>} - A promise that resolves when the click action is completed
     */
    async clickHamburgerIcon(): Promise<void>{
        await this.clickElement(this.hamburgerButton);
    }
 
    /**
     * Clicks on cart button
     * {Promise<void>} - A promise that resolves when the click action is completed
     */
    async clickCartButton(): Promise<void> {
        await this.clickElement(this.cartButton);
      }
}
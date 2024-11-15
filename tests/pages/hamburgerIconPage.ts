import {Locator, Page} from '@playwright/test';
import BasePage from './basePage';

/**
 * Hamburger icon page class handles the locators and associated functions related to hamburger icon Page
 */
export class HamburgerIconPage extends BasePage{
    readonly page: Page;
    private readonly allItemsButton:Locator;
    private readonly aboutButton:Locator;
    private readonly logoutButton :Locator;

     /**
   * Initializes locators for the hamburger icon page
   *  @param {Page} page - playwright page object
   */
    constructor(page:Page){
        super(page);
        this.page=page;
        this.allItemsButton=page.locator('#inventory_sidebar_link');
        this.aboutButton=page.locator('#about_sidebar_link');
        this.logoutButton=page.locator('#logout_sidebar_link');
    }

    /**
     * Clicks on all items button
     * {Promise<void>} - A promise that resolves when the click action is completed
     */
    async clickAllItems(): Promise<void>{
        await this.clickElement(this.allItemsButton);
    }

   /**
     * Clicks on about button
     * {Promise<void>} - A promise that resolves when the click action is completed
     */
    async clickAboutButton(): Promise<void>{
        await this.clickElement(this.aboutButton);
    }
 
    /**
     * Clicks on logout button
     * {Promise<void>} - A promise that resolves when the click action is completed
     */
    async clickLogoutButton(): Promise<void>{
        await this.clickElement(this.logoutButton);
    }
}
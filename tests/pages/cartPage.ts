import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

/**
 * Cart page class handles the locators and associated functions related to Cart Page
 */
export class CartPage extends BasePage {
  readonly page: Page;
  private readonly allItemDescription: Locator;
  private readonly checkoutButton: Locator;

  /**
   * Initializes locators for the cart page
   *  @param {Page} page - playwright page object
   */
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.allItemDescription = page.locator('div[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('#checkout');
  }

 /**
  * Retrieves descriptions of all items in the cart
  * @returns {Promise<string[]>} - A promise that resolves to an array of item description
  */ 
  async getAllItemDescription(): Promise<string[]> {
    return await this.getAllElementText(this.allItemDescription);
  }

/**
 * Clicks the checkout button in cart page
 * @returns {Promise<void>} - A promise that resolves when the click action is completed
 */
  async clickCheckoutButton():Promise<void>{
    await this.clickElement(this.checkoutButton);
  }
}
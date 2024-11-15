import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';
import { convertStringArrayToNumberArray } from '../helper/utils';

/**
 * Product page class handles the locators and associated functions related to Product Page
 */
export class ProductPage extends BasePage {
  readonly page: Page;
 private readonly sortButton: string;
 private readonly allItemDescription: Locator;
 private readonly allItemPrice: Locator;

  /**
   * Initializes locators for the product page
   *  @param {Page} page - playwright page object
   */
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.sortButton = 'select[data-test="product-sort-container"]';
    this.allItemDescription = page.locator('div[data-test="inventory-item-name"]');
    this.allItemPrice = page.locator('div[data-test="inventory-item-price"]');
  }

  /**
   * Generates dynamic locators for Add cart button based on product name
   * @param {string} productName - Name of the product for which Add to cart button is to be selected
   * @returns {Locator} - A playwright locator for Add to cart button
   */
  getAddtoCartLocators(productName:string):Locator{
   return this.page.locator(`//div[contains(@class, "inventory_item") and .//div[normalize-space(.)="${productName}"]]//button[text()="Add to cart"]`)
  }
  
  /**
   * Selects the option from the dropdown based on value or label
   * @param {string} textOrValue - Value or text of the option to select 
   * @param {string} optionToSelect - selection criteria i.e value or text
   * @returns {Promise<void>} - A promise that resolves when the selection action is completed
   */
  async selectDropdown(textOrValue: string, optionToSelect: string): Promise<void> {
    await this.selectStaticDropdown(this.sortButton, textOrValue, optionToSelect);
  }

  /**
   * Retrieves the descriptions of all items displayed
   * @returns {Promise<string[]>} - A promise that resolves to an array of item descriptions
   */
  async getAllItemDescription(): Promise<string[]> {
    return await this.getAllElementText(this.allItemDescription);
  }
  
  /**
   * Adds multiple item to cart
   * @param {string[]} itemsToAdd - Array of product names to be added to cart
   * @returns {Promise<void>} - A promise that resolves when all the specified items are added
   */
  async addItems(itemsToAdd:string[]): Promise<void> {
    for(const item of itemsToAdd){
     const addtoCartButton= this.getAddtoCartLocators(item);
     await addtoCartButton.click();
    }
  }

  /**
   * Retrieves the price of all item displayed and converts to Number array
   * @returns {Promise<number[]>} - A promise that resolves to an array of item prices
   */
  async getAllItemPrice(): Promise<number[]> {
    const priceTexts = await this.getAllElementText(this.allItemPrice);
    return convertStringArrayToNumberArray(priceTexts);
  }

}

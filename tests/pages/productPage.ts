import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';
import { convertStringArrayToNumberArray } from '../helper/utils';

export class ProductPage extends BasePage {
  readonly page: Page;
  readonly sortButton: string;
  readonly cartButton: Locator;
  readonly allItemDescription: Locator;
  readonly allItemPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.sortButton = 'select[data-test="product-sort-container"]';
    this.cartButton = page.locator('#shopping_cart_container');
    this.allItemDescription = page.locator('div[data-test="inventory-item-name"]');
    this.allItemPrice = page.locator('div[data-test="inventory-item-price"]');
  }

  getAddtoCartLocators(productName:string):Locator{
   return this.page.locator(`//div[contains(@class, "inventory_item") and .//div[normalize-space(.)="${productName}"]]//button[text()="Add to cart"]`)
  }

  async clickCartButton() {
    await this.clickElement(this.cartButton);
  }

  async selectDropdown(textOrValue: string, optionToSelect: string) {
    await this.selectStaticDropdown(this.sortButton, textOrValue, optionToSelect);
  }

  async getAllItemDescription(): Promise<string[]> {
    return await this.getAllElementText(this.allItemDescription);
  }
  
  async addItems(itemsToAdd:string[]) {
    for(const item of itemsToAdd){
     const addtoCartButton= this.getAddtoCartLocators(item);
     await addtoCartButton.click();
    }
  }

  async getAllItemPrice(): Promise<number[]> {
    const priceTexts = await this.getAllElementText(this.allItemPrice);
    return convertStringArrayToNumberArray(priceTexts);
  }

}

import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

export class CartPage extends BasePage {
  readonly page: Page;
  private readonly cartPageTitle: Locator;
  private readonly allItemDescription: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.allItemDescription = page.locator('div[data-test="inventory-item-name"]');
    this.cartPageTitle = page.locator('span[data-test="title"]');
    this.checkoutButton = page.locator('#checkout');
  }

  async getAllItemDescription(): Promise<string[]> {
    return await this.getAllElementText(this.allItemDescription);
  }

  async getCartPageTitle() {
    return await this.getElementText(this.cartPageTitle);
  }

  async clickCheckoutButton() {
    await this.clickElement(this.checkoutButton);
  }
}
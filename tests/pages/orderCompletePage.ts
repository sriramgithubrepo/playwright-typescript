import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

/**
 * Order complete page class handles the locators and associated functions related to order complete Page
 */
export class OrderCompletePage extends BasePage {
    readonly page: Page;
    private readonly orderSuccessText: Locator;

     /**
   * Initializes locators for the order complete page
   *  @param {Page} page - playwright page object
   */
    constructor(page: Page) {
        super(page)
        this.page = page
        this.orderSuccessText = page.locator('h2[data-test="complete-header"]');
    }

    /**
     * Retrieves the success message text
     * @returns {Promise<string>} - A promise resolves that resolves to success message text
     */
    async getOrderSuccessText():Promise<string> {
        return await this.getElementText(this.orderSuccessText);
    }
}

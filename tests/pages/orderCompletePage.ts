import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

export class OrderCompletePage extends BasePage {
    readonly page: Page;
    private readonly orderSuccessText: Locator;

    constructor(page: Page) {
        super(page)
        this.page = page
        this.orderSuccessText = page.locator('h2[data-test="complete-header"]');
    }

    async getOrderSuccessText() {
        return await this.getElementText(this.orderSuccessText);
    }
}

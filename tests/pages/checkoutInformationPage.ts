import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

/**
 * Checkout Information page class handles the locators and associated functions related to checkout information page
 */
export class CheckoutInformationPage extends BasePage {
    readonly page: Page;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly continueButton: Locator;

    /**
  * Initializes locators for the checkout information page
  *  @param {Page} page - playwright page object
  */
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
    }

    /**
     * Fill in the checkout information form with the user details
     * @param {sting[]} userDetails - An array containing user details
     * @returns {Promise<void>} - A promise that resolves when the form is filled
     */
    async fillDetailsAndProceed(userDetails: string[]): Promise<void> {
        await this.fillText(this.firstName, userDetails[0]);
        await this.fillText(this.lastName, userDetails[1]);
        await this.fillText(this.postalCode, userDetails[2]);
        await this.clickElement(this.continueButton);
    }
}
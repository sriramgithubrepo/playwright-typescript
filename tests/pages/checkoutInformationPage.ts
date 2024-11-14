import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';


export class CheckoutInformationPage extends BasePage {
    readonly page: Page;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
    }

    async fillDetailsAndProceed(userDetails: string[]) {
        await this.fillText(this.firstName, userDetails[0]);
        await this.fillText(this.lastName, userDetails[1]);
        await this.fillText(this.postalCode, userDetails[2]);
        await this.clickElement(this.continueButton);
    }
}
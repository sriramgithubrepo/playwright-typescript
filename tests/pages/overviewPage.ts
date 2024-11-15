import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';
import { calculateTotal,convertStringArrayToNumberArray } from '../helper/utils';

/**
 * Overview page class handles the locators and associated functions related to overview Page
 */
export class OverviewPage extends BasePage {
    readonly page: Page;
    private readonly allItemDescription: Locator;
    private readonly allItemPrice: Locator;
    private readonly finishButton: Locator;
    private readonly totalPriceText: Locator;

     /**
   * Initializes locators for the overview page
   *  @param {Page} page - playwright page object
   */
    constructor(page: Page) {
        super(page)
        this.page = page
        this.allItemDescription = page.locator('div[data-test="inventory-item-name"]');
        this.allItemPrice = page.locator('div[data-test="inventory-item-price"]');
        this.finishButton = page.locator('#finish');
        this.totalPriceText = page.locator('div[data-test="total-label"]');
    }

    /**
     * Retrieves the descriptions of all item text
     * @returns Promise<string[]> - A promise that resolves to an array of item description
     */
    async getAllItemDescription(): Promise<string[]> {
        return await this.getAllElementText(this.allItemDescription);
    }

    /**
     * Retrieves the price of all item text and converts to number array
     * @returns Promise<number[]> - A promise that resolves to an array of item prices
     */
    async getAllItemPrice(): Promise<number[]> {
        const priceTexts = await this.getAllElementText(this.allItemPrice);
       return convertStringArrayToNumberArray(priceTexts)    
    }

    /**
     * Clicks on Finish button
     * @returns {Promise<void>} - A promise that resolves when the click action is completed
     */
    async clickFinishButton() {
        await this.clickElement(this.finishButton);
    }

    /**
     * Retrieves the total price displayed
     * @returns {Promise<number>} - A promise that resolves to the total price as a number
     */
    async getTotalPrice():Promise<number> {
       const totalPrice= await this.getElementText(this.totalPriceText);
       const formatedText=totalPrice.replace(/[^\d.]/g, '');
       return parseFloat(formatedText);  
    }

    /**
     * Calculates the total price by adding all the prices and adds 8% tax
     * the result is rounded to 2 decimal value
     * @returns {Promise<number>} - A promise that resolves to the calculated total price as a number
     */
    async calculateTotalPrice():Promise<number>{
     const itemPrice = calculateTotal(await this.getAllItemPrice())
     const total=itemPrice+(itemPrice*0.08);
     const roundedTotal=Number(total.toFixed(2))
     return roundedTotal;
    }
}
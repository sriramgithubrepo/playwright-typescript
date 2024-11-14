import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';
import { calculateTotal,convertStringArrayToNumberArray } from '../helper/utils';

export class OverviewPage extends BasePage {
    readonly page: Page;
    readonly allItemDescription: Locator;
    readonly allItemPrice: Locator;
    readonly finishButton: Locator;
    readonly totalPriceText: Locator;

    constructor(page: Page) {
        super(page)
        this.page = page
        this.allItemDescription = page.locator('div[data-test="inventory-item-name"]');
        this.allItemPrice = page.locator('div[data-test="inventory-item-price"]');
        this.finishButton = page.locator('#finish');
        this.totalPriceText = page.locator('div[data-test="total-label"]');
    }

    async getAllItemDescription(): Promise<string[]> {
        return await this.getAllElementText(this.allItemDescription);
    }

    async getAllItemPrice(): Promise<number[]> {
        const priceTexts = await this.getAllElementText(this.allItemPrice);
       return convertStringArrayToNumberArray(priceTexts)    
    }

    async clickFinishButton() {
        await this.clickElement(this.finishButton);
    }

    async getTotalPrice() {
       const totalPrice= await this.getElementText(this.totalPriceText);
       const formatedText=totalPrice.replace(/[^\d.]/g, '');
       return parseFloat(formatedText);
       
    }

    async calculateTotalPrice(){
     const itemPrice = calculateTotal(await this.getAllItemPrice())
     const total=itemPrice+(itemPrice*0.08);
     const roundedTotal=Number(total.toFixed(2))
     return roundedTotal;
    }
}
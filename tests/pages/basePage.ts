import { Locator, Page } from '@playwright/test';

export default class BasePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async clickElement(element: Locator) {
        await element.click();
    }

    async fillText(element: Locator, text: string) {
        await element.fill(text);
    }

    async getElementText(element: Locator): Promise<string> {
        return await element.innerText();
    }

    async getAllElementText(element: Locator): Promise<string[]> {
        return await element.allInnerTexts();
    }

    async selectStaticDropdown(element: string, valueToSelect: string, optionToSelect: string = 'value') {
        if (optionToSelect === 'value') {
            await this.page.selectOption(element, { value: valueToSelect })
        } else if (optionToSelect === 'text') {
            await this.page.selectOption(element, { label: valueToSelect })
        }
    }
}
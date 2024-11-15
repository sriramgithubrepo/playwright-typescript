import { Locator, Page } from '@playwright/test';

/**
 * This BasePage class that contains all the common reusable methods
 */
export default class BasePage {
    readonly page: Page;

    /**
   * @param {Page} page - playwright page object
   */
    constructor(page: Page) {
        this.page = page;
    }
    
    /**
     * Naviagtes to specified url
     * @param {string} url - URL to navigate to
     * @returns {Promise<void>} - A promise that resolves when navigation is complete
     */
    async navigateTo(url: string):Promise<void> {
        await this.page.goto(url);
    }
    
    /**
     * Clicks the specified element
     * @param {Locator} element - Playwright locator of the element to click
     * @returns {Promise<void>} - A promise that resolves when click action is complete
     */
    async clickElement(element: Locator):Promise<void> {
        await element.click();
    }

    /**
     * FIlls the specified element with the provided text
     * @param {Locator} element - Playwright locator of the element to fill text 
     * @param {string} text - The text to fill 
     * @returns {Promise<void>} - A promise that resolves when fill action is complete
     */
    async fillText(element: Locator, text: string):Promise<void> {
        await element.fill(text);
    }

    /**
     * Retrieves the inner text of the specified element
     * @param {Locator} element - Playwright locator of the element 
     * @returns {Promise<string>} - A promise resolves the inner text of the element
     */
    async getElementText(element: Locator): Promise<string> {
        return await element.innerText();
    }

    /**
     * Retrieves the inner text of all the matching elements
     * @param {Locator} element - Playwright locator of the elements
     * @returns {Promise<string[]>} - A promise resolves the array of inner text
     */
    async getAllElementText(element: Locator): Promise<string[]> {
        return await element.allInnerTexts();
    }

    /**
     * Selects an option from a static dropdown by value or label
     * @param {Locator} element - Playwright selector of the dropdown element
     * @param {string} valueToSelect - The value or text of the option to select
     * @param {string} optionToSelect - The criteria of the selection i.e value or label
     * @returns {Promise<void>} - A promise that resolves when selection is complete
     */
    async selectStaticDropdown(element: string | Locator, valueToSelect: string, optionToSelect: string = 'value'): Promise<void> {
    // Convert string to Locator if necessary
    const dropdown = typeof element === 'string' ? this.page.locator(element) : element;

    if (optionToSelect === 'value') {
        await dropdown.selectOption({ value: valueToSelect });
    } else if (optionToSelect === 'text') {
        await dropdown.selectOption({ label: valueToSelect });
    }
}

}
import {Locator, Page} from '@playwright/test';
import BasePage from './basePage';

export class CommonPage extends BasePage{
    readonly page: Page;
    readonly hamburgerButton:Locator;

    constructor(page:Page){
        super(page);
        this.page=page;
        this.hamburgerButton=page.locator('#react-burger-menu-btn');
    }

    async clickHamburgerIcon(){
        await this.clickElement(this.hamburgerButton);
    }
}
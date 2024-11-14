import {Locator, Page} from '@playwright/test';
import BasePage from './basePage';

export class HamburgerIconPage extends BasePage{
    readonly page: Page;
    readonly allItemsButton:Locator;
    readonly aboutButton:Locator;
    readonly logoutButton :Locator;

    constructor(page:Page){
        super(page);
        this.page=page;
        this.allItemsButton=page.locator('#inventory_sidebar_link');
        this.aboutButton=page.locator('#about_sidebar_link');
        this.logoutButton=page.locator('#logout_sidebar_link');
    }

    async clickAllItems(){
        await this.clickElement(this.allItemsButton);
    }

    async clickAboutButton(){
        await this.clickElement(this.aboutButton);
    }

    async clickLogoutButton(){
        await this.clickElement(this.logoutButton);
    }
}
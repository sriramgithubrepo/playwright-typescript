import {Locator, Page} from '@playwright/test';
import BasePage from './basePage';

export class CommonPage extends BasePage{
    readonly page: Page;
    private readonly hamburgerButton:Locator;
    private readonly cartButton: Locator;

    constructor(page:Page){
        super(page);
        this.page=page;
        this.hamburgerButton=page.locator('#react-burger-menu-btn');
        this.cartButton = page.locator('#shopping_cart_container');
    }

    async clickHamburgerIcon(){
        await this.clickElement(this.hamburgerButton);
    }

    async clickCartButton() {
        await this.clickElement(this.cartButton);
      }
}
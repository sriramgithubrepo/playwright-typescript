import {Locator, Page} from '@playwright/test';
import BasePage from './basePage';

export class LoginPage extends BasePage{
    readonly page: Page;
    readonly userNameTextBox:Locator;
    readonly passwordTextBox:Locator;
    readonly loginButton :Locator;

    constructor(page:Page){
        super(page);
        this.page=page;
        this.userNameTextBox=page.locator('#user-name');
        this.passwordTextBox=page.locator('#password');
        this.loginButton=page.locator('#login-button');
    }

    async enterUserName(username:string){
       await this.fillText(this.userNameTextBox,username);
    }

    async enterPassword(password:string){
        await this.fillText(this.passwordTextBox,password);
     }

     async clickLogin(){
        await this.clickElement(this.loginButton);
     }

     async completeLogin(username:string,password:string){
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLogin();
     }

}

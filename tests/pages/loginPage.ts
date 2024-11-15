import {Locator, Page} from '@playwright/test';
import BasePage from './basePage';

/**
 * Login page class handles the locators and associated functions related to Login Page
 */
export class LoginPage extends BasePage{
    readonly page: Page;
    private readonly userNameTextBox:Locator;
    private readonly passwordTextBox:Locator;
    private readonly loginButton :Locator;

     /**
   * Initializes locators for the login page
   *  @param {Page} page - playwright page object
   */
    constructor(page:Page){
        super(page);
        this.page=page;
        this.userNameTextBox=page.locator('#user-name');
        this.passwordTextBox=page.locator('#password');
        this.loginButton=page.locator('#login-button');
    }

    /**
     * Enters user name in the username textbox
     * @param {string} username - User name to enter
     * @returns {Promise<void>} - A promise that resolves when the user name is entered
     */
    async enterUserName(username:string):Promise<void>{
       await this.fillText(this.userNameTextBox,username);
    }

    /**
     * Enters password in the password textbox
     * @param {string} password - password to enter
     * @returns {Promise<void>} - A promise that resolves when the password is entered
     */
    async enterPassword(password:string):Promise<void>{
        await this.fillText(this.passwordTextBox,password);
     }
  
     /**
      * Clicks on the Login button
      * @returns {Promise<void>} - A promise that resolves when the click action is completed
      */
     async clickLogin():Promise<void>{
        await this.clickElement(this.loginButton);
     }

     /**
      * Completes login process
      * @param {string} username - username to enter 
      * @param {string} password - password to enter
      * @returns {Promise<void>} - A promise that resolves when the click action is completed
      */
     async completeLogin(username:string,password:string):Promise<void>{
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLogin();
     }

}

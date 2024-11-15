import { test, expect } from '../fixtures/pomFixtures.ts';
import {allure} from 'allure-playwright';

/**
 * API test to validate Get User scenario on 'reqres.in'
 */

test('GET API', async ({ request }) => {
    await allure.feature('API Suite');
    const response = await request.get('https://reqres.in/api/users');
    const responseJson = await response.json();
    expect(response.status()).toBe(200);
    expect(responseJson.page).toBe(1);
    expect(responseJson.data[0].email).toBe('george.bluth@reqres.in');
    expect(responseJson.support.url).toBe('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
})


import { test, expect } from '../fixtures/pomFixtures.ts';
import { faker } from '@faker-js/faker';
import * as constants from './testData/constants.json';
const token:string=constants.token;

test('GET API', async ({ request }) => {
    const getAllUserResponse = await request.get('https://gorest.co.in/public/v2/users/',
        { headers: { "Authorization": token } });
    const getAllUserResponseJson = await getAllUserResponse.json();
    expect(getAllUserResponse.status()).toBe(200);
    let firstUserID = getAllUserResponseJson[0].id;
    let firstUserName = getAllUserResponseJson[0].name;

    const getSingleUserResponse = await request.get(`https://gorest.co.in/public/v2/users/${firstUserID}`,
        { headers: { "Authorization": token } });
    expect(getSingleUserResponse.status()).toBe(200);
    const getSingleUserResponseJson = await getSingleUserResponse.json();
    expect(getSingleUserResponseJson.id).toBe(firstUserID);
    expect(getSingleUserResponseJson.name).toBe(firstUserName);
})

test('POST API', async ({ request }) => {
    var payload = {
        "name": `${faker.person.fullName()}`,
        "email": `${faker.internet.email()}`,
        "gender": "male",
        "status": "active"
    }
    const createUserResponse = await request.post('https://gorest.co.in/public/v2/users/',
        {
            headers: { "Authorization": token },
            data: payload
        }
    );
    const createUserResponseJson = await createUserResponse.json();
    expect(createUserResponse.status()).toBe(201);
    let firstUserID = createUserResponseJson.id;
    let firstUserName = createUserResponseJson.name;

    const getSingleUserResponse = await request.get(`https://gorest.co.in/public/v2/users/${firstUserID}`,
        { headers: { "Authorization": token } });
    expect(getSingleUserResponse.status()).toBe(200);
    const getSingleUserResponseJson = await getSingleUserResponse.json();
    expect(getSingleUserResponseJson.id).toBe(firstUserID);
    expect(getSingleUserResponseJson.name).toBe(firstUserName);
})

test('PUT API', async ({ request }) => {
    const getAllUserResponse = await request.get('https://gorest.co.in/public/v2/users/',
        { headers: { "Authorization": token } });
    const getAllUserResponseJson = await getAllUserResponse.json();
    expect(getAllUserResponse.status()).toBe(200);
    let firstUserID = getAllUserResponseJson[0].id;
    let firstUserName = getAllUserResponseJson[0].name;

    var payload = {
        "name": `${faker.person.fullName()}`,
    }
    const updateUserResponse = await request.put(`https://gorest.co.in/public/v2/users/${firstUserID}`,
        {
            headers: { "Authorization": token },
            data: payload
        });
    expect(updateUserResponse.status()).toBe(200);
    const updateUserResponseJson = await updateUserResponse.json();
    expect(updateUserResponseJson.id).toBe(firstUserID);
    expect(updateUserResponseJson.name).toBe(payload.name);
})

test('DELETE API', async ({ request }) => {
    const getAllUserResponse = await request.get('https://gorest.co.in/public/v2/users/',
        { headers: { "Authorization": token } });
    const getAllUserResponseJson = await getAllUserResponse.json();
    expect(getAllUserResponse.status()).toBe(200);
    let firstUserID = getAllUserResponseJson[0].id;
    let firstUserName = getAllUserResponseJson[0].name;

    const deleteUserResponse = await request.delete(`https://gorest.co.in/public/v2/users/${firstUserID}`,
        {
            headers: { "Authorization": token },
        });
    expect(deleteUserResponse.status()).toBe(204);
    const getSingleUserResponse = await request.get(`https://gorest.co.in/public/v2/users/${firstUserID}`,
        { headers: { "Authorization": token } });
    expect(getSingleUserResponse.status()).toBe(404);   
})
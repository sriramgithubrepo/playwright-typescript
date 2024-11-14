import { test, expect } from '../fixtures/pomFixtures.ts';
import { faker } from '@faker-js/faker';
import * as constants from './testData/constants.json';

const token: string = constants.token;
const baseURL: string = "https://gorest.co.in/public/v2/users";

test('GET API', async ({ request }) => {
    const allUser = await getUser(request)
    let firstUserID = allUser[0].id;
    let firstUserName = allUser[0].name;
    const singleUser = await getUser(request,firstUserID)
    expect(singleUser.id).toBe(firstUserID);
    expect(singleUser.name).toBe(firstUserName);
})

test('POST API', async ({ request }) => {
    var payload = {
        "name": faker.person.fullName(),
        "email": faker.internet.email(),
        "gender": "male",
        "status": "active"
    }

    const createdUser = await createUser(request,payload);
    let firstUserID = createdUser.id;
    let firstUserName = createdUser.name;
    const singleUser = await getUser(request,firstUserID)
    expect(singleUser.id).toBe(firstUserID);
    expect(singleUser.name).toBe(firstUserName);
})

test('PUT API', async ({ request }) => {
    const allUser = await getUser(request)
    let firstUserID = allUser[0].id;

    var payload = {
        "name": faker.person.fullName(),
    }
    const updatedUser = await updateUser(request,firstUserID,payload)
    expect(updatedUser.id).toBe(firstUserID);
    expect(updatedUser.name).toBe(payload.name);
})

test('DELETE API', async ({ request }) => {
    const allUser = await getUser(request)
    let firstUserID = allUser[0].id;

    await deleteUser(request,firstUserID)
    const response = await request.get(`${baseURL}/${firstUserID}`,
        { headers: { "Authorization": token } });
    expect(response.status()).toBe(404);
})

async function getUser(request: any, userID: string | null =null){

    const url = userID ? `${baseURL}/${userID}` : baseURL
    const response = await request.get(url, { headers: { "Authorization": token } });
    expect(response.status()).toBe(200);
    return response.json();
}

async function createUser(request: any, payload: object){

    const response = await request.post(baseURL, {
        headers: { "Authorization": token },
        data: payload
    });
    expect(response.status()).toBe(201);
    return response.json();
}

async function updateUser(request: any,userID:string, payload: object){

    const response = await request.put(`${baseURL}/${userID}`, {
        headers: { "Authorization": token },
        data: payload
    });
    expect(response.status()).toBe(200);
    return response.json();
}

async function deleteUser(request: any,userID:string){

    const response = await request.delete(`${baseURL}/${userID}`, {
        headers: { "Authorization": token },
    });
    expect(response.status()).toBe(204);
}
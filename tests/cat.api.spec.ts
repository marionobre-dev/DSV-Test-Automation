import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const apiKey = process.env.CAT_API_KEY;
const baseUrl = 'https://api.thecatapi.com/v1/';

let uploadedImageId: string | undefined;

if (!apiKey) {
  throw new Error('ERROR: In order to run the POST tests please create an .env file on project root and assign your API key on a variable CAT_API_KEY');
}

test('cat breeds return 200 and has at least a NFO', async ({ request }) => {
  const getBreeds = await request.get(baseUrl + 'breeds');
  expect(getBreeds).toBeOK();
  const responseBody = await getBreeds.json();
  expect(responseBody.some((item: any) => item.name === 'Norwegian Forest Cat')).toBeTruthy();
});

test('upload norwegian forest cat image returns 201', async ({ request }) => {
  const imgPath = path.join(__dirname, '..', 'resources', 'cat.jpg');
  const imageBuffer = await fs.promises.readFile(imgPath);
  const response = await request.post(baseUrl + 'images/upload', {
    headers: {
      'x-api-key': apiKey,
    },
    multipart: {
      file: {
        name: 'cat1.jpg',
        mimeType: 'image/jpeg',
        buffer: imageBuffer,
      },
    },
  });
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  uploadedImageId = responseBody.id;
});

test('uploaded images exists', async ({ request }) => {
  const response = await request.get(baseUrl + 'images', {
    headers: {
      'x-api-key': apiKey,
    },
  });
  expect(response.status()).toBe(200); //response code is 200
  const responseBody = await response.json();
  expect(responseBody.length).toBeGreaterThan(0); //at least 1 record is returned
  expect(responseBody.some((item: any) => item.id === uploadedImageId)).toBeTruthy(); //the previously generated id is returned
});
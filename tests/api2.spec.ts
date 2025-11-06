import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('save API response to JSON file', async ({ request }) => {
  // 1. Perform the API request
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.ok()).toBeTruthy();

  // 2. Extract the JSON body
  const responseBody = await response.json();

  // 3. Define the file path
  const filePath = 'api_response.json';

  // 4. Write the JSON data to the file
  fs.writeFileSync(filePath, JSON.stringify(responseBody, null, 2));
  console.log(`API response saved to ${filePath}`);

  // You can optionally add assertions on the saved data if needed
  expect(responseBody).toHaveProperty('id', 1);
  expect(responseBody).toHaveProperty('title');
});
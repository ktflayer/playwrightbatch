    import { test, expect, APIRequestContext } from '@playwright/test';

    let apiContext: APIRequestContext;

    // Set up the API context before all tests in this file
    test.beforeAll(async ({ playwright }) => {
        apiContext = await playwright.request.newContext({
            // Replace with a suitable public API base URL
            baseURL: 'https://jsonplaceholder.typicode.com', 
            extraHTTPHeaders: {
                'Accept': 'application/json',
            },
        });
    });

    // Clean up the API context after all tests in this file
    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('should get a list of posts and return 200 OK', async () => {
        const response = await apiContext.get('/posts');
        expect(response.ok()).toBeTruthy(); // Assert that the response status is 2xx
        const posts = await response.json();
        expect(Array.isArray(posts)).toBeTruthy(); // Assert that the response is an array
        expect(posts.length).toBeGreaterThan(0); // Assert that there are posts
        console.log('Successfully fetched posts:', posts[0].title); // Log a sample post title
    });
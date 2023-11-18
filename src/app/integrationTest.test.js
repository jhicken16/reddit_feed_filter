import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../utilities/test-utils/rendererWithStore";
import App from './App'
import { server } from "../utilities/test-utils/handlers";



server.start()
// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('fetches and displays subreddit titles on the page.', async () => {
    renderWithProviders(<App/>)
    
    expect(await screen.findByText('/r/Home')).toBeTruthy()
})
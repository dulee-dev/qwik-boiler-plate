import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import dotenv from 'dotenv';

// Read from ".env" file.
dotenv.config({
  path:
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local',
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './__tests__/e2e',
  testMatch: '**/*.e2e-spec.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 1,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    baseURL: process.env.PUBLIC_WEB_URL,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
  ],

  // webServer: {
  //   command: 'npm run preview',
  //   port: 4173,
  // },
};

export default config;

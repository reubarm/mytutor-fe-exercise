import { test, expect } from "@playwright/test";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mytutor-fe-exercise.vercel.app/"
    : "http://localhost:3000";

test("renders the questionnaire and submits an answer", async ({ page }) => {
  await page.goto(BASE_URL);

  // Ensure the component is rendered correctly
  const headerElement = await page.$("text=Onboarding Questionnaire");
  expect(headerElement).toBeTruthy();

  // Click the "Online tutoring" div to simulate the checkbox being checked
  await page.click("text=Online tutoring");

  const checkbox = await page.$('input[aria-label="Online tutoring"]');
  expect(await checkbox?.isChecked()).toBe(true);

  // Click the "0-1 years" div to simulate the radio button being checked
  await page.click("text=0-1 years");

  const radio = await page.$('input[aria-label="0-1 years"]');
  expect(await radio?.isChecked()).toBe(true);

  // Submit answers and check if the modal content is visible
  const submitButton = await page.$("text=Submit");
  await submitButton?.click();
  
  await page.waitForSelector("text=Start Again");
  const modalContent = await page.$(
    "text=Awesome, let's keep up the hard work!"
  );
  expect(modalContent).toBeTruthy();
});

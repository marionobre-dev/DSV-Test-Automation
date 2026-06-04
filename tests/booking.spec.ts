import { test, expect } from '@playwright/test';

test('search one way flights', async ({ page }) => {
  //Open Browser and check navigation to right page
  await page.goto('https://www.booking.com/flights');
  await expect(page).toHaveTitle(/Find cheap flights.*/);
  //Select one way trip
  await page.getByRole('radio', { name: 'One-way' }).click();
  //Select from
  await page.getByTestId('input_location_from_segment_0').click();
  await page.locator('//button[@data-autocomplete-chip-idx="0"]').click(); //clears prefilled result
  await page.getByTestId('input_text_autocomplete').fill('MAD');
  await page.getByRole('checkbox', { name: 'AIRPORTMAD' }).click();
  //Select to
  await page.getByTestId('input_location_from_segment_1').click();
  await page.getByTestId('input_text_autocomplete').fill('MAD');
  await page.getByRole('checkbox', { name: 'AIRPORTMAD' }).click();
  //Select date
  let month = (new Date().getMonth() + 2).toString().padStart(2, '0');
  let year = new Date().getFullYear();
  await page.getByTestId('button_date_segment_0').click();
  await page.locator('//span[@data-date="' + year + '-' + month + '-01"]').click();
  //Click search and verify results
  await page.getByTestId('button_search_submit').click();
  await expect(page.locator('//h1')).toHaveText(/Showing .* results/);
});


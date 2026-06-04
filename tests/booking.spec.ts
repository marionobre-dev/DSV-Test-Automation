import { test, expect } from '@playwright/test';
import { BookingFlightSearch } from '../pages/bookingflightsearch';

test('search one way flights', async ({ page }) => {
  const bookingFlights = new BookingFlightSearch(page);
  //Open Browser and check navigation to right page
  await bookingFlights.openBookingFlight();
  //Select one way trip
  await bookingFlights.selectTripTypeRadio('One-way');
  //Select from
  await bookingFlights.flyFrom('MAD');
  //Select to
  await bookingFlights.flyTo('LYS');
  //Select date
  await bookingFlights.selectFirstNextMonth();
  //Click search and verify results
  await bookingFlights.searchAndVerify();
});


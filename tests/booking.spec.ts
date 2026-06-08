import { test, expect } from '@playwright/test';
import { BookingFlightSearch } from '../pages/bookingflightsearch';
import data from '../data/flightdata.json';

test('search one way flights', async ({ page }) => {
  const bookingFlights = new BookingFlightSearch(page);
  //Open Browser and check navigation to right page
  await bookingFlights.openBookingFlight();
  //Select one way trip
  await bookingFlights.selectTripTypeRadio(data.trip);
  //Select from
  await bookingFlights.flyFrom(data.from);
  //Select to
  await bookingFlights.flyTo(data.to);
  //Select date
  await bookingFlights.selectFirstNextMonth();
  //Click search and verify results
  await bookingFlights.searchAndVerify();
});


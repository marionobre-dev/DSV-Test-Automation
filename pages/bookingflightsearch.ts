import { expect, type Locator, type Page } from '@playwright/test';

export class BookingFlightSearch {
    
  readonly page: Page;
  readonly fromInput: Locator;
  readonly toInput: Locator;
  readonly dateInput: Locator;
  readonly selectedAutoCompleteInput: Locator;
  readonly autoCompleteInput: Locator;
  readonly submitSearch: Locator;
  readonly numberResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromInput = page.getByTestId('input_location_from_segment_0');
    this.toInput = page.getByTestId('input_location_from_segment_1');
    this.dateInput = page.getByTestId('button_date_segment_0');
    this.selectedAutoCompleteInput = page.getByTestId('input_text_autocomplete');
    this.autoCompleteInput = page.getByTestId('input_text_autocomplete');
    this.submitSearch = page.getByTestId('button_search_submit');
    this.numberResults = page.getByTestId('search_filters_summary_results_number');
  }

  /**
   * Opens Booking flight page and verifies that the title is returned
   */
  async openBookingFlight() {
    await this.page.goto('https://www.booking.com/flights');
    await expect(this.page).toHaveTitle(/Find cheap flights.*/);
  }

  /**
   * Selects the trip type radio on booking flight page
   * @param tripType supports currently Round-trip, One-way and Multi-city, it's case-sensitive
   */
  async selectTripTypeRadio(tripType : string) {
    await this.page.getByRole('radio', { name: tripType}).click();
  }

  /**
   * Selects the airport where the flight departs
   * @param airportName name of the airport, use the 3 letter code, example LIS for Lisbon Airport
   */
  async flyFrom(airportName : string){
    await this.fromInput.click();
    await this.selectedAutoCompleteInput.click(); //clears prefilled result
    this.autoComplete(airportName);
  }

  /**
   * Selects the airport where the flight departs
   * @param airportName name of the airport, use the 3 letter code, example LIS for Lisbon Airport
   */
  async flyTo(airportName : string){
    await this.toInput.click();
    this.autoComplete(airportName);
  }

  /**
   * Controler that selects the airport based on the 3 letter code, to be re-used indenpendently from input element
   * @param value name of the airport, use the 3 letter code, example LIS for Lisbon Airport
   */
  async autoComplete(value : string) {
    await this.autoCompleteInput.fill(value);
    await this.page.getByRole('checkbox', { name: 'AIRPORT' + value }).click();
  }

  /**
   * Opens the date input, calculates the first day of next month and selects it
   */
  async selectFirstNextMonth() {
    await this.dateInput.click();
    await this.page.locator('//span[@data-date="' + this.calculateFirstNextMonth() + '"]').click();
  }

  /**
   * Calculation for the first day of next month
   * @returns returns the first day of next month in format YYYY-MM-DD
   */
  calculateFirstNextMonth() {
    let month = (new Date().getMonth() + 2).toString().padStart(2, '0');
    let year = new Date().getFullYear();
    return year + '-' + month + '-01';
  }

  /**
   * Clicks search and valudates that the message Showing X Results is returned
   */
  async searchAndVerify(){
    await this.submitSearch.click();
    await expect(this.numberResults).toHaveText(/Showing .* results/);
  }

}
export class DateUtils {

  /**
   * Calculation for the first day of next month
   * @returns returns the first day of next month in format YYYY-MM-DD
   */
  calculateFirstNextMonth() {
    let month = (new Date().getMonth() + 2).toString().padStart(2, '0');
    let year = new Date().getFullYear();
    return year + '-' + month + '-01';
  }

}
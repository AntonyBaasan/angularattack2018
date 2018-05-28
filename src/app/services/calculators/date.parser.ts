import { UtilsCalculator } from './utils.calculator';
import * as _ from 'lodash';

const regexFormats = [
  // 11/29/18 04:04   |  04/07/2017 11:36 AM
  '\\d{1,2}/\\d{1,2}/\\d{2,4}\\s+\\d{1,2}:\\d{1,2}(:\\d{1,2})?(\\s+([AaPp][Mm]))?',
  // tslint:disable-next-line:max-line-length  //sep 29, 2017 7:25 pm
  '(jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|jun(e)?|jul(y)?|aug(ust)?|sep(tember)?|oct(ober)?|nov(ember)?|dec(ember)?)\\s+\\d{1,2},\\s+\\d{4}(\\s+\\d{1,2}:\\d{1,2}(\\s+([AaPp][Mm]))?)?'
];

export class DateParser {
  static getDate(allLines: string[], text: string, index: number): Date {
    const result: Date[] = [];
    _.forEach(regexFormats, reg => {
      const dateAsStr = UtilsCalculator.getStringByRegex(text, reg, 0);
      if (dateAsStr) {
        // console.log('Date found:', dateAsStr);
        result.push(new Date(dateAsStr));
      }
    });

    return result.length > 0 ? result[0] : null;
  }

  private static findDateWithFormat(text: string, reg: string) {}

  /**
   * Gets number value
   * total: $500
   */
  private static getTotalNumberByKey(
    allLines: string[],
    text: string,
    index: number,
    key: string,
    stopKey: string
  ): number {
    if (
      !(text.includes(' ' + key) || text.startsWith(key)) ||
      text.includes(stopKey)
    ) {
      return 0;
    }

    // get substring after key word
    let total = UtilsCalculator.getNumberValueByKey(text, key);
    // console.log('total: ' + total);
    if (total) {
      return parseFloat(total);
    } else {
      total = UtilsCalculator.getNumberValueByKey(allLines[index + 1], '');
      // console.log('total: ' + total);
      return parseFloat(total);
    }
  }
}

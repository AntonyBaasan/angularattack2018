import { UtilsCalculator } from './utils.calculator';

export class TotalParser {
  static getTotal(allLines: string[], text: string, index: number): number {
    return this.getTotalNumberByKey(allLines, text, index, 'total', 'point');
  }

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

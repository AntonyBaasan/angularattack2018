export class UtilsCalculator {
  static getNumberValueByKey(text: string, key: string): string {
    // console.log('before', text);
    const left = this.truncateBefore(text, key);
    // console.log('left', left);
    return this.findNumberInLine(left);
  }

  static truncateBefore(str, pattern) {
    return str.slice(str.indexOf(pattern) + pattern.length);
  }

  static truncateAfter(str, pattern) {
    return str.slice(0, str.indexOf(pattern));
  }

  static findNumberInLine(text: string) {
    // console.log(text);
    return this.getStringByRegex(text, '[\\s$]*([\\d\\.]+)', 1);
  }

  static getStringByRegex(text: string, reg: string, index: number) {
    const re = new RegExp(reg);
    const m = text.match(re);

    if (m != null) {
      // console.log(m);
      return m[index];
    }
  }
}

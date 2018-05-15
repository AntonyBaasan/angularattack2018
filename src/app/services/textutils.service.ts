import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Receipt } from '../model/receipt.model';

@Injectable({
  providedIn: 'root'
})
export class TextutilsService {

  constructor() { }

  public convertToLines(text: string): string[] {
    // tslint:disable-next-line:quotemark
    const r = _.filter(text.split("\n"), (t: string) => {
      const tr = t.trim();
      if (t === '') {
        return false;
      }
      return true;
    });

    return _.map(r, (s) => (s.toLowerCase()));
  }

  public stringLinesToReceipt(textLines: string[]): Receipt {
    const receipt: Receipt = { total: 0 };
    _.forEach(textLines, (l, index) => {
        // console.log(l);
        receipt.title = textLines[0];
        receipt.total = this.getTotal(textLines, l, index, 'total');
    });

    return receipt;
  }

  private getTotal(allLines: string[], text: string, index: number, key: string): number {
    if (!((text.includes(' total') || text.startsWith('total')) && !text.includes('point'))) {
      return;
    }

    // get substring after key word
    let total = this.getValueOfKey(text, key);
    // console.log('total: ' + total);
    if (total) {
      return parseFloat(total);
    } else {
      total = this.getValueOfKey(allLines[index + 1], '');
      // console.log('total: ' + total);
      return parseFloat(total);
    }
  }

  private getValueOfKey(text: string, key: string): string {
    console.log('before', text);
    // const left = text.substr(text.indexOf(key), key.length);
    const left = this.truncateBefore(text, key);
    console.log('left', left);
    return this.findNumberInLine(left);
  }

  private truncateBefore(str, pattern) {
    return str.slice(str.indexOf(pattern) + pattern.length);
  }

  private truncateAfter(str, pattern) {
    return str.slice(0, str.indexOf(pattern));
  }

  private findNumberInLine(text: string) {
    console.log(text);

    const re = new RegExp('[\\s$]*([\\d\\.]+)');
    const m = text.match(re);

    if (m != null) {
      console.log(m);
      return m[1];
    }
  }
}

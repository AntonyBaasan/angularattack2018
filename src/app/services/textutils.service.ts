import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Receipt } from '../model/receipt.model';
import { TotalParser } from './calculators/total.parser';
import { DateParser } from './calculators/date.parser';

@Injectable({
  providedIn: 'root'
})
export class TextutilsService {
  constructor() {}

  public convertToLines(text: string): string[] {
    // tslint:disable-next-line:quotemark
    const r = _.filter(text.split('\n'), (t: string) => {
      const tr = t.trim();
      if (t === '') {
        return false;
      }
      return true;
    });

    return _.map(r, s => s.toLowerCase());
  }

  public stringLinesToReceipt(textLines: string[]): Receipt {
    const receipt: Receipt = { total: 0, date: null };
    receipt.title = textLines[0];

    _.forEach(textLines, (l, index) => {
      // console.log(l);
      if (!receipt.total) {
        receipt.total = TotalParser.getTotal(textLines, l, index);
      }
      if (!receipt.date) {
        receipt.date = DateParser.getGetDate(textLines, l, index);
      }
    });

    return receipt;
  }
}

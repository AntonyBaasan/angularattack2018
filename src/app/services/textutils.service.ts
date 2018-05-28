import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { TotalParser } from './calculators/total.parser';
import { DateParser } from './calculators/date.parser';
import { ReceiptDetectionResult } from '../model/receipt-detection-result.model';

@Injectable({
  providedIn: 'root'
})
export class TextutilsService {
  constructor() {}

  public convertToLines(fullText: string): string[] {
    // tslint:disable-next-line:quotemark
    const r = _.filter(fullText.split('\n'), (t: string) => {
      const tr = t.trim();
      if (t === '') {
        return false;
      }
      return true;
    });

    return _.map(r, s => s.toLowerCase());
  }

  public stringLinesToReceipt(textLines: string[]): ReceiptDetectionResult {
    const receipt: ReceiptDetectionResult = { total: [], date: [], title: [] };
    receipt.title.push(textLines[0]);

    _.forEach(textLines, (l, index) => {
      // console.log(l);
      const t = TotalParser.getTotal(textLines, l, index);
      if (t) {
        receipt.total.push(t);
      }

      const d = DateParser.getDate(textLines, l, index);
      if (d) {
        receipt.date.push(d);
      }
    });

    return receipt;
  }
}

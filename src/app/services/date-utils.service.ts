import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {
  convertDateToForm(date: Date) {
    if (date) {
      return new FormControl(date);
    }

    return new FormControl('');
  }
}

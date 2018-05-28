import * as _ from 'lodash';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
  isDevMode
} from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatDatepickerInputEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { TextutilsService } from '../../services/textutils.service';
import { Receipt } from '../../model/receipt.model';
import { ImagedetectorService } from '../../services/imagedetector.service';
import { ReceiptService } from '../../services/receipt.service';
import { ItemEditComponent } from '../item-edit/item-edit.component';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ModelChangeAction } from '../../model/model-change-action.model';
import { FilterInfo } from '../../model/filter-info.model';
import { DateUtilsService } from '../../services/date-utils.service';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.css']
})
export class ItemFilterComponent implements OnInit {
  @Input() filterInfo: FilterInfo;
  showAdvanced = false;

  constructor(
    private receiptService: ReceiptService,
    public dialog: MatDialog,
    public dateUtilsService: DateUtilsService
  ) {}

  ngOnInit() {
    this.filterInfo = this.filterInfo || {};
  }

  clearAll() {
    this.filterInfo = {};
  }

  clearDateFilter() {
    this.filterInfo.startDate = null;
    this.filterInfo.endDate = null;
  }
  
  clearTotalFilter() {
    this.filterInfo.minTotal = null;
    this.filterInfo.maxTotal = null;
  }

  startDateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    this.filterInfo.startDate = event.value;
  }

  endDateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    this.filterInfo.endDate = event.value;
  }

  convertDateToForm(date: Date) {
   return this.dateUtilsService.convertDateToForm(date);
  }
}

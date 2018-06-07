import * as _ from 'lodash';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { isDevMode } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
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
import { PageInfo } from '../../model/page-info.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() filterInfo: FilterInfo;
  @ViewChild(MatSort) sort: MatSort;
  targetReceipt: Receipt;
  displayedColumns = ['select', 'date', 'title', 'description', 'total'];
  dataSource = new MatTableDataSource<Receipt>();
  selection = new SelectionModel<Receipt>(true, []);
  isLoadingResults = false;
  pageLoadSize = 15;

  constructor(
    private receiptService: ReceiptService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;

    setTimeout(() => {
      this.updateReceipts({ page: 0, pageSize: this.pageLoadSize });
    }, 3000);
    // this.updateReceipts({ page: 0, pageSize: 30 });
  }

  private updateReceipts(pageInfo: PageInfo) {
    this.isLoadingResults = true;
    this.receiptService.getReceipts(pageInfo).subscribe(actions => {
      actions.forEach(this.udpateDataSource.bind(this));
      this.isLoadingResults = false;
    });
  }

  public loadMore() {
    const pageInfo = { page: 1, pageSize: this.pageLoadSize };
    const lastReceipt = this.dataSource.data[this.dataSource.data.length - 1];

    this.isLoadingResults = true;
    // this.receiptService.loadMore(lastReceipt, pageInfo);
    // this.receipts$.subscribe(actions => {
    //   actions.forEach(this.udpateDataSource.bind(this));
    //   this.isLoadingResults = false;
    // });
  }

  private udpateDataSource(modelChangeAction: ModelChangeAction<Receipt>) {
    const data = this.dataSource.data;
    console.log(modelChangeAction);
    if (modelChangeAction.type === 'added') {
      const index = _.findIndex(data, { key: modelChangeAction.model.key });
      if (index === -1) {
        data.push(modelChangeAction.model);
      }
    } else if (modelChangeAction.type === 'removed') {
      this.deselectByKey(modelChangeAction.model.key);
      _.remove(data, d => d.key === modelChangeAction.model.key);
    } else if (modelChangeAction.type === 'modified') {
      const index = _.findIndex(data, { key: modelChangeAction.model.key });
      data.splice(index, 1, modelChangeAction.model);
    }
    this.dataSource.data = data;
  }

  deselectByKey(key: string) {
    const targetDeselect = _.find(this.selection.selected, 'key', key);
    this.selection.deselect(targetDeselect);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  addNew() {
    this.targetReceipt = this.receiptService.getNewReceiptTemplate();
    this.showDialog(this.targetReceipt);
  }

  edit() {
    if (!this.isSingleSelect()) {
      return;
    }
    this.editReceipt(this.selection.selected[0]);
  }

  editReceipt(receipt: Receipt) {
    this.targetReceipt = receipt;
    this.showDialog(this.targetReceipt);
  }

  private showDialog(receipt: Receipt) {
    const dialogRef = this.dialog.open(ItemEditComponent, {
      width: '550px',
      data: { receipt: _.cloneDeep(receipt) }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  remove() {
    if (!this.hasAnySelect()) {
      return;
    }

    this.receiptService.removeMany(this.selection.selected);
  }

  isSingleSelect() {
    return this.selection.selected.length === 1;
  }

  hasAnySelect() {
    return this.selection.selected.length > 0;
  }
}

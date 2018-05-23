import * as _ from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { isDevMode } from '@angular/core';
import { MatDialog, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { TextutilsService } from '../../services/textutils.service';
import { Receipt } from '../../model/receipt.model';
import { ImagedetectorService } from '../../services/imagedetector.service';
import { ReceiptService } from '../../services/receipt.service';
import { ItemEditComponent } from '../item-edit/item-edit.component';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  receipts$: Observable<Receipt[]>;
  targetReceipt: Receipt;
  displayedColumns = ['select', 'date', 'title', 'description', 'total'];
  dataSource = new MatTableDataSource<Receipt>();
  selection = new SelectionModel<Receipt>(true, []);

  constructor(
    private receiptService: ReceiptService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.receipts$ = this.receiptService.getReceipts();
    this.receipts$.subscribe(item => {
      this.dataSource.data = item;
    });
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
    _.forEach(this.selection.selected, s => this.selection.deselect(s));
  }

  isSingleSelect() {
    return this.selection.selected.length === 1;
  }

  hasAnySelect() {
    return this.selection.selected.length > 0;
  }
}

import * as _ from 'lodash';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Receipt } from '../../model/receipt.model';
import { ReceiptService } from '../../services/receipt.service';
import { ItemEditComponent } from '../item-edit/item-edit.component';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FilterInfo } from '../../model/filter-info.model';
import { PageInfo } from '../../model/page-info.model';
import { Page } from '../../model/page.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() filterInfo: FilterInfo;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  targetReceipt: Receipt;
  displayedColumns = ['select', 'date', 'title', 'description', 'total'];
  dataSource = new MatTableDataSource<Receipt>();
  selection = new SelectionModel<Receipt>(true, []);
  isLoadingResults = false;

  constructor(
    private receiptService: ReceiptService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  refresh() {
    this.updateReceipts({
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  private updateReceipts(pageInfo: PageInfo) {
    this.isLoadingResults = true;
    this.receiptService
      .getReceipts(pageInfo, this.filterInfo)
      .subscribe(this.gotNext.bind(this), this.gotError.bind(this));
  }

  private gotNext(page: Page<Receipt>) {
    console.log(page);

    const oldSelection = this.selection.selected;
    this.selection.clear();
    this.dataSource.data = page.content;

    this.dataSource.data.forEach(d => {
      if (_.findIndex(oldSelection, o => d.id === o.id) !== -1) {
        this.selection.toggle(d);
      }
    });

    this.paginator.length = page.totalElements;
    this.isLoadingResults = false;
  }

  private gotError(error) {
    console.log(error);
    this.snackBar.open('Something went wrong!', '', { duration: 3000 });
    this.isLoadingResults = false;
  }

  public loadMore() {
    this.isLoadingResults = true;
  }

  deselectById(id: number) {
    const targetDeselect = _.find(this.selection.selected, s => s.id === id);
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

  public pageChangeClicked() {
    this.refresh();
  }

  private showDialog(receipt: Receipt) {
    const dialogRef = this.dialog.open(ItemEditComponent, {
      width: '550px',
      data: { receipt: _.cloneDeep(receipt) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'Cancel') {
      } else if (result.action === 'Update') {
        this.updateReceipts({
          page: this.paginator.pageIndex,
          size: this.paginator.pageSize
        });
      } else if (result.action === 'AddNew') {
        this.updateReceipts({
          page: this.paginator.pageIndex,
          size: this.paginator.pageSize
        });
      }

      console.log(`Dialog result: ${result}`);
    });
  }

  remove() {
    if (!this.hasAnySelect()) {
      return;
    }

    this.receiptService.remove(this.selection.selected[0]).subscribe(() => {
      this.updateReceipts({
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize
      });
    }, this.gotError.bind(this));
  }

  isSingleSelect() {
    return this.selection.selected.length === 1;
  }

  hasAnySelect() {
    return this.selection.selected.length > 0;
  }
}

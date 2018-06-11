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
import { Page } from '../../model/page.model';

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
  currentPageInfo: PageInfo = { page: 0, pageSize: 15 };
  isLoadingResults = false;

  constructor(
    private receiptService: ReceiptService,
    public dialog: MatDialog
  ) {}

  refresh() {
    this.updateReceipts(this.currentPageInfo);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    // this.updateReceipts({ page: 0, pageSize: 30 });
  }

  private updateReceipts(pageInfo: PageInfo) {
    this.isLoadingResults = true;
    const oldSelection = this.selection.selected;
    this.selection.clear();
    this.receiptService.getReceipts(pageInfo).subscribe(
      (page: Page<Receipt>) => {
        console.log(page);
        this.dataSource.data = page.content;

        this.dataSource.data.forEach(d => {
          if (_.findIndex(oldSelection, o => d.id === o.id) !== -1) {
            this.selection.toggle(d);
          }
        });
      },
      () => {},
      () => {
        this.isLoadingResults = false;
      }
    );
  }

  public loadMore() {
    const lastReceipt = this.dataSource.data[this.dataSource.data.length - 1];

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

  private showDialog(receipt: Receipt) {
    const dialogRef = this.dialog.open(ItemEditComponent, {
      width: '550px',
      data: { receipt: _.cloneDeep(receipt) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'Cancel') {
      } else if (result.action === 'Update') {
        this.updateReceipts(this.currentPageInfo);
      } else if (result.action === 'AddNew') {
        this.updateReceipts(this.currentPageInfo);
      }

      console.log(`Dialog result: ${result}`);
    });
  }

  remove() {
    if (!this.hasAnySelect()) {
      return;
    }

    // this.receiptService.removeMany(this.selection.selected);
    this.receiptService
      .remove(this.selection.selected[0])
      .subscribe((result: Receipt) => {
        console.log(result);
        const data = this.dataSource.data;
        this.deselectById(result.id);
        _.remove(data, (d: Receipt) => d.id === result.id);
        this.dataSource.data = data;
      });
  }

  isSingleSelect() {
    return this.selection.selected.length === 1;
  }

  hasAnySelect() {
    return this.selection.selected.length > 0;
  }
}

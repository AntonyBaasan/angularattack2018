import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { MatFormField, MatInput } from '@angular/material';
import { ItemListComponent } from './item-list/item-list.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @ViewChild(ItemListComponent) itemList: ItemListComponent;
  public test: String = 'test';
  private buffer = 20;

  ngOnInit() {}

  onTableScroll(e) {
    const viewHeight = e.target.offsetHeight; // viewport: ~500px
    const scrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    if (viewHeight + scrollLocation >= scrollHeight) {
      console.log('load data!!!');
      this.itemList.loadMore();
    }

  }
}

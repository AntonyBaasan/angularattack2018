import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CompanyService } from '../services/company.service';
import { Company } from '../model/company.model';

import { MatFormField, MatInput } from '@angular/material';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  public test: String = 'test';
  public company: Company;
  constructor(private companyService: CompanyService) {
    this.companyService.company$.valueChanges().subscribe(value => {
      this.company = value;
    });
  }

  ngOnInit() {}

  saveCompany(company: Company) {
    this.companyService.save(company);
  }
}

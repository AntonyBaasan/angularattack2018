import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  fileToUpload: File = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.postFile(this.fileToUpload).subscribe(
      data => {
        // do something, if upload success
      },
      error => {
        console.log(error);
      }
    );
  }

  postFile(fileToUpload: File): Observable<boolean> {
    // const endpoint = 'http://localhost:5001/angularattack2018/us-central1/receiptdetector';
    const endpoint = 'https://us-central1-angularattack2018.cloudfunctions.net/receiptdetector';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return (
      this.httpClient
        // .post(endpoint, formData, { headers:  })
        .post(endpoint, formData)
        .map(() => {
          return true;
        })
    );
  }
}

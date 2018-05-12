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
  isDetecting = false;
  detectedMessage = '';
  detectedText = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() { }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.isDetecting = true;
    this.postFile(this.fileToUpload).subscribe(
      data => {
        // do something, if upload success
        console.log(data);
        this.detectedMessage = data.message;
        this.detectedText = data.result.text;
        setTimeout(() => { this.isDetecting = false; }, 0);
      },
      error => {
        console.log(error);
      }
    );
  }

  postFile(fileToUpload: File): Observable<any> {
    // const endpoint = 'http://localhost:5001/angularattack2018/us-central1/receiptdetector';
    const endpoint = 'https://us-central1-angularattack2018.cloudfunctions.net/receiptdetector';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return (
      this.httpClient
        // .post(endpoint, formData, { headers:  })
        .post(endpoint, formData)
    );
  }
}

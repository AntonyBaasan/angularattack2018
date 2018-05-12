import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ImagedetectorService {

  constructor(private httpClient: HttpClient) { }

  public detectFile(fileToUpload: File): Observable<any> {
    const endpoint = this.getEndpoint();
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return (
      this.httpClient
        // .post(endpoint, formData, { headers:  })
        .post(endpoint, formData)
    );
  }

  private getEndpoint() {
    // if (isDevMode()) {
    //   return 'http://localhost:5001/angularattack2018/us-central1/receiptdetector';
    // }

    return 'https://us-central1-angularattack2018.cloudfunctions.net/receiptdetector';
  }
}

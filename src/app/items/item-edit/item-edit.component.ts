import { Component, OnInit } from '@angular/core';
import { Receipt } from '../../model/receipt.model';
import { TextutilsService } from '../../services/textutils.service';
import { ImagedetectorService } from '../../services/imagedetector.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  detecteReceipt: Receipt;
  fileToUpload: File = null;
  isDetecting = false;
  detectedMessage = '';
  detectedText = '';

  constructor(private textUtilsService: TextutilsService, private imagedetectorService: ImagedetectorService) { }

  ngOnInit() {
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    if (!this.fileToUpload) {
      console.log('No file to upload!');
      return;
    }
    this.isDetecting = true;
    this.imagedetectorService.detectFile(this.fileToUpload).subscribe(
      data => {
        // do something, if upload success
        console.log(data);
        this.detectedMessage = data.message;
        this.detectedText = data.result.text;
        this.detecteReceipt = this.recognizeReceipt(data.result.text);
      },
      error => {
        console.log(error);
      },
      () => {
        setTimeout(() => { this.isDetecting = false; }, 0);
      }
    );
  }

  recognizeReceipt(text: string): Receipt {
    const result = this.textUtilsService.convertToLines(text);
    const receipt = this.textUtilsService.stringLinesToReceipt(result);
    return receipt;
  }
}

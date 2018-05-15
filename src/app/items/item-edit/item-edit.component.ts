import {
  Component,
  OnInit,
  isDevMode,
  EventEmitter,
  Inject
} from '@angular/core';
import { Receipt } from '../../model/receipt.model';
import { TextutilsService } from '../../services/textutils.service';
import { ImagedetectorService } from '../../services/imagedetector.service';
import { ReceiptService } from '../../services/receipt.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  receipt: Receipt;

  fileToUpload: File = null;
  isDetecting = false;
  detectedMessage = '';
  detectedText = '';

  constructor(
    private textUtilsService: TextutilsService,
    private receiptService: ReceiptService,
    private imagedetectorService: ImagedetectorService,
    public dialogRef: MatDialogRef<ItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.receipt = this.data.receipt;
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
    this.executeDetection(this.fileToUpload).subscribe(
      data => {
        // do something, if upload success
        console.log(data);
        this.detectedMessage = data.message;
        this.detectedText = data.result.text;
        this.receipt = this.recognizeReceipt(data.result.text);
      },
      error => {
        console.log(error);
      },
      () => {
        setTimeout(() => {
          this.isDetecting = false;
        }, 0);
      }
    );
  }

  executeDetection(file: File) {
    if (isDevMode()) {
      return this.imagedetectorService.detectFileFake(file);
    }

    return this.imagedetectorService.detectFile(file);
  }

  recognizeReceipt(text: string): Receipt {
    const result = this.textUtilsService.convertToLines(text);
    const receipt = this.textUtilsService.stringLinesToReceipt(result);
    return receipt;
  }

  saveReceipt(receipt: Receipt) {
    this.receiptService.save(receipt);
    this.dialogRef.close();
  }
}

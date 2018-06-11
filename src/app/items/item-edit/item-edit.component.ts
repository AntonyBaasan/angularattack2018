import {
  Component,
  OnInit,
  isDevMode,
  EventEmitter,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Receipt } from '../../model/receipt.model';
import { TextutilsService } from '../../services/textutils.service';
import { ImagedetectorService } from '../../services/imagedetector.service';
import { ReceiptService } from '../../services/receipt.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDatepickerInputEvent,
  MatDatepicker
} from '@angular/material';
import { ImageDropComponent } from '../../shared/image-drop/image-drop.component';
import { FormControl } from '@angular/forms';
import { ReceiptDetectionResult } from '../../model/receipt-detection-result.model';
import { DateUtilsService } from '../../services/date-utils.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  @ViewChild(ImageDropComponent) imageDropComponentRef: ImageDropComponent;
  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;
  receipt: Receipt;
  receiptDetectionResult: ReceiptDetectionResult;
  title = 'New';

  fileToUpload: File = null;
  isDetecting = false;
  detectedMessage = '';
  detectedText = '';
  today = new FormControl(new Date());

  constructor(
    private textUtilsService: TextutilsService,
    private receiptService: ReceiptService,
    private imagedetectorService: ImagedetectorService,
    public dialogRef: MatDialogRef<ItemEditComponent>,
    public dateUtilsService: DateUtilsService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.receipt = this.data.receipt;
    this.title = this.receipt.id ? 'Edit' : 'New';
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.fileToUpload = this.imageDropComponentRef.getFile();

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
        this.receiptDetectionResult = this.recognizeReceipt(data.result.text);
        this.receipt = this.convertDetectionToReceipt(
          this.receipt,
          this.receiptDetectionResult
        );
      },
      error => {
        console.log(error);
        this.snackBar.open('Something went wrong!', '', { duration: 3000 });
      },
      () => {
        setTimeout(() => {
          this.isDetecting = false;
        }, 0);
      }
    );
  }

  convertDetectionToReceipt(
    receipt: Receipt,
    rdr: ReceiptDetectionResult
  ): Receipt {
    if (rdr.title[0]) {
      receipt.title = rdr.title[0];
    }
    if (rdr.date[0]) {
      receipt.date = rdr.date[0];
    }
    if (rdr.total[0]) {
      receipt.total = rdr.total[0];
    }

    return receipt;
  }

  executeDetection(file: File) {
    // if (isDevMode()) {
    //   return this.imagedetectorService.detectFileFake(file);
    // }

    return this.imagedetectorService.detectFile(file);
  }

  recognizeReceipt(text: string): ReceiptDetectionResult {
    const result = this.textUtilsService.convertToLines(text);
    const receipt = this.textUtilsService.stringLinesToReceipt(result);
    return receipt;
  }

  saveReceipt(receipt: Receipt) {
    return this.receiptService.save(receipt).subscribe(
      () => {
        this.dialogRef.close();

        this.dialogRef.close({
          action: this.receipt.id ? 'Update' : 'AddNew',
          payload: receipt
        });
      },
      error => {
        this.snackBar.open('Something went wrong!', '', { duration: 3000 });
      }
    );
  }

  onCancel() {
    this.dialogRef.close({ action: 'Cancel' });
  }

  imageChanged() {
    this.uploadFileToActivity();
  }

  dateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.receipt.date = event.value;
  }

  convertDateToForm(date: Date) {
    return this.dateUtilsService.convertDateToForm(date);
  }
}

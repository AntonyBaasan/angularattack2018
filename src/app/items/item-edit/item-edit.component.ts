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

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  @ViewChild(ImageDropComponent) imageDropComponentRef: ImageDropComponent;
  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;
  receipt: Receipt;
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.receipt = this.data.receipt;
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

  onCancel() {
    this.dialogRef.close();
  }

  imageChanged() {
    this.uploadFileToActivity();
  }

  dateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.receipt.date = event.value;
  }

  convertDateToForm(date: Date) {
    if (date) {
      return new FormControl(date);
    }

    return new FormControl('');
  }
}

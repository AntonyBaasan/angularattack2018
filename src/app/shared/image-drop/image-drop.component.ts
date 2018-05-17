import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-image-drop',
  templateUrl: './image-drop.component.html',
  styleUrls: ['./image-drop.component.css']
})
export class ImageDropComponent implements OnInit {
  @ViewChild('uploader') uploaderEl: ElementRef<HTMLDivElement>;
  // @ViewChild('filePhoto') filePhotoRef: ElementRef<HTMLInputElement>;
  @ViewChild('image') imageRef: ElementRef<HTMLImageElement>;
  @Output() imageChanged: EventEmitter<any> = new EventEmitter();

  private currentFile: File;

  constructor() {}

  ngOnInit() {}

  onClickUploader() {
    // this.filePhotoRef.nativeElement.click();
  }

  ImageChange(e: any) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageRef.nativeElement.setAttribute('src', event.target.result);
    };

    this.currentFile = e.target.files[0];
    reader.readAsDataURL(this.currentFile);
    this.imageChanged.emit();
  }

  public getFile(): File {
    return this.currentFile;
  }
}

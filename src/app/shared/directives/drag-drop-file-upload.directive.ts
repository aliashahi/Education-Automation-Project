import {
  Directive,
  Output,
  HostBinding,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[DragDropFileUpload]',
})
export class DragDropFileUploadDirective {
  @Output() fileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private background = '#f8f8f8';
  @HostBinding('style.border') private border:
    | '2px dashed red !important'
    | '' = '';

  // Dragover Event
  @HostListener('dragover', ['$event']) dragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '##dddddd !important';  
    this.border = '2px dashed red !important';
  }

  // Dragleave Event
  @HostListener('dragleave', ['$event']) public dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#f8f8f8';
    this.border = '';
  }

  // Drop Event
  @HostListener('drop', ['$event']) public drop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#f8f8f8';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}

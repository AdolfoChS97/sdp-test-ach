import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { XlsxService } from './services/xlsx/xlsx.service';
import { FileReaderService } from './services/file-reader/file-reader.service';
import { getObjectKeys } from './utils/get-object-keys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public selectedFile: File | null = null;
  public categories: any;
  public getObjectKeys = getObjectKeys;
  constructor(
    private _snackBar: MatSnackBar,
    private _xlsxService: XlsxService,
    private _fileReaderService: FileReaderService
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = null;
    const file = this._fileReaderService.getFileByEvent(event);
    if(this.checkExtension(file)) this.selectedFile = file ?? null;
    if(this.selectedFile) {
      const reader = this._fileReaderService.getReaderFromFile(file);

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const { target } = e;
        const { SheetNames, Sheets } = this._xlsxService.getWorkbookFromBinary(target?.result);
        const workSheets = this._xlsxService.getWorkSheets(SheetNames, Sheets);
        this.categories = this._xlsxService.getCategoriesByWorksheets(workSheets);
        console.log(this.categories);
      }
    }
  }

  checkExtension(file: File) {
    const [,, type, ] = file.type.split('.');
    const extension = file.name.split('.').pop();
    if(extension != 'xlsx' && type != 'spreadsheet') {
      this._snackBar.open(`You could't upload files which has ${extension} extension`, 'Close');
      return false;
    }
    return true;
  }

  intercambiarElementos(event: any): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

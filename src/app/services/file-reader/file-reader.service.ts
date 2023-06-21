import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  getFileByEvent(event: any): File {
    const target: DataTransfer = <DataTransfer>(event.target);
    const { files } = target;
    return files[0];
  }

  getReaderFromFile(file: File): FileReader {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(file);
    return reader;
  }

}

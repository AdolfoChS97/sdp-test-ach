import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class XlsxService {

  getWorkbookFromBinary(binaryString: string | ArrayBuffer | undefined | null): XLSX.WorkBook {
    return XLSX.read(binaryString, { type: 'binary' })
  }

  getWorkSheets(sheetNames: Array<string>, sheets: XLSX.WorkSheet) {
    return sheetNames.map((sheetName) => sheets[sheetName], []);
  }

  getCategoriesByWorksheets(workSheets: XLSX.WorkSheet[]) {
    const [ sheet ] = workSheets.map((ws: XLSX.WorkSheet) => XLSX.utils.sheet_to_json(ws)) as unknown[] as any[]
    const categories: any = {};
    for (const row of sheet) {
      const category = row['Categoría'];
      const data = row;
      if (!categories.hasOwnProperty(category)) {
        delete row['Categoría']
        categories[category] = [data];
      }

      if (categories.hasOwnProperty(category)) {
        delete row['Categoría']
        categories[category].push(row)
      };
    }

    return categories;
  }
}

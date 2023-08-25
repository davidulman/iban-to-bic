export function columnCode(col: any): string;
export function getCellValue(worksheet: any, col: any, row: any): any;
export function writeOutputs(name: any, bankCodesObj: any): Promise<void>;
export function downloadXLSX(url: any, sheet: any): Promise<xlsx.WorkBook | xlsx.WorkSheet>;
export function downloadJSDOM(url: any): Promise<any>;
export function downloadCSV(url: any, options: any, encoding: any, linesModifier: any): Promise<neatCsv.Row[]>;
export function assertTableHead(worksheet: any, row: any, values: any): void;
import xlsx = require("xlsx");
import neatCsv = require("neat-csv");

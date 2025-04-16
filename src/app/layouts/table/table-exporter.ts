export interface TableExporter {
    exportTableAs(options:FileOptions):void;
}
export enum fileTypeEnum {
    CSV = 'csv',
}
export interface FileOptions {
    fileName: string;
    fileType: fileTypeEnum;
    delimiter?: string;
}
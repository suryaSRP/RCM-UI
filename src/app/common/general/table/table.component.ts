// import { LiveAnnouncer } from '@angular/cdk/a11y';
// import { SelectionModel } from '@angular/cdk/collections';
// import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
// import { MatIconRegistry } from '@angular/material/icon';
// import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { DomSanitizer } from '@angular/platform-browser';
// import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
// import { MatTableExporterDirective } from 'mat-table-exporter';
// import { TableOptions } from 'src/app/layouts/table/table.component';
// // import { ColumnOption, TableOptions } from 'src/app/layouts/table/table.component';
// // import { TableExporter } from 'mat-table-exporter';

// export interface TableOption {
//   enableTableFilter?: boolean;
//   enableTableActionFilter?: boolean;
//   defaultPageSize?: number;
//   pageSizeOptions?: number[];
//   enableTablePagination?: boolean;
//   enableCheckBoxSelection?: boolean;
//   enableRadioSelection?: boolean;
//   emptyOptionText: string;
//   clickToAction?: boolean;
//   enableColumnSetting?: boolean;
//   resetToFirst?: boolean
// }
// export interface TableRowAction {
//   type?: "button" | "link";
//   label?: string;
//   iconPath?: string;
//   matIconName?: string;
//   btnClass?: string;
//   action?: string;
// }

// export interface TableRowActionColumn {
//   headerName: string;
//   rowActions: Array<TableRowAction>;
// }
// export interface TableRowActionObject {
//   rowAction: TableRowAction,
//   data: any,
//   index: number
// }

// export interface ColumnOption {
//   header: string; // Must be same as "columnDef" columnDef: string; // Must be same as "header" name?: string; enableSorting: boolean; sortOrder?: number; hidden: boolean; reportColumnField?: string;
//   default?: boolean;
//   type?: any,
//   currencyType?: any,
//   currency?: string,
//   dateType?: string, action?: TableAction
// }
// export interface TableAction {
//   name: string,
//   type: string,
//   btnClass?: string
// }
// export interface APIColumn { name: string, display: boolean, order: string }
// export interface CheckBoxSelection { data: any; isChecked: boolean };
// export interface RadioButtonSelection { data: any; IsChecked: boolean; }
// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.scss'],
//   encapsulation: ViewEncapsulation.None
// })

// export class TableComponent implements AfterViewInit, OnInit, OnChanges {

//   @ViewChild(MatSort) sort!: MatSort;
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild('exporter') exporter!: MatTableExporterDirective;

//   @Input() columns: ColumnOption[] = []
//   @Input() allColumnsSortable: boolean = false
//   @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource()
//   @Input() jsonData: Array<any> = []
//   @Input() customSort!: any;
//   @Input() localSort: any = false
//   @Input() tableOptions!: TableOptions;
//   @Input() rowActions!: TableRowActionColumn[];
//   @Input() filterInputPlaceholder: string = ''
//   @Input() filterInputLabel: string = "";
//   @Input() selection!: SelectionModel<any>
//   @Output() onRowRadioSelection: EventEmitter<any> = new EventEmitter<any>();
//   @Output() onRowActionBtnClicked: EventEmitter<TableRowActionObject> = new EventEmitter<TableRowActionObject>();
//   @Input() hiddenColumns: Array<string> = [];
//   @Input() display_column!: Array<APIColumn>; // for column setting button functionality
//   @Output() selectedRow: EventEmitter<any> = new EventEmitter<any>;
//   @Output() changedColumns: EventEmitter<any> = new EventEmitter<any>;
//   @Output() sortColumnTrigger: EventEmitter<any> = new EventEmitter<any>();
//   displayedColumns!: string[];
//   options: any;
//   showFirstLastButtons: boolean = true;
//   @Input() isJsonData: boolean = true;
//   constructor(
//     // private matIconRegistry: MatIconRegistry,
//     // private paginatorIntl: MatPaginatorIntl,
//     // // private commonService: CommonService, 
//     // private domSanitizer: DomSanitizer,
//     // public router: Router,
//     // // private browserStoreManagerService: BrowserStareMsagerService,
//     // private translate: TranslateService,
//     // private _liveAnnouncer: LiveAnnouncer
//   ) {
//   }
//   ngOnInit(): void {
//   }
//   ngOnChanges(changes: SimpleChanges): void {

//   }
//   ngAfterViewInit(): void {

//   }
// }

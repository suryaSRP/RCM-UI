import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { FileOptions, TableExporter } from './table-exporter';

export interface TableOptions {
  enableTableFilter?: boolean;
  enableTableActionFilter?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  enableTablePagination?: boolean;
  enableCheckBoxSelection?: boolean;
  enableRadioSelection?: boolean;
  emptyOptionsText?: string;
  clickToAction?: boolean;
  enableColumnSetting?: boolean;
  resetToFirst?: boolean;
}

export interface TableRowAction {
  type: "button" | "link";
  label: string;
  iconPath?: string;
  matIconName?: string;
  btnClass?: string;
  action?: string
}

export interface TableRowActionColumn {
  headerName: string;
  rowActions: Array<TableRowAction>
}

export interface TableRowActionObject {
  rowAction: TableRowAction,
  data: any,
  index: number
}

export interface ColumnOption {
  header: string;
  columnDef: string;
  name?: string;
  enableSorting: boolean;
  sortOrder?: number;
  hidden: boolean;
  reportColumnField?: string;
  default?: boolean;
  type?: any
}
export interface TableAction {
  name: string;
  type: string;
  btnClass: string;
}
export interface CheckBoxSelection {
  data: any;
  isChecked: boolean;
}
export interface RadioButtonSelection {
  data: any;
  isSelected: boolean;
}
export interface APIColumn {
  name: string;
  display: boolean;
  order: string;
}
@Component({
  selector: 'dy-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements AfterViewInit, OnInit , TableExporter, OnChanges {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild('exporter') exporter!: MatTableExporterDirective;

  @Input() columns: ColumnOption[] = [];
  @Input() allColumnsSortable: boolean = false;
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @Input() jsonData: Array<any> = [];
  @Input() customSort!: any;
  @Input() localSort: any = false;
  // @Input() displayedColumns: any
  /**
     * ******* Table Customization *********
     *
     * enableTableFilter: Optional property to enable the table filter. default value: "false"
     *
     * defaultPageSize: Optional property to specify the records to dispaly in the table. default value : 10
     *
     * pageSizeOptions: Optional property, to specify the range of options to display the records in table. default value: [10, 15, 30, 45]
     *
     * enableTablePagination: Optional property, to enable the table pagination. default value: "true"
     *
     * enableCheckBoxSelection: Optional property, to enable the checkbox selection for the rows. default value: "false"
     *
     * emptyOptionsText: Optional property, Customize text to be displayed, when no rows are present. default value: No data found
     *
     * rowActionHeaderName: Optional property, to specify the column name for the row action column. default value: ""
     */
  @Input() tableOptions!: TableOptions;
  /**
   * Collection of actions to display in the row i.e. for example Edit button etc.
   */
  @Input() rowActions!: TableRowActionColumn[];
  /**
   * Title to display in the table
   */
  @Input() tableTitle!: string;
  /**
   * Event handler for master checkbox selection
   */
  @Output() onMasterRowCheckboxSelection: EventEmitter<CheckBoxSelection> = new EventEmitter<CheckBoxSelection>();
  /**
   * Event handler for the row checkbox selection
   */
  @Output() onRowCheckboxSelection: EventEmitter<CheckBoxSelection> = new EventEmitter<CheckBoxSelection>();
  /**
   * Event handler for the row action button
   */
  @Output() onRowActionBtnClicked: EventEmitter<TableRowActionObject> = new EventEmitter<TableRowActionObject>();
  /**
   * Filter Input Placeholder
   */
  @Input() filterInputPlaceholder: string = "";
  /**
   * Filter Input Label
   */
  @Input() filterInputLabel: string = "";
  /**
   * Event handler for the row checkbox selection
   */
  @Output() onRowRadioSelection: EventEmitter<any> = new EventEmitter<any>();

  @Input() selection!: SelectionModel<any>;

  @Input() radioSelection!: SelectionModel<any>;

  @Input() hiddenColumns: Array<string> = [];

  @Input() display_column!: Array<APIColumn>; // for column setting button functionality

  @Output() selectedRow: EventEmitter<any> = new EventEmitter<any>();

  @Output() changedColumns: EventEmitter<any> = new EventEmitter<any>();

  @Output() sortColumnTrigger: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns: string[] = [];

  showFirstLastButtons: boolean = true;
  /**
  * Usage flag datasource/json data
  */
  @Input() isJsonData: boolean = true;

  public options: any

  @Input() totalCount!: number;
  @Output() pageChanged: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private matIconRegistry: MatIconRegistry,
    private paginatorIntl: MatPaginatorIntl,
    private domSanitizer: DomSanitizer,
    private router: Router,
    // private translate:TranslateService
    private _liveAnnouncer: LiveAnnouncer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'sort-asc',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/sort-asc.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'plus',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/plus.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'gear',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/gear.svg')
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableOptions']?.currentValue?.resetToFirst) {
      this.firstPage();
      if (this.paginator) {
        this.paginator.pageSize = 15;
      }
    }
    this.dataSourceInit(changes);
    this.onInit();
  }

  ngOnInit(): void {
    this.onInit()
    // let adminColumn:any = JSON.parse(this.browserStoreManagerService.getCookies(this.router.url) || 'null')
    // if(adminColumn){
      // this.updateUserPreferences([])
    // }
  }

  ngAfterViewInit(): void {
    if (this.options?.enableTablePagination) {
      if (!this.totalCount) {  // when totalCount is not input
        this.dataSource.paginator = this.paginator;
      }
      this.updatePaginatorLabels()
    }
    this.onInit()
    // this.translate.onLangChange.subscribe((lang:any) => {
    //   if (this.options?.enableTablePagination) {
    //   this.updatePaginatorLabels();
    //   }
    //   this.onInit()
    // })
  }
  updatePaginatorLabels() {
    this.paginatorIntl.itemsPerPageLabel = 'data per page';
    this.paginatorIntl.nextPageLabel = 'Next';
    this.paginatorIntl.previousPageLabel = 'previous';
  }

  ngAfterViewChecked(): void {
    if (this.localSort) {
      this.dataSource.sort = this.sort;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if(this.options?.enableCheckBoxSelection || this.options?.enableRadioSelection) {
      moveItemInArray(this.displayedColumns, event.previousIndex + 1, event.currentIndex + 1);
    } else {
      moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    }
    this.changedColumns.emit({
        original: this.columns,
        visible: this.displayedColumns,
      });
    this.columns.map(item => item.columnDef).filter((item: any) => !this.displayedColumns.includes(item)).map((item: any, i: number) => {
        this.display_column.push({
          name: item,
          display: this.displayedColumns.includes(item),
          order: (this.displayedColumns.length + i).toString()
        });
      });

    this.updateColumnOrder(this.displayedColumns);
    const columnHeader = []
    for( let i = 0; i < this.columns.length;i++){
       if(this.displayedColumns.includes(this.columns[i].columnDef)){
           columnHeader.push(this.columns[i].header)
       }
    }
    //  this.browserStoreManagerService.setCookies(this.router.url,JSON.stringify(columnHeader));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.totalCount ?? this.dataSource.data.length;
    return numSelected == numRows;
  }
  /* Reset the paginator to first page */
  firstPage() {
    this.paginator?.firstPage()
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(isChecked: any) {
    this.onMasterRowCheckboxSelection.emit({ data: this.dataSource.data, isChecked })
  }

  onRowCheckBoxChanged(selectedRow: any, isChecked: boolean): void {
    this.onRowCheckboxSelection.emit({ data: selectedRow, isChecked });
  }

  onRowRadioBoxChanged(selectedRow: any): void {
    this.onRowRadioSelection.emit(selectedRow);
  }

  onRowActionClicked(buttonObj: any, rowObj: any, index: number): void {
    const obj: TableRowActionObject = {
      rowAction: buttonObj,
      data: rowObj,
      index: index
    }
    this.onRowActionBtnClicked.emit(obj);
  }

  onRowClicked(data: any) {
    this.selectedRow.emit(data);
  }

  onTableFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement)?.value || event;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onInit() {
    this.columnInit();
    this.options = this.loadTableConfiguration();
    this.rowActions = this.rowActions || new Array<TableRowAction[]>();

    if (this.hiddenColumns) {     // Just check if it exists even if the array is empty
      // console.log(this.columns,"this.columnsthis.columnsthis.columnsthis.columnsthis.columnsthis.columnsthis.columnsthis.columnsthis.columns")
      this.columns.forEach(column => {
        if (this.hiddenColumns.includes(column.header)) {
          column.hidden = true;
        } else {
          column.hidden = false;
        }
      });
      const tempColumns = this.columns.filter(item => item.hidden === false);
      this.displayedColumns = tempColumns.map(item => item.columnDef);
    }
    if (this.options?.enableCheckBoxSelection) {
      let selectColumn = ["select"];
      const newColumns = new Array<string>().concat(selectColumn, this.displayedColumns);
      this.displayedColumns = newColumns;
    }

    if (this.options?.enableRadioSelection) {
      let selectColumn = ["select"];
      const newColumns = new Array<string>().concat(selectColumn, this.displayedColumns);
      this.displayedColumns = newColumns;
    }
    if (this.rowActions.length > 0) {
      for (let index = 0; index < this.rowActions.length; index++) {
        this.displayedColumns.push("action-" + index);
      }
    }
  }

  dataSourceInit(changes: any) {
    console.log(changes, "changes");
    if (!changes['dataSource']) {
      if (this.jsonData?.length !== 0) {
        this.dataSource = new MatTableDataSource(this.jsonData);
      } else if (this.isJsonData) {
        this.eraseData();
      }
      if (this.customSort) {
        this.dataSource.sortData = this.customSort
      }
      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property.toLowerCase().includes("date")) {
          return new Date(item[property]);
        } else {
          return item[property];
        }
      }
    }
  }

  columnInit() {
    if (this.jsonData.length !== 0 && this.columns.length === 0) {
      Object.keys(this.jsonData[0]).filter(key => key != 'sortOrder').forEach(key => {
        this.columns.push({
          header: key,
          columnDef: key,
          enableSorting: this.allColumnsSortable,
          hidden: false
        });
      })
    }
  }

  exportTableAs(options: FileOptions) {
    this.exporter.exportTable(options.fileType, { fileName: options.fileName })
  }

  loadTableConfiguration() {
    return {
      defaultPageSize: this.tableOptions?.defaultPageSize ?? 15,
      enableCheckBoxSelection: this.tableOptions?.enableCheckBoxSelection ?? false,
      enableRadioSelection: this.tableOptions?.enableRadioSelection ?? false,
      enableTableFilter: this.tableOptions?.enableTableFilter ?? false,
      enableTablePagination: this.tableOptions?.enableTablePagination ?? true,
      pageSizeOptions: this.tableOptions?.pageSizeOptions ?? [15, 30, 45, 60],
      emptyOptionsText: this.tableOptions?.emptyOptionsText ?? "No Data Found",
      enableColumnSetting: this.tableOptions?.enableColumnSetting ?? true
    };
  }

  pageChange(event: PageEvent) {
    this.pageChanged.emit(event);
  }

  openColumnSettings() {
    if (!this.options?.enableColumnSetting) { return; }
    // this.commonService.openSettingPopup({
    //   originalData: this.columns.map(item => item.header),
    //   visibleData: this.columns.filter(column => !column.hidden).map(item => item.header),
    //   related: "Columns",
    //   tableTitle: this.tableTitle
    // }).subscribe((res :any)=>{
    //   this.hiddenColumns = this.columns.map(item => item.header).filter(item => !res.includes(item))
    //   this.changedColumns.emit({
    //     original: this.columns,
    //     visible: res,
    //   });
    //   this.updateColumnOrder(res);
    //    this.onInit();
    //   this.browserStoreManagerService.setCookies(this.router.url,JSON.stringify(res))
    // });
  }

  // if not visible, use this.displayedColumns for visible
  updateColumnOrder(visible: Array<string>,) {
    this.display_column = new Array<APIColumn>();
    visible.forEach((item: any, i: number) => {
      this.display_column.push({
        name: item,
        display: visible.includes(item),
        order: i.toString()
      });
    });
    this.columns.map(item => item.header).filter((item: any) => !visible.includes(item)).map((item: any, i: number) => {
      this.display_column.push({
        name: item,
        display: visible.includes(item),
        order: (visible.length + i).toString()
      });
    });

    let displayNames = this.display_column.map(item => item.name);
    this.displayedColumns.sort((a: any, b: any) => displayNames.indexOf(a) - displayNames.indexOf(b)); // ordering by display_column's order value
    this.columns.sort((a, b) => displayNames.indexOf(a.header) - displayNames.indexOf(b.header));
    this.columns.sort((a, b) => displayNames.indexOf(a.columnDef) - displayNames.indexOf(b.columnDef));
  }

  // updateUserPreferences(apply: Array<string>) {
  //   this.hiddenColumns = this.columns.map(item => item.header).filter(item => !apply.includes(item))
  //   this.changedColumns.emit({
  //     original: this.columns,
  //     visible: this.displayedColumns,
  //   });
  //   this.updateColumnOrder(apply);
  //   this.onInit();
  // }

  eraseData() {
    this.dataSource = new MatTableDataSource();
  }
  sortData(event: any) {
    if (event.direction) {
      this._liveAnnouncer.announce('descending');
    }
  }
}


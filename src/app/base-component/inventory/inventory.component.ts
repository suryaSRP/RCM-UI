import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogComponent } from 'src/app/common/modal/mat-dialog/mat-dialog.component';
import { ColumnOption, TableOptions } from 'src/app/layouts/table/table.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackBar.service';
import { inventoryData } from 'src/app/utils/mockData';
import { defaultPageSize, pageSizeOptions } from 'src/app/utils/shared/constants';
import { inventoryTableColumn } from 'src/app/utils/shared/headers.ts/columnHeaders';
import { InventoryList } from 'src/app/utils/shared/interfaces/stuctureInterFace';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  // imports: [MatTableModule, MatPaginatorModule],
})
export class InventoryComponent implements OnInit, AfterViewInit {
  public sourceDataArray: any = []
  public workFlowDataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
  public sourceData: Array<InventoryList> = []
  public contentFlag: any = {
    actionButton: true,
    actionButtonArray: [{
      title: 'editProduct',
      value: 'edit'
    }, {
      title: 'download',
      value: 'download'
    }
    ]
  }
  public tableOption: TableOptions = {
    clickToAction: true,
    enableColumnSetting: true,
    pageSizeOptions: pageSizeOptions,
    defaultPageSize: defaultPageSize

  }
  public workFlowTableColumns!: ColumnOption[];
  flds: any;
  existingData: any;
  currentGivenData: any;
  constructor(
    public apiservice: ApiServiceService,
    public dialog: MatDialog,
    public productService: ProductService,
    // public snackBar: MatSnackBar
    public snackBarService:SnackbarService
  ) { }

  ngOnInit(): void {
    this.workFlowTableColumns = inventoryTableColumn
    this.getInventoryData()
    this.sourceData = new Array<InventoryList>()
    // this.sourceData = inventoryData
    this.workFlowDataSource = new MatTableDataSource<any>(this.sourceData)
    this.sourceDataArray = [
      {
        workFlowDataSource: this.workFlowDataSource,
        workFlowTableColumns: this.workFlowTableColumns,
        sourceData: this.sourceData,
        tableOption: this.tableOption,
        tableTitle: 'InventoryList',
        pageTotalCount: inventoryData.length,

      }
    ]
  }
  getInventoryData() {
this.productService.listProduct().subscribe({
  next: (resp: any) => {
    console.log(resp, "resp")
    if (resp) {
      this.sourceData = resp.data
      // this.workFlowDataSource = new MatTableDataSource<any>(this.sourceData)
      // this.workFlowDataSource.paginator = this.tableOption.paginator
      // this.workFlowDataSource.sort = this.tableOption.sort
    }  
  }
})
  }
  pageChangedEvent(pageEvent: any) { }
  actionButtonClicked(actionEvent: any) { }
  ngAfterViewInit() {
  }
  addFormEvent(event: any) {
    console.log(event, "addFormEvent");
    this.apiservice.fetchFlds(event.formFor, 'create').subscribe(resp => {
      this.flds = resp
      const dialogRef = this.dialog.open(MatDialogComponent, {
        width: '750px',
        data: {
          title: 'Add Product', showas: 'form', flds: this.flds, validation: { duplicateCheck: this.existingData },
          page: event.formFor, action: ["create", "cancel"], currentData: this.currentGivenData, pageAction: "Create"
        }
      });
      const dialogSubmitSubscription = dialogRef.componentInstance.submitClicked.subscribe({
        next: (result: any) => {
          console.log(result, "result")
          this.productService.createProduct(result).subscribe({
            next: (resp: any) => {
              console.log(resp, "resp")
              if (resp) {

              }
            },
            error: (error: any) => {
              let config = new MatSnackBarConfig();
              config.duration = 5000;
              config.panelClass = ['red-snackbar']
              this.snackBarService.error(error.error.message)
            }
          })
        },
        error: (error: any) => {
          console.log('Error:', error);
        }
      });

    })
  }
}
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiServiceService } from '../services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnOption, TableOptions, TableRowActionColumn } from '../layouts/table/table.component';
import { empDetailsHeader, empDetailsList } from './employee.interface';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {
  public dataSource: any
  displayedColumns!: string[];
  public userData: any[] = [];
  public sourceDataArray: any
  public workFlowDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public workFlowTableColumns!: ColumnOption[];
  public sourceData: Array<empDetailsList> = []
  public rowAction: TableRowActionColumn[] = [
    {
      headerName:"Action",
      rowActions:[
        {
          type:'link',
          label:'view Details',
          action:'view'
        }
      ]
    },{
      headerName:"",
      rowActions:[
        {
          type:'button',
          label:'',
          action:'delete',
          btnClass:"deleteIcon",
          matIconName:'delete',
        }
      ]
    }
  ]
  public tableOptions: TableOptions = {
    clickToAction: true,
    enableColumnSetting: true
  }
  constructor(
    public apiservice: ApiServiceService,
    public dialog: MatDialog) { }

  ngOnInit() {
    console.log("employeeManagemewnr_workss")
    this.workFlowTableColumns = empDetailsHeader.filter((x: any) => x.hidden === false)
    this.sourceDataArray = [{
      "workFlowDataSource": this.workFlowDataSource,
      "workFlowTableColumns": this.workFlowTableColumns,
      "sourceData": this.sourceData,
      "rowActions": this.rowAction,
      "tableOptions": this.tableOptions,
      "tableTitle": "Employee Details",
      "pageTotalCount": 0
    }]
    this.getUserDetails()
  }
  getUserDetails() {
    this.apiservice.getUserList({}).subscribe(data => {
      console.log(data, "userData")
      this.sourceData = data.data
      this.workFlowDataSource = new MatTableDataSource<any>(this.sourceData);
      this.sourceDataArray[0].workFlowDataSource = this.workFlowDataSource
    })
  }
  pageChangedEvent(event: any) {

  }
}

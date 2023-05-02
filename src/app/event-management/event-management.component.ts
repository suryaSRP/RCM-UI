import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnOption, TableOptions, TableRowActionColumn } from '../layouts/table/table.component';
import { ApiServiceService } from '../services/api-service.service';
import { eventDetailsHeader, eventDetailsList } from './event.interfact';
import { MatDialogComponent } from '../common/modal/mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.scss']
})
export class EventManagementComponent implements OnInit {
  public dataSource: any
  displayedColumns!: string[];
  public userData: any[] = [];
  public sourceDataArray: any
  public workFlowDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public workFlowTableColumns!: ColumnOption[];
  public sourceData: Array<eventDetailsList> = []
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
  flds: any;
  constructor(
    public apiservice: ApiServiceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.workFlowTableColumns = eventDetailsHeader.filter((x: any) => x.hidden === false)
    this.sourceDataArray = [{
      "workFlowDataSource": this.workFlowDataSource,
      "workFlowTableColumns": this.workFlowTableColumns,
      "sourceData": this.sourceData,
      "rowActions": this.rowAction,
      "tableOptions": this.tableOptions,
      "tableTitle": "Event Management",
      "pageTotalCount": 0
    }]
    this.getUserDetails()
  }
  getUserDetails() {
    this.apiservice.getEventList({}).subscribe(data => {
      console.log(data, "eventDataaaaaaaa")
      this.sourceData = data
      this.workFlowDataSource = new MatTableDataSource<any>(this.sourceData);
      this.sourceDataArray[0].workFlowDataSource = this.workFlowDataSource
    })
  }
  pageChangedEvent(event: any) {

  }
  actionButtonClicked(event:any){
    console.log(event,"action_clikced_event")
    let data =  event.data
    this.apiservice.fetchFlds('eventSchedule', 'edit').subscribe(resp => {
      if (resp) {
        let currentData: any
        // if ('eventSchedule' == "positionMaster") {
        //   currentData = { "_id": fetchValueOf }
        // }
        // this.apiservice.getValueId('eventSchedule', fetchValueOf).subscribe(dataResp => {
          this.flds = resp
          const dialogRef = this.dialog.open(MatDialogComponent, {
            width: '750px',
            data: {
              title: "View Details", showas: 'form', flds: this.flds, formValue: [data],
              page: 'eventSchedule', action: ["close"], currentData: currentData, pageAction: "Information"
            }
          });
        // })
      }
    })
  }
  addEvent(){
    this.apiservice.fetchFlds('eventSchedule', 'Create').subscribe(resp => {
      this.flds = resp
      // this.getEmpDetails(this.orgClickedId)
      const dialogRef = this.dialog.open(MatDialogComponent, {
        width: '750px',
        data: {
          title: "Schedule a Visit", showas: 'form', flds: this.flds,
          page: 'eventSchedule', action: ["create", "cancel"], currentData: { "ee_id": localStorage.getItem('ee_id') },
          pageAction: "CreateEvent"
        }
      });
      // dialogRef.afterClosed().subscribe(result => {
      //   if (result) {
      //     if (result.actionPage === "positionMaster") {
      //       console.log(result, "delete_data_dialog")
      //       if (result.status == 'success') {
      //         this.pstnClickedId = 0
      //       }
      //       this.positionDetails(this.orgClickedId)
      //     }
      //   }
      // });
    })
  }

}

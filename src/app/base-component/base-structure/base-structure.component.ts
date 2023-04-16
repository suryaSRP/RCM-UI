import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from 'src/app/common/modal/mat-dialog/mat-dialog.component';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-base-structure',
  templateUrl: './base-structure.component.html',
  styleUrls: ['./base-structure.component.scss']
})

export class BaseStructureComponent implements OnInit {
  public hideme: any;
  searchCategory: any;
  public baseData: Array<any> = []
  public pstnDataArray: Array<any> = [];
  @Input() sharedVarChange: any
  constructor(
    public apiservice: ApiServiceService,
    public dialog: MatDialog
  ) { }
  public gfg = false;
  public companyClickedId: any = 1;
  public orgClickedId: any = 0;
  public pstnClickedId: any = 0;
  public empClickedId: Number = 0;
  public cardView: boolean = true;
  public listView: boolean = false;
  public search: any = '';
  public items = ["arr1", "arr2", "arr3"]
  public searchOrg: any = ""
  public searchPstn: any = ""
  public searchEmp: any = ""
  public sortOrg: any = ""
  public sortPstn: any = ""
  public sortEmp: any = ""
  public flds: any = []
  public currentData = {
    cmpny_id: this.companyClickedId,
    org_unit_id: this.orgClickedId,
    pstn_id: this.pstnClickedId
  }
  public dynamicPlaceHolder: {
    search: string, sort: string,
    info: string, add: string,
    edit: string, delete: string
  } = {
      search: "Search Here", sort: "click to sort",
      info: "information", add: "Add",
      edit: "Edit", delete: "Delete"
    }
  cmpnyCollapse = 0;
  public existingData: any = {
    cmpny_id: [], org_unit_id: [], pstn_id: []
  }

  ngOnInit() {
    console.log("hitted_company _comp")
    this.apiservice.prsnMenuDtls("").subscribe(resp => {
      console.log(resp, "response")
      this.baseData = resp.data
    })
  }

  addOrgPstnEmp(fldForPage: any, title: string, currentGivenData: any): any {
    this.apiservice.fetchFlds(fldForPage, 'create').subscribe(resp => {
      this.flds = resp
      const dialogRef = this.dialog.open(MatDialogComponent, {
        width: '750px',
        data: {
          title: title, showas: 'form', flds: this.flds, validation: { duplicateCheck: this.existingData },
          page: fldForPage, action: ["create", "cancel"], currentData: currentGivenData, pageAction: "Create"
        }
      });
    })
  }
  addEmp(fldForPage: any, id: any) {
    console.log("add employee")
    this.apiservice.fetchFlds(fldForPage, 'Create').subscribe(resp => {
      this.flds = resp
      const dialogRef = this.dialog.open(MatDialogComponent, {
        width: '750px',
        data: {
          title: "Add Employee", showas: 'form', flds: this.flds, validation: { duplicateCheck: this.existingData },
          page: fldForPage, action: ["create", "cancel"], currentData: id, pageAction: "Create"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.actionPage === "positionMaster") {
            console.log(result, "delete_data_dialog")
            if (result.status == 'success') {
              this.pstnClickedId = 0
            }
            this.positionDetails(this.orgClickedId)
          }
        }
      });
    })
  }

  infoCompOrgPstnEmp(fldForPage: any, title: string, fetchValueOf: any): any {
    console.log(fldForPage, "fldForPage_on_infoCompOrgPstnEmp", fetchValueOf)
    this.apiservice.fetchFlds(fldForPage, 'edit').subscribe(resp => {
      if (resp) {
        let currentData: any
        if (fldForPage == "positionMaster") {
          currentData = { "_id": fetchValueOf }
        }
        this.apiservice.getValueId(fldForPage, fetchValueOf).subscribe(dataResp => {
          this.flds = resp
          const dialogRef = this.dialog.open(MatDialogComponent, {
            width: '750px',
            data: {
              title: title, showas: 'form', flds: this.flds, formValue: dataResp.data,
              page: fldForPage, action: ["close"], currentData: currentData, pageAction: "Information"
            }
          });
        })
      }
    })
  }

  searchOn(event: any, category: any, DataId: any) {
    console.log(event, "event_on_SerachOn")
    console.log(category, "category_on_SerachOn")
    console.log(DataId, "DataId_on_SerachOn")
    if (category == "company") {
    } else if (category == "org") {
      if (event.action == "search") {
        console.log(event, "event_searchOn")
        this.searchOrg = event.data
      } else if (event.action == "sort") {
        console.log(event, "event_sortOn_org")
        this.sortOrg = event.data
      } else if (event.action == "modal") {
        if (event.data == "add") {
          this.addOrgPstnEmp('orgInfo', "Add Organisation", { "cmpny_id": this.companyClickedId, })
        } else if (event.data == "info") {
          this.infoCompOrgPstnEmp('companyInfos', 'View Company Information', DataId)
        }
      }
    } else if (category == "position") {
      if (event.action == "search") {
        console.log(event, "event_searchOn")
        this.searchPstn = event.data
      } else if (event.action == "sort") {
        console.log(event, "event_sortOn_position")
        this.sortPstn = event.data
      } else if (event.action == "modal") {
        if (event.data == "add") {
          this.addOrgPstnEmp('positionMaster', "Add Position", { "cmpny_id": this.companyClickedId, "org_unit_id": this.orgClickedId })
        } else if (event.data == "info") {
          this.infoCompOrgPstnEmp('orgInfo', 'View Organisation Information', DataId)
        }
      }
    } else if (category == "employee") {
      console.log(event, "event_searchOn")
      this.searchEmp = event.data
    }
  }

  viewChange(viewType: any, company_id: any) {
    console.log(viewType, "view_type_selected")
    if (viewType === "list") {
      this.cardView = false
      this.listView = true
    } else {
      this.cardView = true
      this.listView = false

    }
  }

  viewInfo() {

  }

  searchCategoryChange(eve: any) {
    this.searchCategory = eve.target.value
  }

  setStep(id: any, category: any) {
    if (category == "company") {
      console.log(id, "setStep_index_value")
      this.companyClickedId = id;
      this.dynamicPlaceHolder = {
        search: "Search Organisation", sort: "Sort Organisation", info: "Company Info",
        add: "Add Organisation", edit: "Edit", delete: "Delete"
      }
    } else if (category == "org") {
      this.orgClickedId = (this.orgClickedId == id) ? 0 : id
      this.pstnClickedId = 0
      this.dynamicPlaceHolder = {
        search: "Search Position", sort: "Sort Position", info: "Organisation Info",
        add: "Add Position", edit: "Edit", delete: "Delete"
      }
    } else if (category == "position") {
      console.log(id, "setStep_position_id", this.pstnClickedId)
      // this.pstnClickedId = id
      this.pstnClickedId = (this.pstnClickedId == id) ? 0 : id
      this.dynamicPlaceHolder = {
        search: "Search", sort: "Sort Employee", info: "Position Info",
        add: "Add Employee", edit: "Edit", delete: "Delete"
      }
    } else if (category == "employee") {
      this.empClickedId = (this.empClickedId == id) ? 0 : id
      console.log(this.empClickedId, "empClickedId_id_clicked")
    }
    this.dataHost(this.companyClickedId, this.orgClickedId, this.pstnClickedId)
  }

  positionDetails(orgId: any) {

    this.apiservice.pstnDtls(orgId).subscribe(resp => {
      console.log(resp, "response")
      this.pstnDataArray = resp.data
      this.dataHost(this.companyClickedId, this.orgClickedId, this.pstnClickedId)
    })
  }

  employeeDetails(pstnId: any) {

  }

  dataHost(coId: any, OrgID?: any, PstnID?: any) {
    this.baseData.forEach(dt => {
      if (coId) {
        if (dt.cmpny_id == coId) {
          dt.orgInfo.forEach((orgDt: any) => {
            this.existingData.org_unit_id.push(orgDt.org_unit_id)
          });
          if (OrgID) {
            this.pstnDataArray.forEach((pstnDt: any) => {
              if (pstnDt.org_unit_id == OrgID) {
                this.existingData.pstn_id.push(pstnDt.pstn_id)
              }
            });
          }
        }
      }
    })
  }
  deleteData(fldForPage: any, id: any) {
    this.apiservice.fetchFlds(fldForPage, 'delete').subscribe(resp => {
      this.flds = resp
      const dialogRef = this.dialog.open(MatDialogComponent, {
        width: '500px',
        data: {
          title: "Delete Confirmation", showas: 'dialog', flds: this.flds, validation: { duplicateCheck: this.existingData },
          page: fldForPage, action: ["yes", "no"], currentData: id, pageAction: "Delete"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.actionPage === "positionMaster") {
            console.log(result, "delete_data_dialog")
            if (result.status == 'success') {
              this.pstnClickedId = 0
            }
            this.positionDetails(this.orgClickedId)
          }
        }
      });
    })
  }
  editData(fldForPage: any, id: any) { }

}

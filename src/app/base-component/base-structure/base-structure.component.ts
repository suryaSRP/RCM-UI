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
  public companyClickedId: Number = 1;
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

  ngOnInit() {
    console.log("hitted_company _comp")
    this.apiservice.prsnMenuDtls("").subscribe(resp => {
      console.log(resp, "response")
      this.baseData = resp.data
    })
  }

  addOrgPstnEmp(fldForPage: any, title: string, currentGivenData: any): any {
    this.apiservice.fetchFlds(fldForPage).subscribe(resp => {
      this.flds = resp
      const dialogRef = this.dialog.open(MatDialogComponent, {
        width: '750px',
        data: {
          title: title, showas: 'form', flds: this.flds,
          page: fldForPage, action: ["create", "cancel"], currentData: currentGivenData
        }
      });
    })
  }

  infoCompOrgPstnEmp(fldForPage: any, title: string, fetchValueFor: any): any {
    this.apiservice.fetchFlds(fldForPage).subscribe(resp => {
      if (resp) {
        this.apiservice.getValueId(fldForPage, fetchValueFor).subscribe(dataResp => {
          this.flds = resp
          const dialogRef = this.dialog.open(MatDialogComponent, {
            width: '750px',
            data: {
              title: title, showas: 'form', flds: this.flds,
              page: fldForPage, action: ["close"], currentData: { "cmpny_id": this.companyClickedId, }
            }
          });
        })
      }
    })
  }

  searchOn(event: any, category: any) {
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
          this.infoCompOrgPstnEmp('companyInfos', 'View Company Information', this.companyClickedId)
        }
      }
    } else if (category == "position") {
      if (event.action == "search") {
        console.log(event, "event_searchOn")
        this.searchPstn = event.data
      } else if (event.action == "sort") {
        console.log(event, "event_sortOn_position")
        this.sortPstn = event.data
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
  }

  positionDetails(orgId: any) {

    this.apiservice.pstnDtls(orgId).subscribe(resp => {
      console.log(resp, "response")
      this.pstnDataArray = resp.data
    })
  }

  employeeDetails(pstnId: any) {

  }
  // nextStep() {
  //   this.step++;
  // }

  // prevStep() {
  //   this.step--;
  // }
}

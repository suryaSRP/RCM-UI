import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
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
    public authservice: AuthService
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
  ngOnInit() {
    this.apiservice.prsnMenuDtls("").subscribe(resp => {
      console.log(resp, "response")
      this.baseData = resp.data
    })
  }
  searchOn(event: any, category: any) {
    if (event.action == "search") {
      if (category == "company") {
      } else if (category == "org") {
        console.log(event, "event_searchOn")
        this.searchOrg = event.data
      } else if (category == "position") {
        console.log(event, "event_searchOn")
        this.searchPstn = event.data
      } else if (category == "employee") {
        console.log(event, "event_searchOn")
        this.searchEmp = event.data
      }
    }
  }

  sortOn(event: any, category: any) {
    console.log(category,"sort_on_clicked")
    if (event.action == "sort") {
      if (category == "company") {
      } else if (category == "org") {
        console.log(event, "event_sortOn_org")
        this.sortOrg = event.data
      } else if (category == "position") {
        console.log(event, "event_sortOn_position")
        this.sortPstn = event.data
      } else if (category == "employee") {
        console.log(event, "event_sortOn_employee")
        this.sortEmp = event.data
      }
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
  cmpnyCollapse = 0;

  setStep(id: any, category: any) {
    if (category == "company") {
      console.log(id, "setStep_index_value")
      this.companyClickedId = id;
      console.log(id, "setStep_index_value", this.cmpnyCollapse)
    } else if (category == "org") {
      this.orgClickedId = (this.orgClickedId == id) ? 0 : id
      console.log(this.orgClickedId, "org_id_clicked")
    } else if (category == "position") {
      console.log(id, "setStep_position_id", this.pstnClickedId)
      // this.pstnClickedId = id
      this.pstnClickedId = (this.pstnClickedId == id) ? 0 : id
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

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-structure',
  templateUrl: './base-structure.component.html',
  styleUrls: ['./base-structure.component.scss']
})

export class BaseStructureComponent implements OnInit {
  public hideme: any;
  searchCategory: any;

  constructor() { }
  public gfg = false;
  public companyData: any;
  public companyClickedId: Number = 1;
  public orgClickedId: Number = 0;
  public pstnClickedId: Number = 0;
  public empClickedId: Number = 0;
  public cardView: boolean = true;
  public listView: boolean = false;
  public search: any = '';
  public items=["arr1","arr2","arr3"]
  ngOnInit() {
console.log(localStorage.getItem("clientCd"),'localStorage.getItem("clientCd")')
    // this.companyData = companyData
    // this.companyClickedId = companyData[0].company_id
  }
  onClick(id: Number, category: any) {
    if (category == "company") {
      this.companyClickedId = (this.companyClickedId == id) ? 0 : id
      console.log(this.companyClickedId, "company_id_clicked", id)
    } else if (category == "org") {
      this.orgClickedId = (this.orgClickedId == id) ? 0 : id
      console.log(this.orgClickedId, "org_id_clicked")
    } else if (category == "position") {
      this.pstnClickedId = (this.pstnClickedId == id) ? 0 : id
      console.log(this.pstnClickedId, "pstnClickedId_id_clicked")
    } else if (category == "employee") {
      this.empClickedId = (this.empClickedId == id) ? 0 : id
      console.log(this.empClickedId, "empClickedId_id_clicked")
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
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}

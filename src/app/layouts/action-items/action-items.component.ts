import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.scss']
})
export class ActionItemsComponent implements OnInit {
  @Input() searchFldFlag: boolean = false
  @Input() searchWithKeyFldFlag: boolean = false
  @Input() sortFldFlag: boolean = false
  @Input() filterFldFlag: boolean = false
  @Input() addFldFlag: boolean = false
  @Input() deleteFldFlag: boolean = false
  @Input() editFldFlag: boolean = false
  @Input() infoFldFlag: boolean = false
  @Input() placeHolder: {
    search: string, sort: string,
    info: string, add: string,
    edit: string, delete: string
  } = {
      search: "Search Here", sort: "click to sort",
      info: "information", add: "Add",
      edit: "Edit", delete: "Delete"
    }
  @Input() searchValue: { action: string; data: any; } = { action: "", data: "" }
  @Input() sortClicked: { action: string; data: any; } = { action: "", data: "" }
  @Input() CurdOptrnClicked: { action: string; data: any; } = { action: "", data: "" }
  @Output() sharedVarChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  change(newValue: any) {
    this.searchValue = { action: "search", data: newValue };
    this.sharedVarChange.emit(this.searchValue);
  }
  onSortClick(event: any) {
    this.sortClicked = (this.sortClicked.data == event) ? { action: "sort", data: false } : { action: "sort", data: true }
    this.sharedVarChange.emit(this.sortClicked);
  }
  onCurdOpreation(data: any) {
    this.CurdOptrnClicked = { action: "modal", data: data }
    this.sharedVarChange.emit(this.CurdOptrnClicked);
  }
  // addNewItem(value: string = "") {
  //   this.searchValue.emit("");
  // }
}

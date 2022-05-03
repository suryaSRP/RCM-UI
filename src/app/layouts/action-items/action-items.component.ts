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
  @Input() placeHolder: string = "search here"
  @Input() searchValue: any = ""
  @Output() sharedVarChange = new EventEmitter();
  // @Output() searchValue = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  change(newValue: any) {
    console.log('newvalue', newValue)
    this.searchValue = newValue;
    this.sharedVarChange.emit(newValue);
  }
  // addNewItem(value: string = "") {
  //   this.searchValue.emit("");
  // }
}

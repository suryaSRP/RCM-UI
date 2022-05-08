import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.scss']
})
export class DynamicFieldsComponent implements OnInit {

  @Input() fldDataArray: any
  public dynamicForm = new FormGroup({})
  public dynamicFlds!: Array<any>;
  constructor() { }
  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  ngOnInit(): void {
    console.log(this.fldDataArray, "fldDataArray_fldDataArray")
    this.dynamicFlds = this.fldDataArray
    this.dynamicFlds.forEach((formFlds: any) => {
      this.dynamicForm.addControl(formFlds.fld_nm, new FormControl(formFlds.value, Validators.required))
    })
  }
  onSubmit(){
    console.log(this.dynamicForm,"this.dynamicForm_this.dynamicForm_this.dynamicForm")
  }
}

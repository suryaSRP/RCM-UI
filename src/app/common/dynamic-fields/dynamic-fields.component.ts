import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.scss']
})
export class DynamicFieldsComponent implements OnInit {

  @Input() fldDataArray: any
  @Input() pageName: any
  @Input() buttonToShow: any
  public dynamicForm = new FormGroup({})
  public dynamicFlds!: Array<any>;
  constructor(
    private apiService: ApiServiceService
  ) { }
  events: string[] = [];
  @Output() dynamicFormResponse: EventEmitter<any> = new EventEmitter();
  @Output() closeFlag: EventEmitter<any> = new EventEmitter();

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  ngOnInit(): void {
    this.dynamicFlds = this.fldDataArray.flds
    this.dynamicFlds.forEach((formFlds: any) => {
      this.dynamicForm.addControl(formFlds.fld_nm, new FormControl(formFlds.value, Validators.required))
    })
    this.dynamicFlds.sort((a, b) => {
      return a.sq - b.sq;
    });
    console.log(this.dynamicFlds, "fldDataArray_fldDataArray")
  }
  onSubmit(): void {
    if (this.dynamicForm.valid) {
      let finalData = {...this.dynamicForm.value, ...this.fldDataArray.currentData}
      this.apiService.createOrgPstn(this.fldDataArray.page, finalData).subscribe(resp => {
        console.log(resp, "resp_on_create")
        this.dynamicFormResponse.emit(resp)
      })
    } else {
      return
    }
  }
  onclose() {
    this.closeFlag.emit(true)
  }
}

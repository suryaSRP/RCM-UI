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
  @Input() pageAction: any
  public dynamicForm = new FormGroup({})
  public dynamicFlds: Array<any> = [];
  constructor(
    private apiService: ApiServiceService
  ) { }
  events: string[] = [];
  public isEdit = false;
  public isEditIcon = false;
  @Output() dynamicFormResponse: EventEmitter<any> = new EventEmitter();
  @Output() closeFlag: EventEmitter<any> = new EventEmitter();

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  ngOnInit(): void {
    console.log(this.fldDataArray, "this.fldDataArray_this.fldDataArray")
    this.dynamicFlds = this.fldDataArray.flds
    this.dynamicFlds.forEach((formFlds: any) => {
      if (this.fldDataArray?.formValue?.length) {
        this.isEditIcon = true
        if (formFlds.type == "date") {
          this.dynamicForm.disable()
          this.dynamicForm.addControl(formFlds.fld_nm, new FormControl(new Date(this.fldDataArray.formValue[0][formFlds.fld_nm]), Validators.required))
        }
        this.dynamicForm.addControl(formFlds.fld_nm, new FormControl(this.fldDataArray.formValue[0][formFlds.fld_nm], Validators.required))
        console.log(this.dynamicForm,"this.dynamicFormthis.dynamicFormthis.dynamicForm")
        this.dynamicForm.disable()
      } else {
        this.dynamicForm.enable()
        this.isEditIcon = false
        console.log(this.fldDataArray.formValue, "Nooo_formValue_formValue")
        this.dynamicForm.addControl(formFlds.fld_nm, new FormControl(formFlds.value, Validators.required))
      }
    })
    this.dynamicFlds.sort((a, b) => {
      return a.sq - b.sq;
    });
    console.log(this.dynamicFlds, "fldDataArray_fldDataArray")
  }
  onSubmit(): void {
    if (this.dynamicForm.valid) {
      let finalData = { ...this.dynamicForm.value, ...this.fldDataArray.currentData }
      console.log(finalData,"finalDatafinalDatafinalDatafinalData")
      // this.apiService.createOrgPstn(this.fldDataArray.page, finalData).subscribe(resp => {
      //   console.log(resp, "resp_on_create")
      //   this.dynamicFormResponse.emit(resp)
      // })
    } else {
      return
    }
  }
  onUpdate(): void {
    if (this.dynamicForm.valid) {
      let finalData = { ...this.dynamicForm.value}
      console.log(finalData, "finalData_finalData_onUpdate")
      this.apiService.updateOrgPstn(this.fldDataArray.page, finalData,this.fldDataArray.currentData).subscribe(resp => {
        console.log(resp, "resp_on_update")
        this.dynamicFormResponse.emit(resp)
      })
    } else {
      return
    }
  }
  onDelete() {
    console.log("onDeleteee")
  }
  onclose() {
    this.closeFlag.emit(true)
  }
  checkValue(fldName: any, event: any) {
    console.log(fldName,"fldNamefldNamefldNamefldNamefldName",event)
    if (this.fldDataArray.validation.duplicateCheck && this.fldDataArray.validation.duplicateCheck[fldName]) {
      if (this.customIndexOf(this.fldDataArray.validation.duplicateCheck[fldName], event) > -1) {
        this.dynamicForm.controls[fldName].setErrors({ 'Duplicate': true })
      }
    }
  }
  customIndexOf(array: any[], searchElement: string, fromIndex?: any) {
    return array.map(function (value: string) {
      return value.toLowerCase();
    }).indexOf(searchElement.toLowerCase(), fromIndex);
  };
  editDataInfo() {
    console.log("clicked_edit_icon", this.fldDataArray)
    this.isEditIcon = false
    this.isEdit = true
    this.pageAction = 'Update'
    this.buttonToShow = ['update', 'cancel']
    this.dynamicForm.enable()
  }
  onCancel() {
    if (this.isEdit) {
      this.isEditIcon = true
      this.isEdit = false
      this.pageAction = 'Information'
      this.buttonToShow = ['close']
      this.dynamicForm.disable()
    } else {
      this.closeFlag.emit(true)
    }
  }
}

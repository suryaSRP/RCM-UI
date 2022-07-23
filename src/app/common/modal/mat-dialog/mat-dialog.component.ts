import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  action: any;
  currentData: any;
  flds: any;
  page: string;
  showas: string;
  title: string;
  value: any;
  validation:{}
}
@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {

  public dynamicForm = new FormGroup({})
  public selectedPageName: string = ""
  public showButton: any = []
  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    console.log(this.data, "data_data_data_data")
    this.showButton = this.data.action
  }

  onNoClick(flag: any): void {
    console.log(flag, "flag_on_click")
    if (flag)
      this.dialogRef.close();
  }
  getDynamicFormValue(value: any) {
    console.log(value, "getDynamicFormValue_getDynamicFormValue_getDynamicFormValue")
    if(value.status == "success"){
      this.dialogRef.close();
      window.location.reload()
    }
  }
  submitForm(): void {
    console.log(this.dynamicForm, "this.dynamicForm_this.dynamicForm_this.dynamicForm")
    if (this.dynamicForm.valid) {
      console.log("valid form")
    }
  }
}

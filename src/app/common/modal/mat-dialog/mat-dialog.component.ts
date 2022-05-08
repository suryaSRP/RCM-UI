import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  flds: any;
  action: string;
  page: string
}
@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {

  public dynamicForm = new FormGroup({})
  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    console.log(this.data, "data_data_data_data")
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submitForm(): void {
    console.log(this.dynamicForm,"this.dynamicForm_this.dynamicForm_this.dynamicForm")
  if(this.dynamicForm.valid){
    console.log("valid form")
  }
  }
}
// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor() {}


// }

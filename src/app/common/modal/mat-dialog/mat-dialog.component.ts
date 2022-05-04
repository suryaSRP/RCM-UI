import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  flds: {};
  action:string;
}
@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor() {}


// }

import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { QueryResult } from '../../../../model/api/result/QueryResult'
import { Observable } from 'rxjs'

export class ResultDetailsDialogComponentData {
  resultObservable$: Observable<QueryResult>
}

@Component({
  selector: 'num-result-details-dialog',
  templateUrl: './result-details-dialog.component.html',
  styleUrls: ['./result-details-dialog.component.scss'],
})
export class ResultDetailsDialogComponent implements OnInit {
  result: QueryResult

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResultDetailsDialogComponentData,
    public dialogRef: MatDialogRef<ResultDetailsDialogComponent>
  ) {
    this.data.resultObservable$.subscribe((resultTemp) => (this.result = resultTemp))
  }

  ngOnInit(): void {}

  doClose(): void {
    this.dialogRef.close()
  }
}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { Criterion } from '../../../../model/api/query/criterion'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { EditSingleCriterionComponent } from '../../edit/edit-single-criterion/edit-single-criterion.component'
import { Query } from '../../../../model/api/query/query'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-display-criterion',
  templateUrl: './display-criterion.component.html',
  styleUrls: ['./display-criterion.component.scss'],
})
export class DisplayCriterionComponent implements OnInit, OnDestroy {
  @Input()
  criterion: Criterion

  @Input()
  query: Query

  @Output()
  delete = new EventEmitter<Criterion>()

  @Output()
  storeQuery = new EventEmitter<Query>()

  private subscriptionDialog: Subscription

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptionDialog?.unsubscribe()
  }

  openDetailsPopUp(): void {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      criterion: this.criterion,
      query: this.query,
    }

    const dialogRef = this.dialog.open(EditSingleCriterionComponent, dialogConfig)
    this.subscriptionDialog = dialogRef
      .afterClosed()
      .subscribe((query) => this.storeQuery.emit(query))
  }

  doDelete(): void {
    this.delete.emit(this.criterion)
  }
}
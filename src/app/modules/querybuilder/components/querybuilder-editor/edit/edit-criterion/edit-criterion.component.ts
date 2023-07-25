import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { Criterion } from '../../../../model/api/query/criterion'
import { EditValueFilterComponent } from '../edit-value-filter/edit-value-filter.component'
import { ValueFilter } from '../../../../model/api/query/valueFilter'
import { FeatureService } from '../../../../../../service/feature.service'
import { Query } from '../../../../model/api/query/query'
import { CritGroupArranger, CritGroupPosition } from '../../../../controller/CritGroupArranger'
import { ObjectHelper } from '../../../../controller/ObjectHelper'

@Component({
  selector: 'num-edit-criterion',
  templateUrl: './edit-criterion.component.html',
  styleUrls: ['./edit-criterion.component.scss'],
})
export class EditCriterionComponent implements OnInit, AfterViewChecked {
  @Input()
  criterion: Criterion

  @Input()
  query: Query

  @Input()
  position: CritGroupPosition

  @Input()
  actionButtonKey: string

  @Output()
  save = new EventEmitter<{ groupId: number }>()

  @Output()
  addible = new EventEmitter<{ groupId: number; isaddible: boolean }>()

  @Output()
  discard = new EventEmitter<void>()

  @ViewChildren(EditValueFilterComponent) valueFilterComponents: QueryList<EditValueFilterComponent>

  actionDisabled = true

  selectedGroupId: number

  showGroups: boolean

  constructor(public featureService: FeatureService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.position) {
      this.selectedGroupId = this.position.groupId
    } else {
      this.selectedGroupId = this.query.groups[0].id
    }

    this.showGroups = this.query.groups.length > 1
  }

  ngAfterViewChecked(): void {
    this.actionDisabled = this.isActionDisabled()
    this.changeDetector.detectChanges()
  }

  doSave(): void {
    if (this.isActionDisabled()) {
      return
    }

    this.moveBetweenGroups()

    this.save.emit({ groupId: this.selectedGroupId })
  }

  doDiscard(): void {
    this.discard.emit()
  }

  isActionDisabled(): boolean {
    const addibleTemp =
      !this.valueFilterComponents ||
      !!this.valueFilterComponents.find((filterComponent) => filterComponent.isActionDisabled())
    this.addible.emit({ groupId: this.selectedGroupId, isaddible: !addibleTemp })
    return addibleTemp
  }

  getValueFilters(): ValueFilter[] {
    if (this.criterion.valueFilters) {
      if (!this.featureService.useFeatureMultipleValueDefinitions()) { // nur wenn "Multiple values per criteria" bei "Options" deaktiviert ist geht er ins If
        return this.criterion.valueFilters.length === 0 ? [] : [this.criterion.valueFilters[0]]
      }

      return this.criterion.valueFilters
    } else {
      return []
    }
  }
  getAttributeFilters(): ValueFilter[] {
    if (this.criterion.attributeFilters) {
      if (!this.featureService.useFeatureMultipleValueDefinitions()) {
        return this.criterion.attributeFilters.length === 0
          ? []
          : [this.criterion.attributeFilters[0]]
      }

      return this.criterion.attributeFilters
    } else {
      return []
    }
  }

  moveBetweenGroups(): void {
    if (!this.position || this.position.groupId === this.selectedGroupId) {
      return
    }

    if (!ObjectHelper.isNumber(this.position.row) || !ObjectHelper.isNumber(this.position.column)) {
      return
    }

    this.query.groups = CritGroupArranger.moveCriterionToEndOfGroup(
      this.query.groups,
      this.position,
      {
        groupId: this.selectedGroupId,
        critType: this.position.critType,
        column: -1,
        row: -1,
      }
    )
  }
}

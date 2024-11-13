import '../../../assets/styles/table-sticky.less'
import { SystemStatusProcessHtmlTable } from './system-status-process.html.table'
import './system-status-process.less'
export class SystemStatusProcessHtmlController {
  constructor() {
    this.init()
  }

  element = {
    table: new SystemStatusProcessHtmlTable(),
  }
  //   <colgroup>
  //   <col [ngStyle]="{ width: width }" *ngFor="let width of widths" />
  // </colgroup>
  init() {}
}

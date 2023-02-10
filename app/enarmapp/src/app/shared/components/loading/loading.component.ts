/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'enarm-loading-outlet',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() isLoading = false

  @Output() loadingEnd: EventEmitter<any> = new EventEmitter()

  ngOnInit (): void {
  }
}

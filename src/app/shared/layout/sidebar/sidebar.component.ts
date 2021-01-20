import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import * as AdminLte from 'admin-lte';
import $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
    $('[data-widget="treeview"]').each(() => {
      AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    });
  }
}

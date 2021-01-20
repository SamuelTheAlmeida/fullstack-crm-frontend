import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public sidebarMenuOpened = true;
  public showSideBar = true;

  @ViewChild('contentWrapper', { static: false }) contentWrapper;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

  }

  public mainSidebarHeight(height) {
    this.renderer.setStyle(
      this.contentWrapper.nativeElement,
      'min-height',
      height - 114 + 'px'
    );
  }

  public toggleMenuSidebar() {
    if (this.sidebarMenuOpened) {
      $('app-root').removeClass('sidebar-open');
      $('app-root').addClass('sidebar-collapse');
      this.sidebarMenuOpened = false;
    } else {
      $('app-root').addClass('sidebar-open');
      $('app-root').removeClass('sidebar-collapse');
      this.sidebarMenuOpened = true;
    }
  }
}

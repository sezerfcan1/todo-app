import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav2',
  templateUrl: './nav2.component.html',
  styleUrls: ['./nav2.component.css']
})
export class Nav2Component implements OnInit {

  constructor() { }

  pageController: number = 0; // 0 => login / 1 => register

  pageTransition(page: number): string {
    if (this.pageController == page) {
      return 'active';
    } else {
      return '';
    }
  }

  loginOrSingupEvent(page: number) {
    this.pageController = page;
  }

  ngOnInit(): void {
  }

}

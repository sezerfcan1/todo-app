import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

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

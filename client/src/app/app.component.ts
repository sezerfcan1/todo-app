import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';


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


}

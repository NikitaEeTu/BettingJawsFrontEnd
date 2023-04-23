import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main.page',
  templateUrl: './main.page.component.html',
  styleUrls: ['./main.page.component.css']
})
export class MainPageComponent implements OnInit {
  title = 'BettingJawsFrontEnd';

  constructor() { }

  public isUserHasLoggedOnce = false;

  ngOnInit(): void {
    this.isUserHasLoggedOnce = localStorage.length >= 1
  }

  public logOut(){
    localStorage.clear();
  }

}

import { Component, Input, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'courses-test-page-results',
  templateUrl: './courses.test.page.results.component.html',
  styleUrls: ["./courses.test.page.results.component.css"]
})

export class CoursesTestPageResultsComponent implements OnInit, OnChanges {
  @Input()
  public show:boolean | undefined;
  @Input()
  public isAddicted: boolean | undefined;
  public tittleText: string = ""

  public changeTittileText(addictionPoints: number){
    if(addictionPoints <= 3){
      this.tittleText = "We don't found that you have a gambling addiction. But still refer to our materials."
    }
    else{
      this.tittleText = "We found that you may have a gambling addiction. Please refer to our materials."
    }
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  ngOnInit(): void {
  }

}


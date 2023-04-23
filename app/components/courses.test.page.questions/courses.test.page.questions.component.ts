import { Component, INJECTOR, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'courses-test-page-questions',
  templateUrl: './courses.test.page.questions.component.html',
})
export class CoursesTestPageQuestionsComponent implements OnInit {
  @Input()
  question: string | undefined;
  @Input()
  show: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

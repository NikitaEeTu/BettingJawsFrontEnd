import { Component, Input, OnInit } from '@angular/core'
import { pxsuffix } from './pipes/pipe';

@Component({
  selector: 'test-page-progress-bar',
  templateUrl: './test.progressbar.components.html'
})


export class TestProgressbarComponent implements OnInit{

  @Input()
  public progressPoint: string | undefined;

  ngOnInit(): void {
    console.log();
  }

}

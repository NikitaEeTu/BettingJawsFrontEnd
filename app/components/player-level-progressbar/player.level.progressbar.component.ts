import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'player-level-progress-bar',
  templateUrl: './player.level.progressbar.component.html',
  styleUrls: ['./player.level.progressbar.component.css']
})
export class PlayerLevelProgressbarComponent implements OnInit {
  @Input()
  public playerXP: string = "0%";
  @Input()
  public playerXpNumber: number = 0;
  @Input()
  public curPlayerLevel: number = 0;
  @Input()
  public curPlayerGameLevel: GameLevel ={
    id: "",
    level_number: 0,
    xp_required: 0
  }

  public levelMaxXp: number = 140;
  constructor() { }

  ngOnInit(): void {
    console.log(this.playerXpNumber);
    //this.playerXpNumber = parseInt(this.playerXP.replace("%", "")) + 4;
    console.log(this.playerXpNumber);
  }

}

interface GameLevel{
  id: string,
  level_number: number,
  xp_required: number
}

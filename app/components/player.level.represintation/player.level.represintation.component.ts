import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-level-represintation',
  templateUrl: './player.level.represintation.component.html',
  styleUrls: ['./player.level.represintation.component.css']
})
export class PlayerLevelRepresintationComponent implements OnInit {
  @Input() curPlayerData: PlayerData = {
    first_name: "",
    last_name: "",
    game_level: 0,
    xp_number: 0
  };


  constructor() { }

  ngOnInit(): void {
  }

}


interface PlayerData{
  first_name: string,
  last_name: string,
  game_level: number,
  xp_number: number
}

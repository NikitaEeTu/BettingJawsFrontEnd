import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-level-profile',
  templateUrl: './user-level-profile.component.html',
  styleUrls: ['./user-level-profile.component.css']
})
export class UserLevelProfileComponent implements OnInit {

  @Input() curPlayerData:SpecialistData = {
    first_name: "Nikita",
    last_name: "Podkopaev",
    game_level: 0,
    xp_number: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

}

interface SpecialistData{
  first_name: string,
  last_name: string,
  game_level: number,
  xp_number: number
}

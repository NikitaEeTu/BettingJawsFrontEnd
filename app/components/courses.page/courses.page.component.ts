import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses.page',
  templateUrl: './courses.page.component.html',
  styleUrls: ['./courses.page.component.css']
})
export class CoursesPageComponent implements OnInit {
private baseUrl:string = `http://localhost:8080/api/bettingjaws/user`;
[x: string]: any;
public disabledCourses:boolean[] = []
public numberOfRows: string = "grid-rows-2"
public curPlayerInfo:PlayerData = {
  first_name: "",
  last_name: "",
  game_level: 0,
  xp_number: 0
};
public redirectionLinkText:RedirectionLink[] = [
{
  redirectionLinkText: "course/check-gambling-addiction",
  redirectionText: "Gambling addiction check",
  hiddenElem: "",
  playerLevel: 1
},
{
  redirectionLinkText: "course/calculate-risk",
  redirectionText: "Calculate your risks",
  hiddenElem: "",
  playerLevel: 1
},
{
  redirectionLinkText: "course/toss-a-coin",
  redirectionText: "Check your luck",
  hiddenElem: "",
  playerLevel: 2
},
{
  redirectionLinkText: "course/facts-wheel",
  redirectionText: "Responsible gambling facts",
  hiddenElem: "",
  playerLevel: 2
},
{
  redirectionLinkText: "/course/videos",
  redirectionText: "Watch gambling videos",
  hiddenElem: "hidden",
  playerLevel: 3
},
];

public redirectToALink(event: any){
  const linkElemId = event.target.id;
  const transformedIndex = parseInt(linkElemId.replace("course", "")) - 1;
  const selectedElemInfo = this.redirectionLinkText[transformedIndex];
  if(this.curPlayerInfo.game_level >= selectedElemInfo.playerLevel){
    window.open(selectedElemInfo.redirectionLinkText, "_self");
  }
}

public loadMoreEvents(){
  this.numberOfRows = "grid-rows-3";
  this.redirectionLinkText.forEach((elem, index) => {
    if(elem.hiddenElem === 'hidden' && index > 3){
      elem.hiddenElem = "";
    }
  })
}


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    const userKey = localStorage.getItem("userToken");
    const userEmail = localStorage.getItem("userEmail");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userKey}`
    });


    this.http.get<PlayerData>(this.baseUrl + `?email=${userEmail}`, {headers}).subscribe(
      data => {
        this.curPlayerInfo = data;
        this.disabledCourses = this.redirectionLinkText.map(elem => {
          if(this.curPlayerInfo.game_level >= elem.playerLevel){
            return false
          }
          else{
            return true
          }
        })
      } ,
      error => {
        console.error(error);
      }
    )
  }
}

interface RedirectionLink{
  redirectionLinkText: string,
  redirectionText: string,
  hiddenElem: string,
  playerLevel: number
}

interface PlayerData{
  first_name: string,
  last_name: string,
  game_level: number,
  xp_number: number
}

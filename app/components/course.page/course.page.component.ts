import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'course-page',
  templateUrl: './course.page.component.html',
  styleUrls: ['./course.page.component.css']
})
export class CoursePageComponent implements OnInit {

  private baseUrl:string = `http://localhost:8080/api/bettingjaws/user`;
  private baseUrlForLevel: string = "http://localhost:8080/api/bettingjaws/v1/level"
  public curPlayerGameLevel: GameLevel = {
    id: '',
    level_number: 0,
    xp_required: 0
  }
  public curPlayerLevel: number = 0;

  constructor(private http:HttpClient) { }

  private userKey = localStorage.getItem("userToken");
  private userEmail = localStorage.getItem("userEmail");
  public curNumberOfPlayerXPPoints = 0;
  public curNumberBarXpPoints = 0;
  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userKey}`
    });


    this.http.get<Player>(this.baseUrl + `?email=${this.userEmail}`, {headers}).subscribe(
      data => {
        this.curPlayer = data;
        this.curNumberOfPlayerXPPoints = this.curPlayer.xp_number;
        this.curNumberBarXpPoints = this.curPlayer.xp_progress_bar;
        this.curPlayerLevel = this.curPlayer.game_level;
        this.http.get<GameLevel>(this.baseUrlForLevel + "/number" + `?number=${this.curPlayer.game_level + 1}`, {headers}).subscribe(
          data => {
            this.curPlayerGameLevel = data
          } ,
          error => {
            console.error(error);
          }
        )
        console.log(this.curPlayer)
      } ,
      error => {
        console.error(error);
      }
    )

  }
    curPlayer:Player = {
    first_name: '',
    last_name: '',
    game_level: 0,
    xp_number: 0,
    xp_progress_bar: 0
  }

  public showResult: boolean = false;
  public showQuestions: boolean = true;
  public buttonTextObject = {
    testOnGoing:"NEXT QUESTION",
    lastQuestion: "SHOW RESULTS",
    testFinished: "BACK TO THE COURSE"
  };
  private courseUrl = "/courses";
  private backToCoursesBtnClicked = false;
  public curButtonTestText = this.buttonTextObject.testOnGoing;

  public arrQuestions = [
    "Do you feel an urge to gamble, even when you know it is not a good idea?",
    "Do you spend more time and money on gambling than you can afford?",
    "Do you find yourself lying to others about your gambling habits or the amount of money you are spending?",
    "Have you neglected work, school, family, or other responsibilities because of gambling?",
    "Do you find yourself constantly trying to win back lost money through more gambling?",
    "Do you feel anxious or irritable when you are not gambling?",
    "Have you had financial problems as a result of gambling?"
  ];



  public baseProgressPoint = 100 / this.arrQuestions.length;
  public curNumberOfProgressPoints = this.baseProgressPoint;
  public baseXpNumberForTheFirstTest = 20;
  public gamblingAddictionIndicatorMaxPointNumber = 3;
  public curAddictionPoints = 0;
  public counter: number = 0;
  public selectedAnswer:boolean = false;
  public hasAPossibleAddiction:boolean = false;

  onSubmit(event: any) {
    const isFirstRadioBtnChecked = event["srcElement"][0]["checked"]
    if(isFirstRadioBtnChecked){
      this.curAddictionPoints += 1;
      if(this.curAddictionPoints >= 3){
        this.hasAPossibleAddiction = true;
      }
    }
    }



  public nextQuestion() {
    if(this.counter === this.arrQuestions.length - 1){
      if(!this.backToCoursesBtnClicked){
      this.showResult = true;
      this.showQuestions = false;
      this.curButtonTestText = this.buttonTextObject.testFinished;
      this.backToCoursesBtnClicked = true;
      }
      else{
      window.location.href = this.courseUrl;
      }
    }
    else{

    this.counter += 1;
    this.curNumberOfProgressPoints += this.baseProgressPoint;
    this.curNumberOfPlayerXPPoints += this.baseXpNumberForTheFirstTest;
    this.curNumberBarXpPoints += 14;
    console.log(this.curNumberBarXpPoints)
    if(this.counter === this.arrQuestions.length - 1){
      this.curButtonTestText = this.buttonTextObject.lastQuestion;
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userKey}`
    });

    this.http.patch<Player>(this.baseUrl + "/update/xp-points" + `?email=${this.userEmail}&xp=${this.curNumberOfPlayerXPPoints}&xpBar=${this.curNumberBarXpPoints}&level=${this.curPlayer.game_level}`, {headers}).subscribe(
      data => {
        this.http.get<Player>(this.baseUrl + `?email=${this.userEmail}`, {headers}).subscribe(
          data => {
            this.curPlayer = data;
            this.curNumberOfPlayerXPPoints = this.curPlayer.xp_number;
            this.curNumberBarXpPoints = this.curPlayer.xp_progress_bar;

        })
      } ,
      error => {
        console.error(error);
      }
    )

    this.http.get<GameLevel>(this.baseUrlForLevel + "/number" + `?number=${this.curPlayer.game_level + 1}`, {headers}).subscribe(
      data => {
        this.curPlayerGameLevel = data
      } ,
      error => {
        console.error(error);
      }
    )
  }
  }

}

interface GameLevel{
  id: string,
  level_number: number,
  xp_required: number
}

interface Player{
  first_name: string,
  last_name: string,
  game_level: number,
  xp_number: number,
  xp_progress_bar: number
}

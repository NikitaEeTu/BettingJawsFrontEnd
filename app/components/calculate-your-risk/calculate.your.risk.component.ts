import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataset, ChartType, Color, LabelItem } from 'chart.js';

@Component({
  selector: 'app-calculate.your.risk',
  templateUrl: './calculate.your.risk.component.html',
  styleUrls: ['./calculate.your.risk.component.css']
})
export class CalculateYourRiskComponent implements OnInit, OnChanges {
  private baseUrl:string = `http://localhost:8080/api/bettingjaws/user`;
  private baseUrlForLevel: string = "http://localhost:8080/api/bettingjaws/v1/level"

  private userKey = localStorage.getItem("userToken");
  private userEmail = localStorage.getItem("userEmail");
  public curNumberOfPlayerXPPoints = 0;
  public curNumberBarXpPoints = 0;
  public baseXpNumber = 20;
  public curPlayerGameLevel: GameLevel = {
    id: "",
    level_number: 0,
    xp_required: 0
  }

  curPlayer:Player = {
    first_name: '',
    last_name: '',
    game_level: 0,
    xp_number: 0,
    xp_progress_bar: 0
  }

  constructor(private http:HttpClient) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Hello")
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userKey}`
    });

    this.http.get<Player>(this.baseUrl + `?email=${this.userEmail}`, {headers}).subscribe(
      data => {
        this.curPlayer = data;
        this.curNumberOfPlayerXPPoints = this.curPlayer.xp_number;
        this.curNumberBarXpPoints =  this.curPlayer.xp_progress_bar;
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
  public sumProcent = 50;
  public totalSum = 100 ;
  public curNumberOfProgressPoints = 50;
  private progressBar: number = 50;
  public enumStatusesObject = {
    SMALL_LOSE: {
      enumText:"You will lose a small amount",
      color: "text-green-400",
      circleParameterClass: 'small-lose-circle'
    },
    MEDIUM_LOSE: {
      enumText: "You will lose a medium amount",
      color: "text-yellow-300",
      circleParameterClass: 'medium-lose-circle'
    },
    BIG_LOSE: {
      enumText: "You will lose a big amount",
      color: "text-red-500",
      circleParameterClass: 'big-lose-circle'
    },
    DEFAULT_LOSE:  {
      enumText: "Click on the button to see your potential lose",
      color: "text-black",
      circleParameterClass: 'default-lose-circle'
    }
  }
  public statusObj = this.enumStatusesObject.DEFAULT_LOSE;

  public showRiskClicked = false;

  public sumToLose = 0;



  modelChangeFn(e: number) {
    this.sumProcent = e;
  }
  changeSum(e: number){
    this.totalSum = e;
  }

  showYourRisk(){
    if(this.sumToLose <= 0 ){
    this.curNumberOfProgressPoints += this.progressBar;
    }

    this.curNumberBarXpPoints += 16;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userKey}`
    });

    this.curNumberOfPlayerXPPoints += this.baseXpNumber;

    this.http.patch<Player>(this.baseUrl + "/update/xp-points" + `?email=${this.userEmail}&xp=${this.curNumberOfPlayerXPPoints}&xpBar=${this.curNumberBarXpPoints}&level=${this.curPlayer.game_level}`, {headers}).subscribe(
      data => {
        console.log(data)
      } ,
      error => {
        console.error(error);
      }
    )

    this.showRiskClicked = false;

    if(this.sumProcent <= 25){
      this.statusObj = this.enumStatusesObject.SMALL_LOSE;
    }
    else if (this.sumProcent <= 50){
      this.statusObj = this.enumStatusesObject.MEDIUM_LOSE;
    }
    else{
      this.statusObj = this.enumStatusesObject.BIG_LOSE;
    }
    this.sumToLose = this.sumProcent / 100 * this.totalSum;
    this.doughnutChartData[0].data[0] = this.totalSum - this.sumToLose;
    this.doughnutChartData[0].data[1] = this.sumToLose;

    setTimeout(() =>  this.showRiskClicked = true, 1)

    setTimeout(() => {
      this.statusObj = this.enumStatusesObject.DEFAULT_LOSE;
    }, 1500)
  }

  doughnutChartLabels: string[] = ['Your money', 'Your potential loss'];
  public doughnutChartData: any[] = [
    {
    data: [this.totalSum, this.sumToLose],
    label: 'Temp label'
    }
  ]
  doughnutChartType: ChartType = 'doughnut';
}


interface Player{
  first_name: string,
  last_name: string,
  game_level: number,
  xp_number: number,
  xp_progress_bar: number
}


interface GameLevel{
  id: string,
  level_number: number,
  xp_required: number
}

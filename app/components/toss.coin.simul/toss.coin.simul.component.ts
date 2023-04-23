import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toss.coin.simul',
  templateUrl: './toss.coin.simul.component.html',
  styleUrls: ['./toss.coin.simul.component.css']
})
export class TossCoinSimulComponent implements OnInit {

  private baseUrl:string = `http://localhost:8080/api/bettingjaws/user`;
  private baseUrlForLevel: string = "http://localhost:8080/api/bettingjaws/v1/level"
  public curPlayerGameLevel: GameLevel = {
    id: '',
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

  public curNumberOfPlayerXPPoints = 0;
  public curNumberBarXpPoints = 0;

  public tossValue:boolean = false;
  public addAClass:string = "";
  public userMoney:number = 200;
  public curUserStake:number = 20;
  public userResult:string = "";
  public clicked:boolean = false;
  public hiddenBtn:boolean = false;
  public attentionMsg:string = "";
  public restartAGameBtn = false;
  public randomNumber = 0;
  public curNumberOfProgressPoints = 0;
  public curPlayerLevel: number = 0;
  private stakeChanger = 5;
  private numberOfCoinToss = 0;
  private initialNumberOfMoney = this.userMoney;
  private initialStakeNumber = this.curUserStake;
  private cooficent = 2;
  constructor(private http:HttpClient) { }

  private userKey = localStorage.getItem("userToken");
  private userEmail = localStorage.getItem("userEmail");

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

  getRandomNumber(min: number, max: number){
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public startTheGame(){
    console.log(this.userResult)
    if(!(this.userResult === "")){
      this.tossACoin();
    }
    else{
      this.informAUser("You haven't specified ")
    }
  }

  private tossACoin(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userKey}`
    });

    this.curNumberOfProgressPoints += 10;

    this.curNumberOfPlayerXPPoints += 16;
    this.curNumberBarXpPoints += 10;

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
    this.addAClass = "";
    this.clicked = true;
    this.randomNumber = this.getRandomNumber(0, 2);
    let stringResult = "";
    this.hiddenBtn = true;
    console.log(this.randomNumber);
    if(this.randomNumber === 0){
      this.tossValue = false;
      setTimeout(() => this.addAClass = "heads-animation", 1);
      stringResult = "head";
    }
    else{
      this.tossValue = true;
      setTimeout(() => this.addAClass = "tails-animation", 1);
      stringResult = "tail";
    }

    console.log(this.addAClass);
    setTimeout(() =>  this.clicked = false, 1);
    setTimeout(() => {
      this.checkTheResult(this.userResult, stringResult);
      this.numberOfCoinToss += 1;
      this.multiplyTheStake(this.numberOfCoinToss);
      this.gameIsOver()
    }, 3000)
  }

  checkTheResult(userResult: string, actualResult: string){
    console.log(userResult, actualResult);
    if(userResult.toLocaleLowerCase() === actualResult.toLocaleLowerCase()){
      this.userMoney += this.curUserStake * this.cooficent;
    }
    else{
      this.userMoney -= this.curUserStake;
    }

  }

  increaseABet(){
    if(this.curUserStake < this.userMoney){
    this.curUserStake += this.stakeChanger;
    }
  }

  decreaseABet(){
    if(this.curUserStake > 0){
    this.curUserStake -= this.stakeChanger;
    }
  }

selectAResult(event: any){
    const elemId = event.srcElement.id;
    if(elemId === "inlineRadio1"){
      this.userResult = "tail";
    }
    else if(elemId === "inlineRadio2"){
      this.userResult = "head";
    }
    else{
      this.userResult = "";
    }
  }

 private multiplyTheStake(numberOfCoinToss: number){
  if(numberOfCoinToss % 2){
    const multipledCurUserStake = this.curUserStake *= 2;
    this.checkBalance(multipledCurUserStake);
  }
  else if(numberOfCoinToss % 3){
    const multipledCurUserStake = this.curUserStake * 3;
    this.checkBalance(multipledCurUserStake);
  }
  else{
    const multipledCurUserStake = this.curUserStake * 5;
    this.checkBalance(multipledCurUserStake);
  }
 }

 private checkBalance(multipledCurUserStake: number){
  if(multipledCurUserStake <= this.userMoney){
    this.curUserStake = multipledCurUserStake;
  }
  else{
    this.curUserStake = this.userMoney;
  }
 }

 private informAUser(message: string){
  this.attentionMsg = message;
  setTimeout(() => this.attentionMsg = "", 1000);
 }

 private gameIsOver(){
  if(this.userMoney === 0){
    this.attentionMsg = `You have lost your ${this.initialNumberOfMoney}€`;
    this.restartAGameBtn = true;
  }
 }

 public restartAGame(){
  this.userMoney = this.initialNumberOfMoney;
  this.curUserStake = this.initialStakeNumber;
  this.attentionMsg = "";
  this.restartAGameBtn = false;
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

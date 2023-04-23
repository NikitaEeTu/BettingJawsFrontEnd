import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facts-wheel',
  templateUrl: './facts.wheel.component.html',
  styleUrls: ['./facts.wheel.component.css']
})
export class FactsWheelComponent implements OnInit {

  private baseUrl:string = `http://localhost:8080/api/bettingjaws/user`;
  private baseUrlForLevel: string = "http://localhost:8080/api/bettingjaws/v1/level"

  public curNumberOfProgressPoints = 0;
  public curNumberOfPlayerXPPoints = 70;
  private baseXp = 100/12;
  public curNumberBarXpPoints = 0;

  private userKey = localStorage.getItem("userToken");
  private userEmail = localStorage.getItem("userEmail");

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


  public curPlayerLevel: number = 0;


  public numberArr:RolledDice[] = [
    {
      sumNumber: 2,
      color: "",
      factTitle: "If you choose to gamble, do so for entertainment purposes",
      factText: "If your gambling is no longer an enjoyable activity then ask yourself why you are still “playing.”"
    },
    {
      sumNumber: 3,
      color: "",
      factTitle: "Treat the money you lose as the cost of your entertainment",
      factText: "Treat any winnings as a bonus."
    },
    {
      sumNumber: 4,
      color: "",
      factTitle: "Set a euro limit and stick to it",
      factText: "Decide before you go not only what you can “afford” to lose, but how much you want to spend. Do not change your mind after losing."
    },
    {
      sumNumber: 5,
      color: "",
      factTitle: "Set a time limit and stick to it",
      factText: "Decide how much of your time you want to allow for gambling. Leave when you reach the time limit whether you are winning or losing."
    },
    {
      sumNumber: 6,
      color: "",
      factTitle: "Expect to lose",
      factText: "The odds are that you will lose."
    },
    {
      sumNumber: 7,
      color: "",
      factTitle: "Make it a private rule not to gamble on credit",
      factText: "Do not borrow money to gamble."
    },
    {
      sumNumber: 8,
      color: "",
      factTitle: "Create balance in your life",
      factText: "Gambling should not interfere with or substitute for friends, family, work or other worthwhile activities."
    },
    {
      sumNumber: 9,
      color: "",
      factTitle: "Avoid “chasing” lost money",
      factText: "Chances are the more you try to recoup your losses the larger your losses will be."
    },
    {
      sumNumber: 10,
      color: "",
      factTitle: "Don’t gamble as a way to cope with emotional or physical pain",
      factText: "Gambling for reasons other then entertainment can lead to problems."
    },
    {
      sumNumber: 11,
      color: "",
      factTitle: "Become educated about the warning signs of problem gambling",
      factText: "The more you know, the better choices you can make."
    },
    {
      sumNumber: 12,
      color: "",
      factTitle: "Gamble under stress",
      factText: "Don’t gamble when you’re upset or stressed"
    }
  ];

  public questionNumber: number = 0;
  public hide:boolean = false;
  private checkedDiceNumbers:number[] = [];
  private buttonTextStatuses = {
    start: "Roll the dice",
    end: "Restart"
  }
  public curBtnStatus:string = this.buttonTextStatuses.start;

  constructor(private http:HttpClient) { }

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

  public animation:string = '';
  public imgsArr: string[] = [
    '../../../assets/images/main-page/dice/diceYellow1.png',
    '../../../assets/images/main-page/dice/diceRed1.png'
  ]

  private getRandomNumber(min: number, max: number){
    return Math.floor(Math.random() * (max - min)) + min;
  }
  private restartGame = false;

  public gameStarts(){
    if(!this.restartGame){
      this.roll();
    }
    else{
      this.checkedDiceNumbers = []
      this.numberArr = this.numberArr.map(numberElem => {
        numberElem.color = "";
        return numberElem
    })
    this.curBtnStatus = this.buttonTextStatuses.start;
    this.restartGame = false;
    }
  }

  public roll(){
    const firstDiceNumber = this.getRandomNumber(1, 7);
    const secondDiceNumber = this.getRandomNumber(1, 7);
    const basePathForYellowDice = "../../../assets/images/main-page/dice/diceYellow";
    const basePathForRedDice = "../../../assets/images/main-page/dice/diceRed";
    const totalSum = firstDiceNumber + secondDiceNumber;
    this.animation = "shake";

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userKey}`
    });

    this.curNumberOfPlayerXPPoints += 40;
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

    setTimeout(() => {
      this.questionNumber = totalSum;
      this.animation = " ";
      this.imgsArr[0] = basePathForYellowDice + firstDiceNumber + ".png";
      this.imgsArr[1] = basePathForRedDice + secondDiceNumber + ".png";
      this.numberArr[totalSum - 2].color = 'bg-green-500';
      if(!this.checkedDiceNumbers.includes(totalSum)){
      this.checkedDiceNumbers.push(totalSum);
      this.curNumberOfProgressPoints += this.baseXp;
      };
      setTimeout(() =>  {
        this.hide = true;
        this.endOfActivity(this.checkedDiceNumbers);
      }, 400)
    }, 600);
  }

  public close(){
    this.hide = false;
  }

  private endOfActivity(arr: number[]){
    if(arr.length === this.numberArr.length){
      this.curBtnStatus = this.buttonTextStatuses.end;
      this.restartGame = true;
    }
  }


}

interface RolledDice{
  sumNumber: number,
  color: string,
  factTitle: string,
  factText: string
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

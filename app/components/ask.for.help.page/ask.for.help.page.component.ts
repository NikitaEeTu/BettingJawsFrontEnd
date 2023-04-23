import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ask.for.help.page',
  templateUrl: './ask.for.help.page.component.html',
  styleUrls: ['./ask.for.help.page.component.css']
})
export class AskForHelpPageComponent implements OnInit {

  constructor(private http:HttpClient) { }

  public specialistsPerPage: Specialist[] = []

  public country: string = "Estonia";


  public allCountryInfo: Country[] = [];

  public curSpecialist: Specialist = {
    firstName: '',
    lastName: '',
    county: '',
    phoneNumber: '',
    email: '',
    clinicName: '',
    website: ''
  };

  public paginationButtonIndexes: ButtonIndex = {
    firstBtn: 1,
    secondBtn: 2,
    thirdBtn: 3,
  }

  private nextBtnLimit:number = 0;
  private offsetNumber:number = 0;

  private baseURL:string = "http://localhost:8080/api/bettingjaws/";



  ngOnInit(): void {
    var country = require('country-list-js');
    this.allCountryInfo = Object.values(country.all);
    this.http.get<number>(this.baseURL + "number/specialist").subscribe(data=>{
    this.nextBtnLimit = data;
    })
  }

  public selectACountry(event:any){
    console.log(event)
    this.country = event.target.value;
  }

  public paginationButtonClick(){
    this.specialistsPerPage = [];
    const url = `http://localhost:8080/api/bettingjaws/specialist?limit=3&offset=${this.offsetNumber}&country=${this.country}`
    this.makeAnHttpGetSpecialistCall(url);

  }

  public makeAnHttpGetSpecialistCall(url: string){
    const userKey = localStorage.getItem("userToken");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userKey}`
    });
    const options = { withCredentials: true };
    this.http.get<Specialist[]>(url, {headers}).subscribe(data=>{
      data.forEach(elem => this.specialistsPerPage.push(elem))
      })

  }

  public setNextBtn(){
    this.offsetNumber += 3;
    this.paginationButtonClick();
    const buttonIndexes = this.paginationButtonIndexes;
    const lastBtnIndexPerPage = buttonIndexes.thirdBtn;
    if(this.nextBtnLimit >= lastBtnIndexPerPage + 1){
      this.paginationButtonIndexes.firstBtn = lastBtnIndexPerPage + 1;
      this.paginationButtonIndexes.secondBtn = lastBtnIndexPerPage + 2;
      this.paginationButtonIndexes.thirdBtn = lastBtnIndexPerPage + 3;
    }
  }

  public setPreviousBtn(){
    const buttonIndexes = this.paginationButtonIndexes;
    const lastBtnIndexPerPage = buttonIndexes.thirdBtn;
    console.log(buttonIndexes)
    if(!(buttonIndexes.firstBtn === 1)){
    buttonIndexes.firstBtn = lastBtnIndexPerPage - 5;
    buttonIndexes.secondBtn = lastBtnIndexPerPage - 4;
    buttonIndexes.thirdBtn = lastBtnIndexPerPage - 3;
    }
  }

  public changeSpecialist(event: any){
    const clickedSpecialistNumber = parseInt(event.target.innerText) - 1;
    this.curSpecialist = this.specialistsPerPage[clickedSpecialistNumber];
  }

}


interface Specialist {
    firstName: string,
    lastName: string
    county: string
    phoneNumber: string
    email: string
    clinicName: string,
    website: string
}

interface ButtonIndex{
  firstBtn: number,
  secondBtn: number,
  thirdBtn: number,
}

interface Country{
  capital: string,
  continent: string,
  currency: string,
  currency_decimal: string,
  currency_symbol: string,
  dialing_code: string,
  iso2: string,
  iso3: string,
  name: string
}

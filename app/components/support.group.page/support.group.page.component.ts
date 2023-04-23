import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support.group.page',
  templateUrl: './support.group.page.component.html',
  styleUrls: ['./support.group.page.component.css']
})
export class SupportGroupPageComponent implements OnInit {

  public supportGroupPerPage: SupportGroup[] = []

  public curSupportGroup: SupportGroup = {
    id: '',
    groupName: '',
    city: '',
    country: '',
    type: "",
    creatorFirstName: "",
    creatorLastName: "",
    website: ''
  }

  private nextBtnLimit:number = 0;
  private offsetNumber:number = 0;

  public paginationButtonIndexes: ButtonIndex = {
    firstBtn: 1,
    secondBtn: 2,
    thirdBtn: 3,
  }

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }



  public paginationButtonClick(){
    const url = `http://localhost:8080/api/bettingjaws/v1/supportgroups?limit=3&offset=${this.offsetNumber}&country=Estonia`
    this.makeAnHttpGetSupportGroupCall(url);
  }

  public makeAnHttpGetSupportGroupCall(url: string){
    const userKey = localStorage.getItem("userToken");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userKey}`
    });
    this.http.get<SupportGroup[]>(url, {headers}).subscribe(data=>{
      data.forEach(elem => this.supportGroupPerPage.push(elem))
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

  public changeSupportGroup(event: any){
    const clickedSpecialistNumber = parseInt(event.target.innerText) - 1;
    this.curSupportGroup = this.supportGroupPerPage[clickedSpecialistNumber];
    console.log(this.curSupportGroup);
  }

}

interface SupportGroup{
  id: string
  groupName: string,
  city: string,
  country: string,
  type: string,
  creatorFirstName: string,
  creatorLastName: string,
  website: string
}



interface ButtonIndex{
  firstBtn: number,
  secondBtn: number,
  thirdBtn: number,
}


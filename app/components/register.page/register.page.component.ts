import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.page.component.html',
  styleUrls: ['./register.page.component.css']
})
export class RegisterPageComponent implements OnInit {
  private baseUrl: string = "http://localhost:8080/api/v1/auth";
  public userObject:UserData = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phoneNumber": "",
    "country": "",
    "password": ""
  }

  changeFirstName(event:any){
    this.userObject.firstName = event.target.value;
    console.log(event.target.id)
  }

  changeLastName(event:any){
    this.userObject.lastName = event.target.value;
    console.log(event.target.id)
  }

  changePhoneNumber(event:any){
    this.userObject.phoneNumber = event.target.value;
    console.log(event.target.id)
  }

  changeCountry(event:any){
    this.userObject.country = event.target.value;
    console.log(event.target.id)
  }

  changeEmail(event:any){
    this.userObject.email = event.target.value;
    console.log(event.target.id)
  }

  changePassword(event:any){
    this.userObject.password = event.target.value;
    console.log(event.target.id)
  }

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }



  onSubmit(event: any) {
    this.http.post<string>(this.baseUrl + "/register", this.userObject).subscribe(
      (data) => localStorage.setItem('userToken', data)
    );

    console.log(this.userObject);
}

}

interface UserData{
  "firstName": string,
  "lastName": string,
  "email": string,
  "phoneNumber": string,
  "country": string,
  "password": string
}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.component.html',
  styleUrls: ['./login.page.component.css']
})
export class LoginPageComponent implements OnInit {
  private baseUrl: string = "http://localhost:8080/api/v1/auth";
  public userLoginObject:UserLoginData = {
    "email": "",
    "password": ""
  }
  private userToken:string = "";
  public errorMessage:string = ""

  public changeEmail(event: any){
    const value = event.target.value;
    this.userLoginObject.email = value;
  }

  public changePassword(event: any){
    const value = event.target.value;
    this.userLoginObject.password = value;
  }

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    this.http.post<UserToken>(this.baseUrl + "/authenticate", this.userLoginObject).subscribe({
      next: data => {
          localStorage.clear();
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userEmail', this.userLoginObject.email);
          window.open("/", "_self");
      },
      error: error => {
        this.displayAMessage("Your password or username is incorrect");
          console.error('There was an error!f', error);
      }
  })
}

private displayAMessage(message: string){
  this.errorMessage = message;
  setTimeout(() => {
    this.errorMessage = "";
  }, 2000);
}

}

interface UserLoginData{
  email: string,
  password: string
}

interface UserToken{
  token: string
}

import { Component, OnInit } from '@angular/core';
//import { LoginServiceService } from './../login-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})

export class SignUpComponent implements OnInit {

  
  username: string = "";
  password: string = "";
  //all the other stuff here

  constructor(private http: HttpClient) {
   
  }

  ngOnInit(): void {
  }

  hideP = true;
  hideCp = true;
  isLoading = false;
  usernameError: string = "";
  emailError: string ="";
  confEmailError: string = "";
  passwordError: string ="";
  confPasswordError: string ="";
  streetError: string = "";
  cityError: string = "";
  PLZError: string = "";

  signUpStatus: string = "";

  usernameInput: string = "";
  emailInput: string = "";
  confEmailInput: string = "";
  passwordInput: string = "";
  confPasswordInput: string = "";
  streetInput: string = "";
  cityInput: string = "";
  PLZInput: string = "";

  validator = true;

  signup(username: string, useremail: string, password: string, confPwd: string, street: string, city: string, PLZ: number, confEmail: string): void {
    this.resetStats();
    var plz: string = PLZ.toString();
    this.checkIfEmpty(username, useremail, confEmail, password, confPwd);

    if(this.validator){
      const signupData = {
        username: useremail,
        password: password
      }
      //const thisSignupData = new signupData;
      //thisSignupData.password = password;
      //thisSignupData.username = username;
  
        this.http.post<{token: any, username: any, success: boolean, msg: string}>('http://localhost:3000/signup', signupData, httpOptions).subscribe((responseData) => {
          console.log(responseData);
  
          if(responseData.success){
            localStorage.setItem('token', responseData.token); 
            this.clearInput();
            this.signUpStatus = "Signed up successfully";
          }
          alert(responseData.msg);
          this.signUpStatus = responseData.msg;
        });
    }
    else{ 
      console.log("Wrong parameters typed in");
    }
  }

  checkIfEmpty(username: string, useremail: string, confEmail: string, password: string, confPwd: string){
    if(username == ""){ 
      this.usernameError += "Please fill in a username";
      this.validator = false;
    } 
    if(useremail == ""){
      this.emailError += "Please fill in an email address";
      this.validator = false;
    }
    if(confEmail ==""){
      this.confEmailError += "Please confirm your email address";
    }
    else if(confEmail != "" && useremail != ""){
      this.compareEmail(useremail, confEmail);
    }
    if(password == ""){
      this.passwordError += "Please fill in a password";
      this.validator = false;
    }
    if(confPwd == ""){
      this.confPasswordError += "Please confirm your password";
      this.validator = false;
    }
    else if(confPwd != "" && password != ""){
      this.comparePw(password, confPwd);
    }
  }

  comparePw(password: string, confPassword: string) {
    if(password != confPassword){
      this.passwordError += "Password and confirmation must match";
      this.validator = false;
    }
    else{
      this.checkLengthPw(password);
    }
  }

  compareEmail(email: string, confEmail: string){
    if(email != confEmail){
      this.emailError += "Email and confirmation must match";
      this.validator = false;
    }
    else{
      this.checkIfEmailValid(email);
    }
  }

  checkLengthPw(password: string){
    if(password.length < 8){
      this.passwordError += "Password must be at least 8 characters long";
      this.validator = false;
    }
  }

  checkIfEmailValid(email: string){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
      this.emailError += "Please enter a valid email address";
      this.validator = false;
    }
  }

  clearInput(){
    this.usernameInput = "";
    this.emailInput = "";
    this.confEmailInput = "";
    this.passwordInput = "";
    this.confPasswordInput = "";
    this.cityInput = "";
    this.streetInput = "";
    this.PLZInput = "";
  }
  
  resetStats(): void {
    this.validator = true;
    this.usernameError = "";
    this.emailError = "";
    this.confEmailError = "";
    this.passwordError = "";
    this.confPasswordError = "";
    this.streetError = "";
    this.cityError = "";
    this.PLZError = "";
    this.signUpStatus = "";
  }

}

//const result = this.loginService.signup(username, password);
      /*
      if((await result).success){
          alert("You are logged in with token "+(await result).token);  
      }
      console.log((await result));
      this.signUpStatus = (await result).msg;*/
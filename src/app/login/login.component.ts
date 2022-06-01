import { Component, OnInit } from '@angular/core';
//import { LoginServiceService } from './../login-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  hide = true;
  isLoading = false;
  emailErrorBool = false;
  passwordErrorBool = false;
  emailError: string ="";
  passwordError: string ="";
  loginStatus: string = "";
  emailInput: string = "";
  passwordInput: string = "";


  login(username: string, password: string): void {
    this.resetStats();
    if(username == ""){
      this.emailErrorBool = true;
      this.emailError += "Please fill in an email address";
    }
    if(password == ""){
      this.passwordErrorBool = true;
      this.passwordError += "Please fill in a password";
    }
    
    if(!this.passwordErrorBool && !this.emailErrorBool){
      const loginData = {
        username: username,
        password: password
      }
      
      this.http.post<{token: any, username: string, msg: string}>('http://localhost:3000/login', loginData, httpOptions).subscribe((responseData) => {
        console.log(responseData);

        if(responseData !== null){
          localStorage.setItem('token', responseData.token);
          this.resetStats();
          this.loginStatus = "You are logged in with username "+ responseData.username;
          this.emailInput = "";
          this.passwordInput = "";
          alert("You are logged in with username "+ responseData.username);
        }
        else{
          this.loginStatus = "Wrong userdata, login failed";
          alert("Your username or password is incorrect"); 
        }
        
      });  
    }
    else{ 
       console.log("Wrong parameters");
    }
  }
  

  resetStats(): void {
    this.emailErrorBool = false;
    this.passwordErrorBool = false;
    this.emailError = "";
    this.passwordError = "";
    this.loginStatus = "";
  }
}

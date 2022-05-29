import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})


class Result {
  token: any;
  username: any;
  success: boolean = true;
  msg: string = "";
}

export class LoginServiceService {

  constructor(private http: HttpClient) { }

  username: string = "";
  password: string = "";

/*
  signup(username: string, password: string): Result {
    class signupData  {
      username: string = "";
      password: string = "";
    }
    const thisSignupData = new signupData;
    thisSignupData.password = password;
    thisSignupData.username = username;

      this.http.post<{token: any, username: any, success: boolean, msg: string}>('http://localhost:3000/signup', thisSignupData, httpOptions).subscribe((responseData) => {
        console.log(responseData);

        if(responseData.success){
          localStorage.setItem('token', responseData.token);
        }

      });
  
    return responseData; 
  }
  */

  login(username: string, password: string): Promise<boolean> {
    const loginData = {
      username: username,
      password: password
    };

    // Alternative zu promise: Direkt das Observable von post() zurückliefern
    const promise = new Promise<boolean>( resolve => {
      this.http.post<{token: any, username: string}>('http://localhost:3000/login', loginData, httpOptions).subscribe((responseData) => {
        console.log(responseData);

        if (responseData) {
          // Speichere etwas im localStorage des Browsers!
          // https://blog.briebug.com/blog/managing-local-storage-in-angular
          localStorage.setItem('token', responseData.token);
          resolve(true);
        }
        resolve(false);
      });
    });

    return promise;
  }
}

interface Response {
  message: string
}

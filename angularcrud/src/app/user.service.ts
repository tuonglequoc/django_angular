import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = "http://localhost:8000";
  
  // http options used for making API calls
  private httpOptions: any;
  
  // the actual JWT token
  public token: any;

  // the JWT refresh token
  public refresh: any;

  // the token expiration date
  public token_expires: any;

  // the username of the logged in user
  public username: any;

  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user:any, callback:Function) {
    this.http.post(this.baseurl + '/api/token/', JSON.stringify(user), this.httpOptions).subscribe(
      (data: any) => {
        this.updateData(data);
        callback();
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post(this.baseurl + '/api/token/refresh/', JSON.stringify({refresh: this.refresh}), this.httpOptions).subscribe(
      (data:any) => {
        this.updateData(data);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

  private updateData(token:any) {
    this.token = token['access'];
    this.refresh = token['refresh'] ? token['refresh'] : this.refresh;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
}

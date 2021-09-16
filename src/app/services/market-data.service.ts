import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {

  private baseUrl: string = 'https://integra1.solutions.webfg.ch/restweb/';
  private token!: Token;
  private credentials = {
    clientID: 'webfg-test',
    clientPass: 'WW58YJj89ltR43Cr',
    username: 'test001',
    userPass: 'ryby3NTyKduAMcvZ'
  }

  constructor(private http: HttpClient) { }

  getAccessToken()  {
    const url = `${this.baseUrl}oauth/token?grant_type=password&username=${this.credentials.username}&password=${this.credentials.userPass}&scope=uaa.user`;
    const headers = new HttpHeaders({
      Authorization:
        `Basic ${btoa(`${this.credentials.clientID}:${this.credentials.clientPass}`)}`
    });
    return this.http.post<any>(url, {}, { headers });
  }

  getMarketData() {
    const url = `${this.baseUrl}quotes/2970161-1058-814?fields=LVAL_NORM,CLOSE_ADJ_NORM,NC2_PR_NORM,NC2_NORM,VOL,TUR,PY_CLOSE,YTD_PR_NORM`;

    const headers = new HttpHeaders({
      Authorization:
        `Bearer ${this.token.access_token}`
    });

    return this.http.get(url, { headers });
  }

  refreshToken() {
    const url = `${this.baseUrl}oauth/token?grant_type=refresh_token&refresh_token=${this.token.refresh_token}`;
    const headers = new HttpHeaders({
      Authorization:
        `Basic ${btoa(`${this.credentials.clientID}:${this.credentials.clientPass}`)}`
    });
    this.http.post<any>(url, {}, {headers}).subscribe((data: Token) => this.token = data);
  }

  setToken(token: Token) {
    this.token = token;
  }

}

export interface Token {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

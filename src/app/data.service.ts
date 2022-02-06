import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Gif } from './gifs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  gifs = new BehaviorSubject<any>([]);

  // Used for login and users
  public username!: string;
  public password!: string;

  private apiServerUrl = environment.localApiBaseUrl;

  constructor(private http: HttpClient) {

  }

  displayTrendingGif(){
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${environment.apiKey}&limit=16`)
    .subscribe((response: any) => {
        this.gifs.next(response.data);
    });
  }

  findGifs(gifName: string){
    return this.http.get(`https://api.giphy.com/v1/gifs/search?q=${gifName}&api_key=${environment.apiKey}&limit=4`)
    .subscribe((response: any) => {
      this.gifs.next(response.data);
  });
  }

  getTheGifs (){
    return this.gifs.asObservable();
  }

  public getKeywords(serachedText: string){
    return this.http.get(`${this.apiServerUrl}/keyword/${serachedText}`, {responseType: 'text'});
  }



  // Login code but not used
  login(username: string, password: string): Observable<any>{
    return this.http.get(`${this.apiServerUrl}/login/${username}/${password}`, {responseType: 'text'});
  }

  logMeIn(username: string, password: string){
      return this.http.get(`${this.apiServerUrl}/login`,
      {headers: {authorization: this.createBasicAuthentication(username, password)}}).pipe(map((res)=>{
        this.username = username;
        this.password = password;
        // this.registerSuccessfulLogin(username, password);
      }))
  }

  createBasicAuthentication(username: string, password: string){
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  // registerSuccessfulLogin(username, password){

  // }


}

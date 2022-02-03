import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  gifs = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  displayTrendingGif(){
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${environment.apiKey}&limit=16`)
    .subscribe((response: any) => {
        this.gifs.next(response.data);
    });
  }

  findGifs(gifName: string){
    return this.http.get(`https://api.giphy.com/v1/gifs/search?q=${gifName}&api_key=${environment.apiKey}&limit=16`)
    .subscribe((response: any) => {
      this.gifs.next(response.data);
  });
  }

  getTheGifs (){
    return this.gifs.asObservable();

  }



}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  gifs = new BehaviorSubject<any>([]);


  private apiServerUrl = environment.localApiBaseUrl;

  constructor(private http: HttpClient) {

  }

  /**
   *
   * @returns trending gifs from GIPHY Api
   */
  displayTrendingGif(){
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${environment.apiKey}&limit=16`)
    .subscribe((response: any) => {
        this.gifs.next(response.data);
    });
  }

  /**
   *
   * @param gifName
   * @returns the gifs by search in GIPHY Api
   */
  findGifs(gifName: string){
    return this.http.get(`https://api.giphy.com/v1/gifs/search?q=${gifName}&api_key=${environment.apiKey}&limit=4`)
    .subscribe((response: any) => {
      this.gifs.next(response.data);
  });
  }

  getTheGifs (){
    return this.gifs.asObservable();
  }

  /**
   *
   * @param serachedText
   * @returns the keywords extracted by IBM NLU Api
   */
  public getKeywords(serachedText: string){
    return this.http.get(`${this.apiServerUrl}/keyword/${serachedText}`, {responseType: 'text'});
  }






}

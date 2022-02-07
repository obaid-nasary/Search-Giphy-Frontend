import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ibm-giphy';

  giphs: any;

  generateKeywords!: string;

  gifs: any[] = [];

  subscription!: Subscription;

  constructor(private dataService: DataService) {

  }
  ngOnInit(): void {

    this.dataService.displayTrendingGif();
    this.subscription = this.dataService.getTheGifs()
    .subscribe((response: any) => {
      this.gifs = response;
      console.log(this.gifs);
    });

  }

  /**
   * Sends the text to backend if longer than 48 chars and then searches by
   * the generated keywords
   * else searches directly in GIPHY api
   * @param serachedText
   */

  search(serachedText: string){
    if(serachedText === ''){
      alert("Text required to search");
    }else{
      if(serachedText.length > 48){
        this.dataService.getKeywords(serachedText).subscribe(
          (response: string) => {
            this.generateKeywords = response;
              this.dataService.findGifs(response);
                console.log("Searched Text: " + response);
                console.log(response.length);
                console.log("I am long text");
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }else{
        this.dataService.findGifs(serachedText);
          console.log("Searched Text: " + serachedText);
          console.log("I am short text");

      }
    }
  }



  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}


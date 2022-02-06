import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
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

  generateKeywords!: string;
  validate!: string;

  gifs: any[] = [];

  subscription!: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.displayTrendingGif();
    this.subscription = this.dataService.getTheGifs()
    .subscribe((response: any) => {
      this.gifs = response;
      console.log(this.gifs);
    });
  }

  // searchME(searchTerm: string) {
  //   this.getKeywords(searchTerm);
  //   console.log("I am ghere"+this.getKeywords(searchTerm));
  //   if(searchTerm !== ''){
  //     this.dataService.findGifs(this.getKeywords(searchTerm));
  //     console.log(searchTerm.length);
  //   }
  // }

  search(serachedText: string){

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


  // public getKeywords(serachedText: string): any{
  //   this.dataService.getKeywords(serachedText).subscribe(
  //     (response: string) => {
  //       this.generateKeywords = response;
  //       console.log(response);
  //       return response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  //     return this.generateKeywords;
  // }

  public login(): void{
    this.dataService.login("waheedmajroh", "whaheed12").subscribe(
      (response: string) => {
        this.validate = response;
        console.log(response);
      },
      (error: HttpErrorResponse) =>  {
          alert(error.message);
      }
    );
  }


  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}


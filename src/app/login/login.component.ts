import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;


  constructor(private dataService: DataService ) { }

  ngOnInit(): void {
  }

  handleLogin() {
    // console.log("This was clicked");

    // this.dataService.login(this.username, this.password).subscribe(
    //   (response: string) => {
    //     if(response === "true"){
    //       this.successMessage = 'Login successful'
    //       console.log('succeeded')
    //     }else{
    //       console.log("Failed badly");
    //     }
    //   },
    //   () =>  {
    //       this.errorMessage;
    //       console.log("failed badly")
    //   }
    // );
    this.dataService.logMeIn(this.username, this.password).subscribe((result) => {
        this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful';
      // redirect to main page
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }

}

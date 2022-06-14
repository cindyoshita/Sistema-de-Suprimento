import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit{

  public user : User;

  constructor(private loginService: LoginService,private router: Router,private httpClient: HttpClient,) {
  	this.user = new User();
  }



  validateLogin() {
  	if(this.user.username && this.user.password) {
  		this.loginService.validateLogin(this.user).subscribe(result => {
        if(result['mensagem'] === 'Logado') {
          this.router.navigate(['/home']);
        } else {
          alert('Wrong username and/or password');
        }

      },
      // error => {
      //   console.log('error is ', error);
      // }
      );
  	} else {
  		alert('enter user name and password');
  	}
  }


  ngOnInit(): void {

  }

}

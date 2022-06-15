import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {
  isUserLoggedIn: () => boolean;


  constructor(public authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
       this.isUserLoggedIn = this.authService.isUserLoggedIn;
      }
    })
  }





  logout() {
    this.authService.logoutUser();
    this.router.navigate(['home']);
    }
}

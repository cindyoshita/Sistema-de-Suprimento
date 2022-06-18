import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {
  public estaLogado: boolean = false;


  constructor(public authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (this.authService.isUserLoggedIn() == true ){
       this.estaLogado = true
      }else(this.estaLogado = false)
    })
  }





  logout() {
    this.authService.logoutUser();
    alert('Saiu com Sucesso!')
    this.router.navigate(['login']);
    this.estaLogado = false
    }
}

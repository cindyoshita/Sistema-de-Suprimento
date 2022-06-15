import { Component, Injectable ,inject} from '@angular/core';
import { Usuario } from './usuarios/usuario.model';
import { Suprimento } from './suprimentos/suprimento.model';
import { Router } from '@angular/router';
import { AuthService } from '../app/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'projeto-semestral';
  usuarios: Usuario[] = [];
  public ttipo: number

  onUsuarioAdicionado(usuarios) {
    this.usuarios = [...this.usuarios,usuarios]
    }
  suprimentos: Suprimento[]=[];
  onSuprimentoAdicionado(suprimentos) {
    this.suprimentos = [...this.suprimentos,suprimentos]
    };


constructor (public authService:AuthService,
  private router:Router) {
}


logout() {
this.authService.logoutUser();
this.router.navigate(['home']);
}
}

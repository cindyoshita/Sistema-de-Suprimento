import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SuprimentoInserirComponent } from './suprimentos/suprimentos-inserir/suprimento-inserir.component';
import { UsuarioInserirComponent } from './usuarios/usuario-inserir/usuario-inserir.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'suprimento', component: SuprimentoInserirComponent },
  { path: 'usuario', component: UsuarioInserirComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

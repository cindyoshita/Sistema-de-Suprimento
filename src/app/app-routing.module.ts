import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { SuprimentoInserirComponent } from './suprimentos/suprimentos-inserir/suprimento-inserir.component';
import { UsuarioInserirComponent } from './usuarios/usuario-inserir/usuario-inserir.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { SuprimentoListaComponent } from './suprimentos/suprimentos-lista/suprimento-lista.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'suprimento', component: SuprimentoInserirComponent, canActivate : [AuthGuardService] },
  { path: 'usuario', component: UsuarioInserirComponent},
  { path: 'lista', component: SuprimentoListaComponent,canActivate : [AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

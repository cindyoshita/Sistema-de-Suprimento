import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioInserirComponent } from './usuarios/usuario-inserir/usuario-inserir.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { UsuarioListaComponent } from './usuarios/usuario-lista/usuario-lista.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsuarioService } from './usuarios/usuario.service';
import { SuprimentoInserirComponent } from './suprimentos/suprimentos-inserir/suprimento-inserir.component';
import { SuprimentoService } from './suprimentos/suprimento.service';
import { SuprimentoListaComponent } from './suprimentos/suprimentos-lista/suprimento-lista.component';



@NgModule({
  declarations: [
    AppComponent,UsuarioInserirComponent,CabecalhoComponent,UsuarioListaComponent,SuprimentoInserirComponent,SuprimentoListaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,


  ],
  providers: [UsuarioService,SuprimentoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn:"root"})
export class UsuarioService {
 private usuarios: Usuario[] = [];
 private listaUsuariosAtualizada = new Subject<Usuario[]>();

 constructor (private httpClient: HttpClient){
}


 getUsuarios(): Usuario[] {
 return [...this.usuarios];
 }

  getListaDeUsuariosAtualizadaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
    }

  verificarLogin(userName: string, password: string){
    this.httpClient.post<{mensagem: string}> ('http://localhost:4000/login',{userName, password})
  }

  addUsuario(userName: string, password: string){
    const usuarios: Usuario = {
      userName: userName,
      password: password,
      };
    this.httpClient.post<{mensagem: string}> ('http://localhost:4000/usuario',usuarios).subscribe(
      (dados) => {
        console.log(dados.mensagem);
        this.usuarios.push(usuarios);
        this.listaUsuariosAtualizada.next([...this.usuarios])
      }
    )
    this.usuarios.push(usuarios);
    }

}


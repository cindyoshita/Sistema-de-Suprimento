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
adicionarUsuario(usuario: string, senha: string) {
  const usuarios: Usuario = {
  usuario: usuario,
  senha: senha,
  };
  this.httpClient.post<{mensagem: string}> ('http://localhost:3000/api/clientes',usuarios).subscribe(
 (dados) => {
 console.log(dados.mensagem);
 this.usuarios.push(usuarios);
 this.listaUsuariosAtualizada.next([...this.usuarios]);
 }
 )

  this.usuarios.push(usuarios);
  this.listaUsuariosAtualizada.next([...this.usuarios])
  }

  getListaDeUsuariosAtualizadaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
    }
}

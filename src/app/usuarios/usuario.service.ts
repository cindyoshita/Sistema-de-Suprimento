import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn:"root"})
export class UsuarioService {
  hide=true;
 private usuarios: Usuario[] = [];
 private listaUsuariosAtualizada = new Subject<Usuario[]>();

 constructor (private httpClient: HttpClient,private router: Router){
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

        if(dados['mensagem'] ==="Usuario inserido"){
          alert('Usuário inserido, faça seu login!')
          this.router.navigate(['/login']);
        }else {alert('Esse usuário já existe, crie um novo!')}
        this.usuarios.push(usuarios);
      }
    )
    this.usuarios.push(usuarios);
    }

}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../usuarios/usuario.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class LoginService {

	private usuarios: Usuario[] = [];
 private listaUsuariosAtualizada = new Subject<Usuario[]>();

 constructor (private httpClient: HttpClient,private router: Router	){
}


 getUsuarios(): Usuario[] {
 return [...this.usuarios];
 }

  getListaDeUsuariosAtualizadaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
    }

  verificarLogin(userName: string, password: string){
	const usuarios: Usuario = {
		userName: userName,
		password: password,
		};
    this.httpClient.post<{mensagem: string}> ('http://localhost:4000/login',usuarios).subscribe(
		(dados) => {
		  console.log(dados.mensagem);
		  this.usuarios.push(usuarios);
		  this.listaUsuariosAtualizada.next([...this.usuarios])

      if(dados['mensagem'] ==="Logado"){
        this.router.navigate(['/suprimento']);
      }else {alert('Usuário e/ou senha incorretos')}
      this.usuarios.push(usuarios);
		}
	  )

	  }
  }


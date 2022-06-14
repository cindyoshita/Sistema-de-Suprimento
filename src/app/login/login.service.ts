import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';


@Injectable()
export class LoginService {

	private usuarios: User[] = [];
 private listaUsuariosAtualizada = new Subject<User[]>();

 constructor (private httpClient: HttpClient){
}


 getUsuarios(): User[] {
 return [...this.usuarios];
 }

  getListaDeUsuariosAtualizadaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
    }

  verificarLogin(userName: string, password: string){
	const usuarios: User = {
		userName: userName,
		password: password,
		};
    this.httpClient.post<{mensagem: string}> ('http://localhost:4000/login',usuarios).subscribe(
		(dados) => {
		  console.log(dados.mensagem);
		  this.usuarios.push(usuarios);
		  this.listaUsuariosAtualizada.next([...this.usuarios])
		}
	  )
	  this.usuarios.push(usuarios);
	  }
  }




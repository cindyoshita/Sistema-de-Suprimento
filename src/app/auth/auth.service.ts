import { Injectable } from '@angular/core';
import { Observable,of,map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../usuarios/usuario.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private usuarios: Usuario[] = [];
 private listaUsuariosAtualizada = new Subject<Usuario[]>();

    private isloggedIn: boolean;
    private userName:string;


    constructor(private httpClient: HttpClient,private router: Router	) {
        this.isloggedIn=false;
    }

    Login(userName: string, password: string){
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
            this.isloggedIn=true
            this.router.navigate(['/home']);
            this.usuarios.push(usuarios)
            return of(this.isloggedIn);
          }else {alert('Usuário e/ou senha incoretos')
          this.usuarios.push(usuarios)
        return this.isloggedIn=false}
        }
        )

    }

    isUserLoggedIn(): boolean {
        return this.isloggedIn;
    }

    isAdminUser():boolean {
        if (this.userName=='Admin') {
            return true;
        }
        return false;
    }

    logoutUser(): void{
        this.isloggedIn = false;
    }

}

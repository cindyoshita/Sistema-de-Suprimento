import { LoginService } from './login.service';
import { Component,EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent{
  constructor(public loginService: LoginService) {}

  onLogarUsuario(form:NgForm) {
    console.log('inserindo usuário...');
  
    if (form.invalid){
      return;
    }
    this.loginService.verificarLogin(
      form.value.userName,
      form.value.password,
      );
      form.resetForm();
  
    }

  }


import { LoginService } from './login.service';
import { Component,EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent{
  constructor(public loginService: LoginService,private authService: AuthService, ) {}

  onLogarUsuario(form:NgForm) {
    console.log('inserindo usuário...');

    if (form.invalid){
      return;
    }
    this.authService.Login(
      form.value.userName,
      form.value.password,
      );
      form.resetForm();

    }

  }


import { Component,EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../usuario.service';

@Component({
selector: 'app-usuario-inserir',
templateUrl: './usuario-inserir.component.html',
styleUrls: ['./usuario-inserir.component.css'],

})
export class UsuarioInserirComponent {
  hide = true;
  constructor(public usuarioService: UsuarioService) {}

onAdicionarUsuario(form:NgForm) {
  console.log('inserindo usuário...');

  if (form.invalid){
    return;
  }
  this.usuarioService.addUsuario(
    form.value.userName,
    form.value.password,
    );
    form.resetForm();

  }
}

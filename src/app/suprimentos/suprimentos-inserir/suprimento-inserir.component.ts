import { Component,EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { SuprimentoService } from '../suprimento.service';

@Component({
selector: 'app-suprimento-inserir',
templateUrl: './suprimento-inserir.component.html',
styleUrls: ['./suprimento-inserir.component.css'],

})
export class SuprimentoInserirComponent {
  constructor(public suprimentoService: SuprimentoService) {}

onAdicionarSuprimento(form:NgForm) {
  console.log('Inserindo Suprimento...');

  if (form.invalid){
    return;
  }
  this.suprimentoService.adicionarSuprimento(
    form.value.suprimento,
    );
    form.resetForm();

  }
}

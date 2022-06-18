import { Component,EventEmitter, OnInit, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { SuprimentoService } from '../suprimento.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Suprimento } from '../suprimento.model';
import {MatSelectModule} from '@angular/material/select';


@Component({
selector: 'app-suprimento-inserir',
templateUrl: './suprimento-inserir.component.html',
styleUrls: ['./suprimento-inserir.component.css'],

})
export class SuprimentoInserirComponent implements OnInit {
  private modo: string = "criar";
  private idSuprimento: string;
  public suprimento: Suprimento;

ngOnInit(): void {
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has("idSuprimento")){
      this.modo = "editar";
      this.idSuprimento = paramMap.get("idSuprimento");
      this.suprimentoService.getSuprimento(this.idSuprimento).subscribe( dadosSup => {
        this.suprimento = {
        id: dadosSup._id,
        nameSupply: dadosSup.nameSupply,
        typeSupply: dadosSup.typeSupply,
        qttSupply: dadosSup.qttSupply
        };
        });

    }
    else{
    this.modo = "criar";
    this.idSuprimento = null;
    }

    });
}






  constructor(public suprimentoService: SuprimentoService,public route: ActivatedRoute) { }

  onSalvarSuprimento(form:NgForm) {
  console.log('Inserindo Suprimento...');

  if (form.invalid){
    return;
  }
  if(this.modo === "criar"){
  this.suprimentoService.addSuprimentos(
    form.value.nameSupply,
    form.value.qttSupply,
    form.value.typeSupply,
    );

  }
  else{this.suprimentoService.atualizarSuprimento(
    this.idSuprimento,
    form.value.nameSupply,
    form.value.qttSupply,
    form.value.typeSupply,)}
    form.resetForm();}
}

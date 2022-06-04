import { Injectable } from '@angular/core';
import { Suprimento } from './suprimento.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn:"root"})
export class SuprimentoService {
 private suprimento:Suprimento[] = [];
 private listaSuprimentosAtualizada = new Subject<Suprimento[]>();

 constructor (private httpClient: HttpClient){
}


getSuprimentos(): Suprimento[] {
 return [...this.suprimento];
 }
adicionarSuprimento(tipo: string) {
  const suprimentos: Suprimento = {
  tipo: tipo,
  
  };
  this.httpClient.put<{mensagem: string}> ('localhost:4000/suprimentos',suprimentos).subscribe(
 (dados) => {
 console.log(dados.mensagem);
 this.suprimento.push(suprimentos);
 this.listaSuprimentosAtualizada.next([...this.suprimento]);
 }
 )

  this.suprimento.push(suprimentos);
  this.listaSuprimentosAtualizada.next([...this.suprimento])
  }

  getListaDeSuprimentosAtualizadaObservable() {
    return this.listaSuprimentosAtualizada.asObservable();
    }

  addSuprimentos(nameSupply: string, qttSupply: number){
    this.httpClient.post<{mensagem: string}> ('localhost:4000/suprimentos', {nameSupply, qttSupply})
  }

  getSuprimentosNovo(){
    this.httpClient.get<{mensagem: string}> ('localhost:4000/suprimentos')
  }
}

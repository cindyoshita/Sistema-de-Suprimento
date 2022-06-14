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

  getListaDeSuprimentosAtualizadaObservable() {
    return this.listaSuprimentosAtualizada.asObservable();
    }

  addSuprimentos(nameSupply: string, qttSupply: number, typeSupply: string){
    const suprimentos : Suprimento = {
      nameSupply: nameSupply,
      qttSupply: qttSupply,
      typeSupply: typeSupply,
      };
    this.httpClient.post<{mensagem: string}> ('http://localhost:4000/suprimentos', suprimentos).subscribe(
      (dados) => {
        console.log(dados.mensagem);
        this.suprimento.push(suprimentos);
        this.listaSuprimentosAtualizada.next([...this.suprimento])
      }
    )
    this.suprimento.push(suprimentos);
  }

  getSuprimentosNovo(){
    this.httpClient.get<{mensagem: string}> ('http://localhost:4000/suprimentos')
  }
}

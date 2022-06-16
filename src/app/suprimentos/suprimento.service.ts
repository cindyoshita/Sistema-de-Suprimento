import { Injectable } from '@angular/core';
import { Suprimento } from './suprimento.model';
import { Observable, of, Subject,map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn:"root"})
export class SuprimentoService {
 private suprimentos:Suprimento[] = [];
 private listaSuprimentosAtualizada = new Subject<Suprimento[]>();

 constructor (private httpClient: HttpClient){
}


getSuprimentos(): Suprimento[] {
  return [...this.suprimentos];
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
        this.suprimentos.push(suprimentos);
        this.listaSuprimentosAtualizada.next([...this.suprimentos])
        alert('Suprimento inserido com sucesso!')
      }
    )
    this.suprimentos.push(suprimentos);
  }

  getSuprimentosNovo(){
    this.httpClient.get<{mensagem: string}> ('http://localhost:4000/suprimentos')
  }




  removerSuprimento (id: string): void{
    this.httpClient.delete(`http://localhost:4000/suprimentos/${id}`).subscribe(() => {
    console.log (`Suprimento de id: ${id} removido`);
    });
    }



    getSuprimentos1(): void {
      this.httpClient.get<{mensagem: string,
        suprimentos: any}>('http://localhost:4000/suprimentos')
        .pipe(map((dados) => {
          return dados.suprimentos.map((suprimento => {
            return {
              id: suprimento._id,
              nome: suprimento.nome,
              fone: suprimento.fone,
              email: suprimento.email
            }
          }))
        }))
        .subscribe(
          (dados) => {
            this.suprimentos = dados.suprimentos;
            this.listaSuprimentosAtualizada.next([...this.suprimentos]);
          }
        )
    }
}

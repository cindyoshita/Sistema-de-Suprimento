import { Injectable } from '@angular/core';
import { Suprimento } from './suprimento.model';
import { Observable, of, Subject,map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn:"root"})
export class SuprimentoService {
 private suprimentos:Suprimento[] = [];
 private listaSuprimentosAtualizada = new Subject<Suprimento[]>();

 constructor (private httpClient: HttpClient,private router: Router){
}


getSuprimento (idSuprimento: string){
  // return {...this.suprimentos.find(sup => sup.id === idSuprimento)}
  return this.httpClient.get<{_id: string, nameSupply: string, qttSupply: number, typeSupply: string
  }>(`http://localhost:4000/suprimentos/${idSuprimento}`);
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



  removerSuprimento (id: string): void{
    this.httpClient.delete(`http://localhost:4000/suprimentos/${id}`).subscribe(() => {
    console.log (`Suprimento de id: ${id} removido`)
    alert('Suprimento removido com sucesso!');
    this.router.navigate(['/suprimento']);
    });
    }



    getSuprimentos(): void {
      this.httpClient.get<{mensagem: string,
        suprimentos: any}>('http://localhost:4000/suprimentos')
        .pipe(map((dados) => {
          return dados.suprimentos.map((suprimento => {
            return {
              id: suprimento._id,
              nameSupply: suprimento.nameSupply,
              qttSupply: suprimento.qttSupply,
              typeSupply: suprimento.typeSupply
            }
          }))
        }))
        .subscribe(
          (suprimentos) => {
            this.suprimentos = suprimentos;
            this.listaSuprimentosAtualizada.next([...this.suprimentos]);
          }
        )
    }


    atualizarSuprimento (id: string, nameSupply: string, qttSupply: number, typeSupply: string){
      const suprimento: Suprimento = { id, nameSupply, qttSupply, typeSupply};
      this.httpClient.put(`http://localhost:4000/Suprimentos/${id}`, suprimento)
      .subscribe((res => {
        const copia = [...this.suprimentos	];
        const indice = copia.findIndex (sup => sup.id === suprimento.id);
        copia[indice] = suprimento;
        this.suprimentos = copia;
        this.listaSuprimentosAtualizada.next([...this.suprimentos]);
        alert('Suprimento alterado com sucesso!')
        }));

}
}

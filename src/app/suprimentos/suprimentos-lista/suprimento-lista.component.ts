import { Component, OnInit,OnDestroy} from '@angular/core';
import { Suprimento } from '../suprimento.model';
import { SuprimentoService } from '../suprimento.service';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-suprimento-lista',
  templateUrl: './suprimento-lista.component.html',
  styleUrls: ['./suprimento-lista.component.css']
})
export class SuprimentoListaComponent implements OnInit, OnDestroy {


  suprimentos: Suprimento[] = [];
  private suprimentosSubscription: Subscription;
  constructor(public suprimentoService: SuprimentoService) {}


  ngOnInit(): void {
 this.suprimentoService.getSuprimentos1();
 this.suprimentosSubscription = this.suprimentoService
 .getListaDeSuprimentosAtualizadaObservable()
 .subscribe((suprimentos: Suprimento[]) => {
 this.suprimentos = suprimentos;
 });

  }

  onDelete (id: string): void{
    this.suprimentoService.removerSuprimento(id);
   }


  ngOnDestroy(): void {
    this.suprimentosSubscription.unsubscribe()
  }

}

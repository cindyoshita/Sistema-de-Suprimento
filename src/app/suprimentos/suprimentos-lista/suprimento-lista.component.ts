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

  /* usuarios = [
    {
      usuario:'aaaa',
      senha:'123456',
    },
    {
      usuario:'bbbb',
      senha:'abcdef',
    }
  ] */
  suprimentos:Suprimento[]=[];
  private suprimentosSubscription: Subscription;
  constructor(public suprimentoService: SuprimentoService) {}


  ngOnInit(): void {
    this.suprimentos = this.suprimentoService.getSuprimentos();
    this.suprimentosSubscription = this.suprimentoService
    .getListaDeSuprimentosAtualizadaObservable()
    .subscribe((suprimentos: Suprimento[]) => {
    this.suprimentos = suprimentos;
 });
  }

  ngOnDestroy(): void {
    this.suprimentosSubscription.unsubscribe()
  }

}

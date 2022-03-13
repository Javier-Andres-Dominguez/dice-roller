import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SharedService } from './shared.service';
import { TablaTiradasComponent2 } from './tabla-tiradas - copia/tabla-tiradas.component';
import { DadoComponent } from './dado/dado.component';
import { DadoService } from './services/dado.component.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GraficaComponent } from './grafica/grafica.component';
import {CardModule} from 'primeng/card';
import { CartesianScaleOptions } from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent /*implements OnInit*/ {
  title = 'Dice-roller';
  subtitle = 'Dices see me rolling';
  autor='Javier Andres Dominguez';
  TotalTirada:string = "";
  inputTotalDados = 1;
  inputCaras = 6;
  numeroTotalDado = 0;
  message = "";
  dados: DadoComponent[] = [];
  TablaTiradasComponent = new TablaTiradasComponent2(this.dadoService, this.data);
  GraficaComponent = new GraficaComponent(this.dadoService);
  styleOBJ =   {'img':'height: 70px, width: 70px'}

  dadoForm = new FormGroup({
    dadoId: new FormControl(''),
    cara: new FormControl(0),
    cantidadDados: new FormControl(0),
    totalTirada: new FormControl(0),
    sumaTexto: new FormControl(''),
  })

  constructor (public dadoService: DadoService, private data:SharedService) {
    this.data.currentDado.subscribe(message => this.dados = message)
    this.GraficaComponent.ngOnInit();
  }

  onKeyDices($event:any) {
    console.log($event.target.value);
    this.inputTotalDados = $event.target.value;
  }

  onKeyFaces($event:any) {
    console.log($event.target.value);
    this.inputCaras = $event.target.value;
  }

  addDado() {
    this.dadoService.addDado(this.dadoForm.value);
    this.dadoForm.reset({cara: 0, totalDados: 0, totalTirada: 0, sumatexto: ''});
    //console.log('Aca entro :D')
  }

  // ngOnInit(): void {
  //   this.sharedServices.currentMessage.subscribe(
  //     (message) => {this.message=message}
  //   )
  // }

  async receiveMessage ($event:string) {
    this.TotalTirada = $event;
    this.numeroTotalDado = parseInt($event.substring($event.indexOf('=')+1));
    var aux = new DadoComponent();
    this.dadoForm.setValue({dadoId: Math.floor(Math.random() * 10000000), cara: this.inputCaras, cantidadDados: this.inputTotalDados, totalTirada: this.numeroTotalDado, sumaTexto: $event});
    this.addDado();
    aux.inputCaras = this.inputCaras;
    aux.inputTotalDados = this.inputTotalDados
    aux.returnedString = $event;
    this.dados.push(aux);
    this.data.changeDado(this.dados);
    await this.TablaTiradasComponent.nuevaTirada(this.inputCaras, this.inputTotalDados, this.numeroTotalDado, $event);
    await this.GraficaComponent.ngOnInit();
    //console.log("mandado")
  }
}

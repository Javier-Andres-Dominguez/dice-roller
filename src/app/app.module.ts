import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DadoComponent } from './dado/dado.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {CardModule} from 'primeng/card';
import {ScrollingModule} from '@angular/cdk/scrolling'; 
import { TablaTiradasComponent2 } from './tabla-tiradas - copia/tabla-tiradas.component';
import { GraficaComponent } from './grafica/grafica.component';


@NgModule({
  declarations: [
    AppComponent,
    DadoComponent,
    //TablaTiradasComponent,
    TablaTiradasComponent2,
    GraficaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ButtonModule,
    FormsModule,
    HttpClientModule,
    ChartModule,
    InputNumberModule,
    CardModule,
    ScrollingModule,
    TableModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

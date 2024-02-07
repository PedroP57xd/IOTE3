import { Component } from '@angular/core';
import { Firestore, doc, setDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

rutadetabla:any;
ledStatus: boolean = false;
constructor(private db:Firestore) {

}
async apagar() {
  this.rutadetabla = doc(this.db,'controlLed','LED1');//RUTA DE TABLA EN LA BD
  await setDoc(this.rutadetabla, { encender: false });//CAMBIA EL ATRIBUTO DE LA TABLA
}

async encender() {
  this.rutadetabla = doc(this.db,'controlLed','LED1');//RUTA DE TABLA EN LA BD
  await setDoc(this.rutadetabla, { encender: true });//CAMBIA EL ATRIBUTO DE LA TABLA
}

async toogleState() {
  this.ledStatus=! this.ledStatus;
  this.rutadetabla = doc(this.db,'controlLed','LED1');//RUTA DE TABLA EN LA BD
  await setDoc(this.rutadetabla, { encender:this.ledStatus});//CAMBIA EL ATRIBUTO DE LA TABLA
  console.log(this.ledStatus);
}
}
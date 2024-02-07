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
ledStatus2: boolean = false;
ledStatus3: boolean = false;
ledStatus4: boolean = false;
constructor(private db:Firestore) {

}

async toogleState() {
  this.ledStatus=! this.ledStatus;
  this.rutadetabla = doc(this.db,'controlLed','LED1');//RUTA DE TABLA EN LA BD
  await setDoc(this.rutadetabla, { encender:this.ledStatus});//CAMBIA EL ATRIBUTO DE LA TABLA
  console.log(this.ledStatus);
}
async toogleState2() {
  this.ledStatus2=! this.ledStatus2;
  this.rutadetabla = doc(this.db,'controlLed','LED2');//RUTA DE TABLA EN LA BD
  await setDoc(this.rutadetabla, { encender:this.ledStatus2});//CAMBIA EL ATRIBUTO DE LA TABLA
  console.log(this.ledStatus2);
}
async toogleState3() {
  this.ledStatus3=! this.ledStatus3;
  this.rutadetabla = doc(this.db,'controlLed','LED3');//RUTA DE TABLA EN LA BD
  await setDoc(this.rutadetabla, { encender:this.ledStatus3});//CAMBIA EL ATRIBUTO DE LA TABLA
  console.log(this.ledStatus3);
}
async toogleState4() {
  this.ledStatus=! this.ledStatus4;
  this.ledStatus2=! this.ledStatus4;
  this.ledStatus3=! this.ledStatus4;
  this.ledStatus4=! this.ledStatus4;
  this.rutadetabla = doc(this.db,'controlLed','LED1');//RUTA DE TABLA EN LA BD
  this.rutadetabla = doc(this.db,'controlLed','LED2');//RUTA DE TABLA EN LA BD
  this.rutadetabla = doc(this.db,'controlLed','LED3');//RUTA DE TABLA EN LA BD
  this.rutadetabla = doc(this.db,'controlLed','LEDS');//RUTA DE TABLA EN LA BD
  await setDoc(this.rutadetabla, { encender:this.ledStatus});//CAMBIA EL ATRIBUTO DE LA TABLA
  await setDoc(this.rutadetabla, { encender:this.ledStatus2});//CAMBIA EL ATRIBUTO DE LA TABLA
  await setDoc(this.rutadetabla, { encender:this.ledStatus3});//CAMBIA EL ATRIBUTO DE LA TABLA
  await setDoc(this.rutadetabla, { encender:this.ledStatus4});//CAMBIA EL ATRIBUTO DE LA TABLA
  console.log(this.ledStatus);
  console.log(this.ledStatus2);
  console.log(this.ledStatus3);
  console.log(this.ledStatus4);
}

}
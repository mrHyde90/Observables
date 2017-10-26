import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
//necesitas este import raro para poder usar los observable
//utility function
import 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
	numbersObsSubscription: Subscription;
	customObsSubscription: Subscription;
//El observable tiene 3 modos
/*
	3 argumentos:
	-data
	-error
	-completion handler
*/
  constructor() { }
//cada segundo emitira ese observable
  ngOnInit() {
  	/*
  	IMPORTANTE!!!!
  	-cuando cambio de componente el observable no es destruido, aunque el componente sí
  	-todabia se mantiene ejecutando
  	-memory leak
	*/
  //observable operators checar mas
  	const myNumbers = Observable.interval(1000)
      .map(
         (data: number) => {
           return data * 2;
         }
       );
  	this.numbersObsSubscription = myNumbers.subscribe(
  		(numbers: number) =>{
  			console.log(numbers);
  		}
  	); 
  	const myObservable = Observable.create( (observer: Observer<string>) => {
  		setTimeout(() => {
  			observer.next("Firts package");
  		}, 2000);
  		setTimeout(() => {
  			observer.next("Second package");
  		}, 4000);
  		setTimeout(() => {
  			//observer.error("Esto no funciona");
  			//despues del complete ya no se ejecuta nada mas
  			observer.complete();
  		}, 5000);
  	});
  	this.customObsSubscription = myObservable.subscribe(
  		(data: string) => {console.log(data);},
  		(error: string) => {console.log(error);},
  		() => {console.log("completed"); }
  	);
  }

  ngOnDestroy(){
  	this.customObsSubscription.unsubscribe();
  	this.numbersObsSubscription.unsubscribe();
  }

}

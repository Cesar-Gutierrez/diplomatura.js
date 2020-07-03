import{Collection}from './1.collection';
import{Vector}from './2.Vector';
import {delay1,delay2,run,run2} from './3.Delay.js';
import{ej41,ej42,ej43}from './4.api';
import{getRemoteData}from './5.asyncAwait';
import{delay as delayEJ6,run as runEJ6} from './6.Delay';

//1 Collection
 console.log("Ejercicios 1 Collection\n");
let c=new Collection();
console.log("constructor vacio: ",c);
c=new Collection([1,2,3,4]);
console.log("constructor con lista como parametro: ",c);
c.add(5);
console.log("agrego elemento 5: ",c);
c.delete(3);
console.log("borro elemento 3: ",c);
console.log("la lista tiene el elem 2? : ",c.has(2));
 
//2 Vector
 
console.log("\nEjercicios 2 Vector\n");
let v=new Vector(3,2);
console.log("constructor vector ",v);
console.log("Suma vector (1,2)+(2,3) ");

console.log(new Vector(1, 2).sumar(new Vector(2,3)));//new Vector(2,3)
 
 
//3 Delay
//Experimentar con la función setTimeout para que muestre un mensaje después de 3000 milisegundos.

 
console.log("\nEjercicios 3 Delay\n");
console.log("Experimentar con la función setTimeout para que muestre un mensaje después de 3000 milisegundos.")
console.log("mira como imprimo");
delay1();
console.log("Crear una función `delay` que tome dos parámetros `mensaje` y `milisegundos` y muestre un mensaje después del tiempo indicado");
delay2("mesajito para cele",4000); 
console.log("Crear una función `run` con el siguiente código...Luego invocarla con `run()`. ¿Cuál es el resultado?");
run();
console.log("Modificar nuestra función `run` con el siguiente código. Ejecutarla y observar el resultado");
run2();

/* 
//4 API (queda comentado para que sea mas legible lo mostrado por consola)
console.log("- Mostrar por consola el resultado de fetch");
//ej41();
console.log("- Convertir los resultados a un objeto utilizando resultado.json() **utilizando promise chaining**");
//ej42();
console.log("- Mostrar por consola el nombre del usuario y la ciudad donde vive ");
//ej43();
//5 mismo con AWAIT/SYNC (queda comentado para que sea mas legible lo mostrado por consola)
//getRemoteData();

//6 mismo con AWAIT/SYNC (queda comentado para que sea mas legible lo mostrado por consola)
delayEJ6("prueba ej 6.1 a 5 segundos",5).then(mensaje=>console.log(mensaje));
runEJ6();   */
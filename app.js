let numeroSecreto = 0;
let intentos = 0;
let listaNumerosGenerados = []; //creamos un array para almacenar los numeros generados aleatoriamente
let numeroMaximo = 10; //creamos una variable para almacenar el numero maximo del intervalo

//funcion para asignar texto a un elemento HTML
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML =texto;
    return; //es buena practica poner return al final de una funcion aunque esta no retorne nada
}

//funcion para verificar el intento del usuario
function verificarIntento(){
    let numeroIngresado =parseInt( document.getElementById("valorIngresado").value);
    console.log(intentos);
    
    if (numeroIngresado===numeroSecreto){
        //Hacemos uso del operador ternatio para indicar si la palbra intentos va en plural o singular dependiendo del valor de intentos
        asignarTextoElemento("p",`Adivinaste el numero secreto en ${intentos} ${(intentos>1)?"intentos":"intento"}`);
        document.getElementById("reiniciar").removeAttribute("disabled"); //habilitamos el boton de reiniciar
    }else{
        //el usuario no adivino el numero secreto
        if (numeroIngresado>numeroSecreto){
            asignarTextoElemento("p","El numero secreto es menor");
    }else {
        asignarTextoElemento("p","El numero secreto es mayor");
    } 
    intentos++
    limpiarCajaTexto();
}
    return;

}

function limpiarCajaTexto(){
    document.querySelector("#valorIngresado").value=""; //al seleccionar un elemento por su id se puede hacer uso de # para seleccionar el elemento con querySelector
    return;
}

//funcion para generar un numero aleatorio
function generarNumeroAleatorio() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1
    console.log(numeroGenerado);
    console.log(listaNumerosGenerados);
    //si ya sorteamos todos los numeros posibles 
    if (listaNumerosGenerados.length === numeroMaximo){
        asignarTextoElemento("p","ya se agotaron los numeros secretos");
    }else{
         //si el numero generado esta ne la lista 
    if (listaNumerosGenerados.includes(numeroGenerado)){
        return generarNumeroAleatorio(); //llamamos a la funcion de nuevo para generar un nuevo numero (recursividad)
    }//si el numero no esta en la lista lo agregamos a la lista y lo retornamos
    else {
        listaNumerosGenerados.push(numeroGenerado);
        return numeroGenerado;
    }
    }
   
}

//creamos la funcion condicionesIniciales que asigna las condiciones iniciales del juego
function condicionesIniciales (){
    asignarTextoElemento("h1","Adivina el numero secreto");//indica el mensaje de titulo del juego
    asignarTextoElemento("p",`Escribe un numero del 1 al ${numeroMaximo}`);//indicar mensaje de intervalo de número
    intentos = 1;//reiniciar contador de intentos
    numeroSecreto = generarNumeroAleatorio(); //generar un nuevo numero aleatorio
    document.getElementById("reiniciar").setAttribute("disabled",true);    //deshabilitar el boton de reiniciar
    return;
}

function reiniciarJuego(){
   //limpiamos la caja de texto
    limpiarCajaTexto();
    condicionesIniciales();
    return;
}

condicionesIniciales(); //llamamos a la funcion condicionesIniciales para iniciar el juego  al cargar la pagina

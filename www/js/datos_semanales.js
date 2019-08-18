/*Iniciamos las variables globales necesarias*/
var minutosdescanso = 30;
var minutostrabajo = 400;
var diassemana = 5;
var total = 0;
var contador = 0;


/*Con esta función comprobamos cuantos minutos de descanso, minutos trabajados al día y número de días semanales
tenemos establecidos en el programa. Por defecto son 30, 400 y 5 días.*/
function comprobarvariables() {
	var descanso = localStorage.getItem('minutosdescanso');
	var trabajo = localStorage.getItem('minutostrabajo');
	var dias = localStorage.getItem('diassemana');
	
	if (isNaN(descanso) || descanso === null) {
		minutosdescanso = 30;
		localStorage.setItem('minutosdescanso', minutosdescanso);
	}
	else {
		minutosdescanso = descanso;
	}

	if (isNaN(trabajo) || trabajo === null) {
		minutostrabajo = 400;
		localStorage.setItem('minutostrabajo', minutostrabajo);
	}
	else {
		minutostrabajo = trabajo;
	}
	
	if (isNaN(dias) || dias === null) {
		diassemana = 5;
		localStorage.setItem('diassemana', diassemana);
	}
	else {
		diassemana = dias;
	}
}


/*Actualizamos los datos a tiempo real y los mostramos en la pantalla*/
function actualizardatos() {
	
	for (var x = 1; x < 6; x++) {
		var entrada = new Date(parseInt(localStorage.getItem('iniciojornada' + x)));
		var salida = new Date(parseInt(localStorage.getItem('finaljornada' + x)));
		var descanso = parseInt(localStorage.getItem('totaldescanso' + x));
		if (isNaN(entrada)) {
			document.getElementById('entrada' + x).innerHTML = '00:00';
			entrada = 0;
			salida = 0;
		}
		else {
			var horas = entrada.getHours();
			var minutos = entrada.getMinutes();
			if(horas < 10){horas = '0' + horas}
			if(minutos < 10){minutos = '0' + minutos}
			
			document.getElementById('entrada' + x).innerHTML = horas + ':' + minutos;	
		
			if (isNaN(salida)) {
				document.getElementById('salida' + x).innerHTML = '00:00';
				salida = Date.parse(new Date());
			}
			else {
				var horas = salida.getHours();
				var minutos = salida.getMinutes();
				if(horas < 10){horas = '0' + horas}
				if(minutos < 10){minutos = '0' + minutos}
			
				document.getElementById('salida' + x).innerHTML = horas + ':' + minutos;	
			}
		}
		
		if (isNaN(descanso)) {
			document.getElementById('descanso' + x).innerHTML = '00:00';
			descanso = 0;
		}
		else {
			var horas = calculadora.pasarahoras(descanso);
			var minutos = calculadora.pasaraminutos(descanso);
			if(horas < 10){horas = '0' + horas}
			if(minutos < 10){minutos = '0' + minutos}
			
			document.getElementById('descanso' + x).innerHTML = horas + ':' + minutos;	
		}
		
		
		var descansoexcedido = 0;		
		if (descanso > 30) {descansoexcedido = descanso - 30}	
		var horas = calculadora.pasarahoras((calculadora.milisegundosaminutos(salida) - calculadora.milisegundosaminutos(entrada)) - descansoexcedido);
		var minutos = calculadora.pasaraminutos((calculadora.milisegundosaminutos(salida) - calculadora.milisegundosaminutos(entrada)) - descansoexcedido);
		if(horas < 10){horas = '0' + horas}
		if(minutos < 10){minutos = '0' + minutos}
		
		document.getElementById('total' + x).innerHTML = horas + ':' + minutos;	
		
		
		/*Calculamos el tiempo total trabajado en la semana y lo mostramos en la pantalla*/
		total = total + ((calculadora.milisegundosaminutos(salida) - calculadora.milisegundosaminutos(entrada)) - descansoexcedido);
		var horastotales = calculadora.pasarahoras(total);
		var minutostotales = calculadora.pasaraminutos(total);
		if(horastotales < 10){horastotales = '0' + horastotales}
		if(minutostotales < 10){minutostotales = '0' + minutostotales}
		
		document.getElementById('totalsemanal').innerHTML = horastotales + ':' + minutostotales;
				
		
		/*Calculamos el tiempo restante por trabajar en la semana y lo mostramos en la pantalla. Lo ponemos en color rojo
		si nos falta tiempo y en verde si nos sobra.*/				
		var restante = (minutostrabajo * diassemana) - total;
		if (restante <= 0) {
			document.getElementById('restantesemanal').style.color = '#008000';
		}
		else {
			document.getElementById('restantesemanal').style.color = '#A52A2A';	
		}		
		restante = Math.abs(restante);
		var horasrestantes = calculadora.pasarahoras(restante);
		var minutosrestantes = calculadora.pasaraminutos(restante);
		if(horasrestantes < 10){horasrestantes = '0' + horasrestantes}
		if(minutosrestantes < 10){minutosrestantes = '0' + minutosrestantes}
		
		document.getElementById('restantesemanal').innerHTML = horasrestantes + ':' + minutosrestantes;
		
		
		/*Calculamos el tiempo acumulado diario y lo mostramos en la pantalla. Lo ponemos en color rojo si nos falta tiempo
		y en verde si nos sobra.*/
		if (entrada != 0) {
		contador = contador + 1;
		}
		var tiempoacumulado = (minutostrabajo * contador) - total;
		if (tiempoacumulado <= 0) {
			document.getElementById('totalacumulado').style.color = '#008000';
		}
		else {
			document.getElementById('totalacumulado').style.color = '#A52A2A';	
		}
		tiempoacumulado = Math.abs(tiempoacumulado);
		var horasacumuladas = calculadora.pasarahoras(tiempoacumulado);
		var minutosacumulados = calculadora.pasaraminutos(tiempoacumulado);
		if(horasacumuladas < 10){horasacumuladas = '0' + horasacumuladas}
		if(minutosacumulados < 10){minutosacumulados = '0' + minutosacumulados}
		
		document.getElementById('totalacumulado').innerHTML = horasacumuladas + ':' + minutosacumulados;
	}			
}	


/*Objeto calculadora.*/
var calculadora = {
	
/*Con esta función le pasamos los milisegundos pasados desde el 1/1/1970 hasta el momento de captura
y lo pasamos al total de minutos pasados y redondeado hacia abajo sin decimales para poder calcular 
los minutos que pasaron de un momento a otro. Así conseguimos que de lo mismo en que segundo fichamos,
al pasar al minuto siguiente, en el total suma un minuto, aunque solo haya pasado unos segundo en realidad.*/	
	milisegundosaminutos: function (milisegundos) {
		var x = Math.floor(milisegundos / 60000);
		return x;
	},
	
/*Con esta función calculamos los minutos trabajados, hasta 59, ya que en el minuto 60, sumaría 1 hora,
 y que será calculado con el resto de dividirlo entre 60 minutos que tiene 1 hora.*/	
	pasaraminutos: function (minutos) {
	var x = minutos % 60;
	return x;
	},


/*Con esta función pasamos el total de minutos trabajados a horas redondeado hacia abajo.*/
	pasarahoras: function (minutos) {
	var x = Math.floor(minutos / 60);
	return x;
	}
}


/*Con esta función mostramos el reloj en la parte superior de la aplicación.*/
function hora() {
	var hora = new Date();
	var horas = hora.getHours();
	var minutos = hora.getMinutes();
	var segundos = hora.getSeconds();
	var dia = hora.getDate();
	var ano = hora.getFullYear();
	var nombredelasemana = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];	
	var diasemana = nombredelasemana[hora.getDay()];
	var nombredelmes = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
	var mes = nombredelmes[hora.getMonth()];
	
	/*Si un número es menor que 10, se añadimos un 0 por delante.*/
	if(horas < 10){horas = '0' + horas}
	if(minutos < 10){minutos = '0' + minutos}
	if(segundos < 10){segundos = '0' + segundos}

	document.getElementById('horaactual').innerHTML = diasemana + ', ' + dia + ' de ' + mes + ' de ' + ano + ', ' + horas + ':' + minutos + ':' + segundos;
}


/*Con esta función hacemos que el reloj se actualice cada segundo. Además también actualiza a tiempo real, los 
datos mostrados en pantalla y la operatividad con los botones.*/
function mostrarhora() {
	window.setInterval(hora, 1000);
}	


/*Con esta función principal, cargamos las funciones que queremos que se inicien al inicio para la 
 ejecución del programa.*/
function iniciar() {
	hora();
	mostrarhora();
	comprobarvariables();
	actualizardatos();
}


/*Al cargar la página, cargamos la función principal 'iniciar' que es la encargada de iniciar toda la carga del programa.*/
window.addEventListener('load', iniciar);

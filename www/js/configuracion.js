/*Iniciamos las variables globales necesarias*/
var minutosdescanso = 30;
var minutostrabajo = 400;
var diassemana = 5;


/*Con esta función ponemos en escucha la pulsación de los botones de inicio y finalización de jornada y descanso.*/
function escucharbotones() {
	document.getElementById('actualizar_dias').addEventListener('click', function () {
		var diassemana = document.getElementById('diassemana').value;
		if (diassemana === '' || isNaN(diassemana)) {
			diassemana = 5;
			alert('Debes introducir un número válido.');
		}	
		localStorage.setItem('diassemana', diassemana);
		document.getElementById('diassemana').placeholder = diassemana;
		document.getElementById('diassemana').value = "";
	});	
	document.getElementById('actualizar_minutos_trabajo').addEventListener('click', function () {	
		var minutostrabajo = document.getElementById('minutostrabajo').value;
		if (minutostrabajo === '' || isNaN(minutostrabajo)) {
			minutostrabajo = 400;
			alert('Debes introducir un número válido.');
		}	
		localStorage.setItem('minutostrabajo', minutostrabajo);
		document.getElementById('minutostrabajo').placeholder = minutostrabajo;
		document.getElementById('minutostrabajo').value = "";

	});
	document.getElementById('actualizar_minutos_descanso').addEventListener('click', function () {
		var minutosdescanso = document.getElementById('minutosdescanso').value;
		if (minutosdescanso === '' || isNaN(minutosdescanso)) {
			minutosdescanso = 30;
			alert('Debes introducir un número válido.');
		}	
		localStorage.setItem('minutosdescanso', minutosdescanso);
		document.getElementById('minutosdescanso').placeholder = minutosdescanso;
		document.getElementById('minutosdescanso').value = "";
	});	
}


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
	
	document.getElementById('minutostrabajo').placeholder = minutostrabajo;
	document.getElementById('minutosdescanso').placeholder = minutosdescanso;
	document.getElementById('diassemana').placeholder = diassemana;

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
	mostrarhora();
	comprobarvariables();
	escucharbotones();
}


/*Al cargar la página, cargamos la función principal 'iniciar' que es la encargada de iniciar toda la carga del programa.*/
window.addEventListener('load', iniciar);

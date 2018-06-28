/*Iniciamos las variables globales necesarias*/
var minutosdescanso = 35;
var minutostrabajo = 420;
var diassemana = 5;
var minutoscortesia = 30;
var conciliacion = 0;


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
	document.getElementById('actualizar_minutos_cortesia').addEventListener('click', function () {	
		var minutoscortesia = document.getElementById('minutoscortesia').value;
		if (minutoscortesia === '' || isNaN(minutoscortesiao)) {
			minutoscortesia = 30;
			alert('Debes introducir un número válido.');
		}	
		localStorage.setItem('minutoscortesia', minutoscortesia);
		document.getElementById('minutoscortesia').placeholder = minutoscortesia;
		document.getElementById('minutoscortesia').value = "";

	});
	document.getElementById('actualizar_minutos_descanso').addEventListener('click', function () {
		var minutosdescanso = document.getElementById('minutosdescanso').value;
		if (minutosdescanso === '' || isNaN(minutosdescanso)) {
			minutosdescanso = 35;
			alert('Debes introducir un número válido.');
		}	
		localStorage.setItem('minutosdescanso', minutosdescanso);
		document.getElementById('minutosdescanso').placeholder = minutosdescanso;
		document.getElementById('minutosdescanso').value = "";
	});	
	document.getElementById('minutostrabajo').addEventListener('change', function () {
		var tipodato = document.getElementById('minutostrabajo').value;

		/*Ejecutamos la función necesaria según el dato que elegimos para cambiar*/	
		switch(tipodato) {
			case '0':
				minutostrabajo = 420;
				localStorage.setItem('minutostrabajo', minutostrabajo);
				localStorage.setItem('conciliacion', 0);
				break;
			case '1':
				minutostrabajo = 390;
				localStorage.setItem('minutostrabajo', minutostrabajo);
				localStorage.setItem('conciliacion', 0);
				break;
			case '2':
				minutostrabajo = 390;
				localStorage.setItem('minutostrabajo', minutostrabajo);
				localStorage.setItem('conciliacion', 1);
				break;
			case '3':
				minutostrabajo = 300;
				localStorage.setItem('minutostrabajo', minutostrabajo);
				localStorage.setItem('conciliacion', 0);
				break;
		}
	})	
}


/*Con esta función comprobamos cuantos minutos de descanso, minutos de cortesia, minutos trabajados al día y número de días semanales
tenemos establecidos en el programa. Por defecto son 35, 30, 400 y 5 días.*/
function comprobarvariables() {
	var descanso = parseInt(localStorage.getItem('minutosdescanso'));
	var trabajo = parseInt(localStorage.getItem('minutostrabajo'));
	var dias = parseInt(localStorage.getItem('diassemana'));
	var cortesia = parseInt(localStorage.getItem('minutoscortesia'));
	var conciliacion = parseInt(localStorage.getItem('conciliacion'));
		
	if (isNaN(descanso) || descanso === null) {
		minutosdescanso = 35;
		localStorage.setItem('minutosdescanso', minutosdescanso);
	}
	else {
		minutosdescanso = descanso;
	}

	if (isNaN(trabajo) || trabajo === null) {
		minutostrabajo = 420;
		conciliacion = 0;
		localStorage.setItem('minutostrabajo', minutostrabajo);
	}
	else {
		minutostrabajo = trabajo;
		if (minutostrabajo == 420) {document.getElementById("invierno").selected = "true"}
		
		else if (minutostrabajo == 390) {
			if (conciliacion == 0) {document.getElementById("verano").selected = "true"}
			else {document.getElementById("verano_concilia").selected = "true"}
		}
		else if (minutostrabajo == 300) {document.getElementById("fiestas").selected= "true"}
		
	}
	
	if (isNaN(dias) || dias === null) {
		diassemana = 5;
		localStorage.setItem('diassemana', diassemana);
	}
	else {
		diassemana = dias;
	}
	
	if (isNaN(cortesia) || cortesia === null) {
		cortesia = 30;
		localStorage.setItem('minutoscortesia', cortesia);
	}
	else {
		minutoscortesia = cortesia;
	}

	document.getElementById('minutosdescanso').placeholder = minutosdescanso;
	document.getElementById('diassemana').placeholder = diassemana;
	document.getElementById('minutoscortesia').placeholder = minutoscortesia;
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
	escucharbotones();
}


/*Al cargar la página, cargamos la función principal 'iniciar' que es la encargada de iniciar toda la carga del programa.*/
window.addEventListener('load', iniciar);

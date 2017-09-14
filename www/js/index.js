/*Iniciamos las variables globales necesarias*/
var minutosdescanso = 30;
var minutosTrabajo = 400;


/*Creamos los objetos BOTON que capturarán la hora que son pulsados, mostraran la hora en pantalla y cambiaran es aspecto 
de la pantalla en función de si estan activados o desactivados.*/
var botoniniciojornada = {
	activo: false,
	pulsado: false,
	
	capturarhora: function () {
		var hora = new Date();
		var horamilisegundos = hora.getTime();
		var iniciojornada = 'iniciojornada' + hora.getDay();
		localStorage.setItem(iniciojornada, horamilisegundos);
	},
	
	mostrarhora: function () {	
		var iniciojornada = new Date(parseInt(localStorage.getItem('iniciojornada' + new Date().getDay())));
		if (isNaN(iniciojornada)) {
			document.getElementById('hora_inicio_jornada').innerHTML = '00:00';
			this.activo = true;
			this.pulsado = false;
		}
		else {
			var horas = iniciojornada.getHours();
			var minutos = iniciojornada.getMinutes();
			if(horas < 10){horas = '0' + horas}
			if(minutos < 10){minutos = '0' + minutos}
			
			document.getElementById('hora_inicio_jornada').innerHTML = horas + ':' + minutos;
			this.activo = false;
			this.pulsado = true;
		}
	},	
	
	cambiarcss: function () {
		if (this.activo) {
			document.getElementById('inicio_jornada').disabled = false;
		}
		else {
			document.getElementById('inicio_jornada').disabled = true;
		}
		
		if (this.pulsado) {
			document.getElementById('inicio_jornada').className = 'boton_inicio_pulsado';	
		}
		else {		
			document.getElementById('inicio_jornada').className = 'boton_inicio';	
		}			
	},
}


var botonfinaljornada = {
	activo: false,
	pulsado: false,
	
	capturarhora: function () {
		var hora = new Date();
		var horamilisegundos = hora.getTime();
		var finaljornada = 'finaljornada' + hora.getDay();
		if (confirm('Estás seguro de finalizar la jornada?')) {
			localStorage.setItem(finaljornada, horamilisegundos);
			if (botonfinaldescanso.activo) {
				localStorage.setItem('finaldescanso', horamilisegundos);
				botontotaldescanso.calculototaldescanso();
			}
		}
	},
	
	mostrarhora: function () {	
		var finaljornada = new Date(parseInt(localStorage.getItem('finaljornada' + new Date().getDay())));
		if (isNaN(finaljornada) && botoniniciojornada.activo === false) {
			document.getElementById('hora_final_jornada').innerHTML = '00:00';
			this.activo = true;
			this.pulsado = false;
		}
		else if (isNaN(finaljornada) && botoniniciojornada.activo) {
			document.getElementById('hora_final_jornada').innerHTML = '00:00';
			this.activo = false;
			this.pulsado = false;
		}			
		else {
			var horas = finaljornada.getHours();
			var minutos = finaljornada.getMinutes();
			if(horas < 10){horas = '0' + horas}
			if(minutos < 10){minutos = '0' + minutos}
			
			document.getElementById('hora_final_jornada').innerHTML = horas + ':' + minutos;
			this.activo = false;
			this.pulsado = true;
		}
	},	
	
	cambiarcss: function () {
		if(this.activo) {
			document.getElementById('final_jornada').disabled = false;
		}
		else {
			document.getElementById('final_jornada').disabled = true;
		}
		
		if (this.pulsado) {
			document.getElementById('final_jornada').className = 'boton_final_pulsado';	
		}
		else {
			document.getElementById('final_jornada').className = 'boton_final';	
		}
	},
}


var botontotaljornada = {
	pulsado: false,
	
	mostrarhora: function () {
		var iniciojornada = parseInt(localStorage.getItem('iniciojornada' + new Date().getDay()));
		var finaljornada = parseInt(localStorage.getItem('finaljornada' + new Date().getDay()));
		var totaldescanso = parseInt(localStorage.getItem('totaldescanso' + new Date().getDay()));
		var descansoexcedido = 0;		
		if (isNaN(totaldescanso)) {totaldescanso = 0}
		
		if (totaldescanso > 30) {descansoexcedido = totaldescanso - 30}	
		
		if (isNaN(iniciojornada)) {
			document.getElementById('total_horas_jornada').innerHTML = '00:00';
			this.pulsado = false;
			localStorage.setItem('iniciodescanso', null);
			localStorage.setItem('finaldescanso', null);
		}
		else if (isNaN(finaljornada)) {
			var parcialjornada = Date.parse(new Date());
			var horas = calculadora.pasarahoras((calculadora.milisegundosaminutos(parcialjornada) - calculadora.milisegundosaminutos(iniciojornada)) - descansoexcedido);
			var minutos = calculadora.pasaraminutos((calculadora.milisegundosaminutos(parcialjornada) - calculadora.milisegundosaminutos(iniciojornada)) - descansoexcedido);
			if(horas < 10){horas = '0' + horas}
			if(minutos < 10){minutos = '0' + minutos}
		
			document.getElementById('total_horas_jornada').innerHTML = horas + ':' + minutos;
			this.pulsado = false;
		}
		else {		
			var horas = calculadora.pasarahoras((calculadora.milisegundosaminutos(finaljornada) - calculadora.milisegundosaminutos(iniciojornada)) - descansoexcedido);
			var minutos = calculadora.pasaraminutos((calculadora.milisegundosaminutos(finaljornada) - calculadora.milisegundosaminutos(iniciojornada)) - descansoexcedido);
			if(horas < 10){horas = '0' + horas}
			if(minutos < 10){minutos = '0' + minutos}
	
			document.getElementById('total_horas_jornada').innerHTML = horas + ':' + minutos;
			this.pulsado = true;
		}
	},	
	
	cambiarcss: function () {
		if (this.pulsado) {
			document.getElementById('total_jornada').className = 'boton_total_pulsado';	
		}
		else {
			document.getElementById('total_jornada').className = 'boton_total';	
		}
	}
}


var botoniniciodescanso = {
	activo: false,
	pulsado: false,
	
	capturarhora: function () {
		var hora = new Date();
		var horamilisegundos = hora.getTime();
		localStorage.setItem('iniciodescanso', horamilisegundos);
		localStorage.setItem('finaldescanso', NaN);
	},
	
	mostrarhora: function () {	
		var iniciodescanso = new Date(parseInt(localStorage.getItem('iniciodescanso')));
		if (isNaN(iniciodescanso) && botoniniciojornada.activo === true) {
			document.getElementById('hora_inicio_descanso').innerHTML = '00:00';
			this.activo = false;
			this.pulsado = false;
		}
		else if (isNaN(iniciodescanso) && botoniniciojornada.activo === false && botonfinaljornada.activo) {
			document.getElementById('hora_inicio_descanso').innerHTML = '00:00';
			this.activo = true;
			this.pulsado = false;	
		}	
		else if (isNaN(iniciodescanso) && botoniniciojornada.activo === false && botonfinaljornada.activo === false) {	
			document.getElementById('hora_inicio_descanso').innerHTML = '00:00';
			this.activo = false;
			this.pulsado = false;	
		}
		else if (botonfinaldescanso.activo) {
			var horas = iniciodescanso.getHours();
			var minutos = iniciodescanso.getMinutes();
			if(horas < 10){horas = '0' + horas}
			if(minutos < 10){minutos = '0' + minutos}
			
			document.getElementById('hora_inicio_descanso').innerHTML = horas + ':' + minutos;
			this.activo = false;
			this.pulsado = true;
		}
		else if (botontotaljornada.pulsado) {
			var horas = iniciodescanso.getHours();
			var minutos = iniciodescanso.getMinutes();
			if(horas < 10){horas = '0' + horas}
			if(minutos < 10){minutos = '0' + minutos}
			
			document.getElementById('hora_inicio_descanso').innerHTML = horas + ':' + minutos;
			this.activo = false;
			this.pulsado = true;	
		}
		else {	
			var horas = iniciodescanso.getHours();
			var minutos = iniciodescanso.getMinutes();
			if(horas < 10){horas = '0' + horas}
			if(minutos < 10){minutos = '0' + minutos}
			
			document.getElementById('hora_inicio_descanso').innerHTML = horas + ':' + minutos;
			this.activo = true;
			this.pulsado = true;
		}
	},	
	
	cambiarcss: function () {
		if(this.activo) {
			document.getElementById('inicio_descanso').disabled = false;
		}
		else {
			document.getElementById('inicio_descanso').disabled = true;
		}
		
		if (this.pulsado) {
			document.getElementById('inicio_descanso').className = 'boton_inicio_pulsado';
		}
		else {
			document.getElementById('inicio_descanso').className = 'boton_inicio';
		}
	},
}


var botonfinaldescanso = {
	activo: false,
	pulsado: false,
	
	capturarhora: function () {
		var hora = new Date();
		var horamilisegundos = hora.getTime();
		localStorage.setItem('finaldescanso', horamilisegundos);
	},
	
	mostrarhora: function () {	
		var finaldescanso = new Date(parseInt(localStorage.getItem('finaldescanso')));
		if (isNaN(finaldescanso) && botoniniciodescanso.pulsado) {
			document.getElementById('hora_final_descanso').innerHTML = '00:00';
			this.activo = true;
			this.pulsado = false;
		}
		
		else if (isNaN(finaldescanso) && botoniniciodescanso.pulsado === false) {
			document.getElementById('hora_final_descanso').innerHTML = '00:00';
			this.activo = false;
			this.pulsado = false;
		}	
		
		else {
			var horas = finaldescanso.getHours();
			var minutos = finaldescanso.getMinutes();
			if(horas < 10){horas = '0' + horas}
			if(minutos < 10){minutos = '0' + minutos}
			
			document.getElementById('hora_final_descanso').innerHTML = horas + ':' + minutos;
			this.activo = false;
			this.pulsado = true;
		}
	},	
	
	cambiarcss: function () {
		if(this.activo) {
			document.getElementById('final_descanso').disabled = false;
		}
		else {
			document.getElementById('final_descanso').disabled = true;
		}
		
		if (this.pulsado) {
			document.getElementById('final_descanso').className = 'boton_final_pulsado';
		}
		
		else {
			document.getElementById('final_descanso').className = 'boton_final';
		}		
	}
}


var botontotaldescanso = {
	pulsado: false,
	
	mostrarhora: function () {
		var iniciodescanso = parseInt(localStorage.getItem('iniciodescanso'));
		var finaldescanso = parseInt(localStorage.getItem('finaldescanso'));
		var totaldescanso = parseInt(localStorage.getItem('totaldescanso' + new Date().getDay()));
		if (isNaN(totaldescanso)) {totaldescanso = 0}
		
		if (isNaN(iniciodescanso)) {
			document.getElementById('total_horas_descanso').innerHTML = '00:00';
			this.pulsado = false;
		}
		else if (isNaN(finaldescanso)) {
			var parcialdescanso = Date.parse(new Date());
			var horas = calculadora.pasarahoras(totaldescanso) + (calculadora.pasarahoras(calculadora.milisegundosaminutos(parcialdescanso) - calculadora.milisegundosaminutos(iniciodescanso)));
			var minutos = calculadora.pasaraminutos(totaldescanso) + (calculadora.pasaraminutos(calculadora.milisegundosaminutos(parcialdescanso) - calculadora.milisegundosaminutos(iniciodescanso)));
			if(horas < 10){horas = '0' + horas}
			if(minutos < 10){minutos = '0' + minutos}
		
			document.getElementById('total_horas_descanso').innerHTML = horas + ':' + minutos;
			this.pulsado = false;
		}
		else {
			var horas = calculadora.pasarahoras(totaldescanso);
			var minutos = calculadora.pasaraminutos(totaldescanso);
			if(horas < 10){horas = '0' + horas}
			if(minutos < 10){minutos = '0' + minutos}
	
			document.getElementById('total_horas_descanso').innerHTML = horas + ':' + minutos;
			this.pulsado = true;
		}	
	},
	
	calculototaldescanso: function () {
		var iniciodescanso = new Date(parseInt(localStorage.getItem('iniciodescanso')));
		var finaldescanso = new Date(parseInt(localStorage.getItem('finaldescanso')));
		var totaldescanso = parseInt(localStorage.getItem('totaldescanso' + new Date().getDay()));
		if (isNaN(totaldescanso)) {totaldescanso = 0}
		var totaldescanso = totaldescanso + (calculadora.milisegundosaminutos(finaldescanso) - calculadora.milisegundosaminutos(iniciodescanso));
		localStorage.setItem('totaldescanso' + new Date().getDay(), totaldescanso);
	},
	
	cambiarcss: function () {
		if (this.pulsado) {
			document.getElementById('total_descanso').className = 'boton_total_pulsado';	
		}
		
		else {
			document.getElementById('total_descanso').className = 'boton_total';	
		}
	}
}	
	

/*Con esta función ponemos en escucha la pulsación de los botones de inicio y finalización de jornada y descanso.*/
function escucharbotones() {
	document.getElementById('inicio_jornada').addEventListener('click', function () {
		botoniniciojornada.capturarhora();
		botoniniciojornada.mostrarhora();	
		botoniniciojornada.cambiarcss();
		actualizardatos();
	});	
	document.getElementById('final_jornada').addEventListener('click', function () {	
		botonfinaljornada.capturarhora();
		botonfinaljornada.mostrarhora();	
		botonfinaljornada.cambiarcss();
		actualizardatos();
	});
	document.getElementById('inicio_descanso').addEventListener('click', function () {
		botoniniciodescanso.capturarhora();
		botoniniciodescanso.mostrarhora();	
		botoniniciodescanso.cambiarcss();
		actualizardatos();
	});	
	document.getElementById('final_descanso').addEventListener('click', function () {
		botonfinaldescanso.capturarhora();
		botonfinaldescanso.mostrarhora();	
		botonfinaldescanso.cambiarcss();
		botontotaldescanso.calculototaldescanso();
		actualizardatos();
	});	
}


/*Con esta función mostramos en pantalla los datos totales de horas trabajadas y del tiempo de descanso.*/
function actualizardatos() {
	botoniniciojornada.mostrarhora();
	botoniniciojornada.cambiarcss();
	botonfinaljornada.mostrarhora();
	botonfinaljornada.cambiarcss();
	botontotaljornada.mostrarhora();
	botontotaljornada.cambiarcss();
	botoniniciodescanso.mostrarhora();
	botoniniciodescanso.cambiarcss();
	botonfinaldescanso.mostrarhora();
	botonfinaldescanso.cambiarcss();
	botontotaldescanso.mostrarhora();
	botontotaldescanso.cambiarcss();
}


/*Con esta función comprobamos cuantos minutos de descanso tenemos establecidos en el programa. Por defecto son 30*/
function comprobarmindescanso() {
	var descanso = localStorage.getItem('minutosdescanso');
	if (descanso === null) {
		minutosdescanso = 30;
	}
	else {
		minutosdescanso = descanso;
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
	window.setInterval(botontotaljornada.mostrarhora, 1000);
	window.setInterval(botontotaldescanso.mostrarhora, 1000);
}	


/*Con esta función principal, cargamos las funciones que queremos que se inicien al inicio para la 
 ejecución del programa.*/
function iniciar() {
	hora();
	mostrarhora();
	actualizardatos();
	escucharbotones();
	comprobarmindescanso();
}


/*Al cargar la página, cargamos la función principal 'iniciar' que es la encargada de iniciar toda la carga del programa.*/
window.addEventListener('load', iniciar);

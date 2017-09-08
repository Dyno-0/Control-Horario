/*Iniciamos las variables globales necesarias*/
var minutosdescanso = 30;
var minutosTrabajo = 400;


/*Ponemos en los INPUT la fecha y hora actual*/
function iniciarinput() {
	var momentoactual = new Date();
	var ano = momentoactual.getFullYear();
	var mes = (momentoactual.getMonth()) + 1;
	var dia = momentoactual.getDate();
	var horas = momentoactual.getHours();
	var minutos = momentoactual.getMinutes();
	
	if(mes < 10){mes = '0' + mes}
	if(dia < 10){dia = '0' + dia}	
	if(horas < 10){horas = '0' + horas}
	if(minutos < 10){minutos = '0' + minutos}
	
	document.getElementById('dia').value = ano + '-' + mes + '-' + dia;
	document.getElementById('hora').value = horas + ':' + minutos;
}	


/*Con esta función ponemos a la escucha el Input para elegir que dato queremos cambiar*/
function escucharbotones() {
	
	document.getElementById('dato_modificar').addEventListener('change', function () {
		var tipodato = document.getElementById('dato_modificar').value;

		/*Ejecutamos la función necesaria según el dato que elegimos para cambiar*/	
		switch(tipodato) {
			case '1':
				solicitardiayhora('iniciojornada');
				break;
			case '2':
				solicitardiayhora('finaljornada');
				break;
			case '3':
				solicitarhora('iniciodescanso');
				break;
			case '4':
				solicitarhora('finaldescanso');
				break;
			case '5':
				solicitardiayminutos();
				break;
			case '6':
				solicitardia();
				break;
			case '7':
				if (confirm('Quieres reiniciar la semana?\nSe borrarán todos los datos.')) {
					localStorage.clear();
				}
				history.go(-1);
				break;
			case '8':
				if (confirm('Quieres borrar el descanso de la jornada actual?')) {
					localStorage.setItem('iniciodescanso', null);
					localStorage.setItem('finaldescanso', null);
					localStorage.setItem('totaldescanso' + new Date().getDay(), null);
				}
				history.go(-1);
				break;
		}
	})	
}	


/*Activamos los Input y guardamos los datos para cambiar cambiar el día y hora del inicio o final de una jornada laboral.*/
function solicitardiayhora(tipodato) {
	var tipodato = tipodato;	
	document.getElementById('dia').disabled = false;
	document.getElementById('hora').disabled = false;
	document.getElementById('aceptar').addEventListener('click', function () {
		var diasemana = document.getElementById('dia').value;
		var horacambio = document.getElementById('hora').value;
		
		var momentocambio = new Date(diasemana.substring(0,4),(diasemana.substring(5,7) - 1),diasemana.substring(8,10),horacambio.substring(0,2),horacambio.substring(3,5));		
		var nombredelasemana = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];	
		var diadelasemana = nombredelasemana[momentocambio.getDay()];	 	
	 	if (confirm('Dato a modificar:\n' + tipodato + ' del ' + diadelasemana + ', a las ' + horacambio + '.')) {
			localStorage.setItem(tipodato + momentocambio.getDay(), momentocambio.getTime());
		}
		history.go(-1);
	});
}


/*Activamos el Input y guardamos los datos para elegir el día laboral que queremos borrar.*/
function solicitardia() {
	document.getElementById('dia').disabled = false;
	document.getElementById('aceptar').addEventListener('click', function () {
		var diasemana = document.getElementById('dia').value;
			
		var momentocambio = new Date(diasemana.substring(0,4),(diasemana.substring(5,7) - 1),diasemana.substring(8,10));		
		var nombredelasemana = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];	
		var diadelasemana = nombredelasemana[momentocambio.getDay()];	 			
		
		if (confirm('Dato a modificar:\nBorrar la jornada del ' + diadelasemana + '.')) {
			localStorage.setItem('iniciojornada' + momentocambio.getDay(), null);
			localStorage.setItem('finaljornada' + momentocambio.getDay(), null);
			localStorage.setITem('totaldescanso' + momentocambio.getDay(), null);
		}
		history.go(-1);
	});
}


/*Activamos el Input y guardamos los datos para cambiar la hora del inicio o final del descanso de la jornada actual.*/	
function solicitarhora(tipodato) {
	var tipodato = tipodato;
	document.getElementById('hora').disabled = false;
	document.getElementById('aceptar').addEventListener('click', function () {
		var diasemana = document.getElementById('dia').value;
		var horacambio = document.getElementById('hora').value;
			
		var momentocambio = new Date(diasemana.substring(0,4),(diasemana.substring(5,7) - 1),diasemana.substring(8,10),horacambio.substring(0,2),horacambio.substring(3,5));			
		
		if (confirm('Dato a modificar:\n' + tipodato + ' a las ' + horacambio + '.')) {
			localStorage.setItem(tipodato, momentocambio.getTime());
		}
		history.go(-1);
	});	
	
}


/*Activamos los Input para cambiar cambiar el día y minutos del descanso total.*/
function solicitardiayminutos() {
	document.getElementById('hora').value = '00:00';
	document.getElementById('dia').disabled = false;
	document.getElementById('hora').disabled = false;
	document.getElementById('aceptar').addEventListener('click', function () {
		var diasemana = document.getElementById('dia').value;		
		var horacambio = document.getElementById('hora').value;
		var horas = parseInt(horacambio.substring(0,2));
		var minutos = parseInt(horacambio.substring(3,5));
		var totalminutos = horas * 60 + minutos;
		var momentocambio = new Date(diasemana.substring(0,4),(diasemana.substring(5,7) - 1),diasemana.substring(8,10));
		var nombredelasemana = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];	
		var diadelasemana = nombredelasemana[momentocambio.getDay()];	 			
		
		if (confirm('Dato a modificar:\nTotal del descanso del ' + diadelasemana + ' en ' + totalminutos + ' minutos.')) {
			localStorage.setItem('totaldescanso' + momentocambio.getDay(), totalminutos);	
		}
		history.go(-1);
	});	
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
	escucharbotones();
	iniciarinput();
}


/*Al cargar la página, cargamos la función principal 'iniciar' que es la encargada de iniciar toda la carga del programa.*/
window.addEventListener('load', iniciar);

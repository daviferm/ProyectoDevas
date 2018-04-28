

let MET = document.querySelector("input");
const INFO = document.querySelector(".info");
const MAPA_BOTON = document.getElementById('botonMapa');
const teclado = document.querySelector('.teclasNumero');
const selectBarrio = document.getElementById('barrio');


// MAPA_BOTON.addEventListener('click', mostrarMapa);


document.querySelector('#formulario').addEventListener('submit', obtenetDatos);


var latlng = {lat: 40.4169473, lng: -3.7035285};
let zoon = 10;
let ui = new UI(latlng, zoon);

let lat, long;

//Comprobar datos del formulario y mostrarlos en pantalla
function obtenetDatos(e) {
  e.preventDefault();
  const spinner = document.querySelector('.spinner');
  spinner.classList.add('animation');

  setTimeout(function(){

		const barrioSeleccionado = selectBarrio.options[selectBarrio.selectedIndex].value;
		let met = MET.value;
		let botonMap;
		let html;
		
		if(met.length < 3 || met.length > 4){
			MET.style.borderColor = 'red';
		}else if (met.length == 3) {
			MET.style.borderColor = '';
			met = 0 + MET.value;
			mostrarInfo(barrioSeleccionado, met);
		}else if(met.length === 4){
			mostrarInfo(barrioSeleccionado, met);
		}

		spinner.classList.remove('animation');
  }, 150);
}

//Función para mostrar la información del parkímetro
function mostrarInfo(barrioSeleccionado, met){
	for(let i=0; i < baseDatos.length; i++){
		if( baseDatos[i].alias.startsWith(barrioSeleccionado, 3) && baseDatos[i].alias.endsWith(met) ){
			console.log(baseDatos[i]);
			let mostrar = baseDatos[i];
			html = `<p>NÚMERO: ${mostrar.alias}</p>
			<p>BARRIO: ${mostrar.barrio}</p>
			<p>DIRECCIÓN: <span class="span">${mostrar.direccion}</span></p>
			<p>FABRICANTE: ${mostrar.fabricante}</p>
			<p>TARIFA: ${mostrar.tarifa}</p>
			`;
			botonMap = `<button type="button" class="mostrarMapa">Mapa</button>`
			INFO.className = 'info';
			INFO.innerHTML = html;
			INFO.style.display = 'block';
			document.querySelector('#mapa').style.top = '15px';
			lat = Number( mostrar.latitud );
			lng = Number( mostrar.longitud );
			let img = '../img/parkare.png';
			zoon = 17;
			latlng = {lat: lat, lng: lng};
			ui = new UI(latlng, zoon);
			ui.mostrarPin(latlng, img);

			break;
		}else{
			document.querySelector('#mapa').style.top = '20px';
			INFO.style.display = 'block';
			INFO.classList.add('noEncontrado');
			html = `<h3>El número de Barrio</br>
			o Parkímetro es incorrecto...</h3>`;
			INFO.innerHTML = html;
		}
	}
}


//Lenamos el listado de barrios
const barriosHTML = ["44 Guindalera","45 Lista","46 Castellana","51 El Viso","52 Prosperidad","53 Ciudad Jardín","54 Hispanoamérica","55 Nueva España","56 Castilla","61 Bellas Vistas","62 Cuatro Caminos","63 Castillejos","64 Almenara","65 Valdeacederas","66 Berruguete","75 Rios Rosas","76 Vallehermoso","84 Pilar","85 La Paz","93 Ciudad Universitaria"];
const listaBarrios = [44,45,46,51,52,53,54,55,56,61,62,63,64,65,66,75,76,84,85,93];

for(let i = 0; i < listaBarrios.length; i++){
  let option = document.createElement('option');
	option.value = listaBarrios[i];
	option.innerHTML = barriosHTML[i];
	selectBarrio.appendChild(option);
}












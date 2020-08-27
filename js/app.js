//Variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');

//Generamos un objeto con la busqueda del cliente
const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: '',
};

//Listeners
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(autos); //Muestra los autos al cargar
    //Llena las funciones de anios
    cargarAnios();
});

marca.addEventListener('change',e=>{
    datosBusqueda.marca = e.target.value
    filtrarAuto(); 
});

year.addEventListener('change',e=>{
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto(); 
});

minimo.addEventListener('change',e=>{
    datosBusqueda.minimo = parseInt(e.target.value);
    filtrarAuto(); 
});

maximo.addEventListener('change',e=>{
    datosBusqueda.maximo = parseInt(e.target.value);
    filtrarAuto();
});

puertas.addEventListener('change',e=>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

transmision.addEventListener('change',e=>{
    datosBusqueda.transmision = e.target.value
    filtrarAuto(); 
});

color.addEventListener('change',e=>{
    datosBusqueda.color = e.target.value
    filtrarAuto(); 
});



//funciones
function mostrarAutos(autos){ 
    console.log(autos);
    if(autos.length != 0){
        autos.forEach(auto =>{
            const {marca, modelo, year, puertas, transmision, precio, color} = auto;
            const autoHTML = document.createElement('p');
            autoHTML.innerHTML = `
                ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision : ${transmision} - Precio : ${precio} - Color: ${color}
            `;
            resultado.appendChild(autoHTML); 
        });
    }else{
        const error = document.createElement('p');
        error.className = 'error';
        error.innerText = 'Nos se encontraron coincidencias de busqueda, intente con otros criterios';
        resultado.appendChild(error);
        setTimeout(function(){
            error.remove();
        },2000);
    }
}


function cargarAnios(){
    const maxYear = new Date().getFullYear();
    const minYear = maxYear - 10;
    for(let i = maxYear ; i >= minYear ;i-- ){
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        year.appendChild(option);
    }
}

function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarAnio).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    limpiarAutos();
    mostrarAutos(resultado);
}

function limpiarAutos(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca)
        return auto.marca === marca;
    return auto;
}

function filtrarAnio(auto){
    const {year} = datosBusqueda;
    if(year)
        //Se requiere hacer un parseo por que los tipos de datos no conicidian para hacer la comparacion
        return auto.year === year;
    return auto;   
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo)
        return auto.precio >= minimo;
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo)
        return auto.precio <= maximo;
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas)
        return auto.puertas === puertas;
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision)
        return auto.transmision === transmision;
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color)
        return auto.color === color;
    return auto;
}


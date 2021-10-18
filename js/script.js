
// function paciente(nombre, tipoDeTurno, telefono) {
//     this.nombre = nombre;
//     this.tipoDeTurno = tipoDeTurno;
//     this.telefono = telefono;
// }

// let nombrePaciente = prompt("Escribe el nombre y apellido del paciente");
// let prepaga = prompt(" Bienvenido/a " + nombrePaciente + " ¿Tienes OSDE?");

// if (prepaga.toLowerCase() == "si") {
//     let numeroDeSocio = parseInt(prompt("indica tu número de socio de OSDE"))
// }

// let tipoDeTurno = prompt("Selecciona el tipo de turno. \n 1- Consulta 1era vez \n 2- Control de aparatología fija \n 3- Control de aparatología móvil \n 4- Toma de moldes \n 5- Cementado \n 6- Retiro de aparatología")
// let numeroTelefonico = parseInt(prompt("Escribe tu numero de teléfono. Lo usaremos para confirmar tu turno."));

// alert("Gracias " + nombrePaciente + " nos comunicaremos a la brevedad al número " + numeroTelefonico + " para confirmar tu turno.")

// const paciente1 = new paciente(nombrePaciente, tipoDeTurno, numeroTelefonico);

// console.log(paciente1);


class pacientes {
    constructor (nombre, edad, prepaga) {
        this.nombre = nombre.toUpperCase();
        this.edad = edad;
        this.prepaga = prepaga;
    }
}

const paciente1 = new pacientes("Franco Calluso", 33, false);
const paciente2 = new pacientes("Ramiro Ochoa", 21, true);
const paciente3 = new pacientes("Sofia Gugliera",16, true);
const paciente4 = new pacientes(prompt("Ingrese nombre del paciente a ingresar"), parseInt(prompt("Ingrese su edad")), prompt("¿Tiene OSDE?"));


const listaPacientes = [];
listaPacientes.push(paciente1);
listaPacientes.push(paciente2);
listaPacientes.push(paciente3);
listaPacientes.push(paciente4);

listaPacientes.sort ((p1, p2)=> {
    if (p1.nombre < p2.nombre) {
        return -1;
    } else if (p1.nombre > p2.nombre){
        return 1;
    } else {
        return 0;
    }
});
console.log(listaPacientes);

function buscarPaciente(ficha, nombre){
    let encontrado = ficha.find(paciente => paciente.nombre == nombre)
    if (encontrado == undefined){
        encontrado = "Paciente no encontrado";
    }
    return encontrado;
}
let resultado = buscarPaciente(listaPacientes, prompt("Ingrese el nombre del paciente a buscar").toUpperCase());
console.log (resultado);

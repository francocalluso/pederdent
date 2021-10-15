
function paciente(nombre, tipoDeTurno, telefono) {
    this.nombre = nombre;
    this.tipoDeTurno = tipoDeTurno;
    this.telefono = telefono;
    }

let nombrePaciente = prompt("Escribe el nombre y apellido del paciente");
let prepaga = prompt(" Bienvenido/a " + nombrePaciente + " ¿Tienes OSDE?");
if (prepaga.toLowerCase() == "si") {
    let numeroDeSocio= parseInt(prompt("indica tu número de socio de OSDE"))
}
let tipoDeTurno = prompt("Selecciona el tipo de turno. \n 1- Consulta 1era vez \n 2- Control de aparatología fija \n 3- Control de aparatología móvil \n 4- Toma de moldes \n 5- Cementado \n 6- Retiro de aparatología")

let numeroTelefonico = parseInt(prompt ( "Escribe tu numero de teléfono. Lo usaremos para confirmar tu turno."));

alert ("Gracias "+ nombrePaciente + " nos comunicaremos a la brevedad al número " +numeroTelefonico + " para confirmar tu turno." )

const paciente1 = new paciente (nombrePaciente, tipoDeTurno, numeroTelefonico);

console.log (paciente1);

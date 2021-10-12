
function solicitarInfo() {
let nombrePaciente = prompt("Escribe el nombre y apellido del paciente");
let prepaga = prompt(" Bienvenido/a " + nombrePaciente + " ¿Tienes OSDE?");

if (prepaga.toLowerCase() == "si") {
    let numeroDeSocio= parseInt(prompt("indica tu número de socio de OSDE"))
}

let numeroTelefonico = parseInt(prompt ( "Escribe tu numero de teléfono. Lo usaremos para confirmar tu turno."));

alert ("Gracias "+ nombrePaciente + " nos comunicaremos a la brevedad al número " +numeroTelefonico + " para confirmar tu turno." )
}

solicitarInfo()








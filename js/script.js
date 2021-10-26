

class pacientes {
    constructor (apellido, nombre, telefono, tipoDeTurno, osde) {
        this.apellido = apellido.toUpperCase();
        this.nombre = nombre.toUpperCase();
        this.telefono = telefono;
        this.tipoDeTurno = tipoDeTurno;
        this.osde = osde;
    }
}

const paciente1 = new pacientes("Calluso", "Franco", 1140247245, 4, true);
const paciente2 = new pacientes("Ochoa", "Ramiro", 1123552423, 2, true);
const paciente3 = new pacientes("Guggiera", "Sofia", 1193824283, 4, true);

let apellidoPaciente = prompt("Ingrese el Apellido del paciente").toUpperCase();
let nombrePaciente = prompt("Ingrese el nombre del paciente").toUpperCase();
let numeroTelefonico = parseInt(prompt("Escribe tu numero de teléfono. Lo usaremos para confirmar tu turno."));
let tipoDeTurno = prompt("Selecciona el tipo de turno. \n 1- Consulta 1era vez \n 2- Control de aparatología fija \n 3- Control de aparatología móvil \n 4- Toma de moldes \n 5- Cementado \n 6- Retiro de aparatología");
let osde = prompt("¿Tienes Osde?").toUpperCase();
let osdeMap = {"SI":true,"NO":false};


const paciente4 = new pacientes(apellidoPaciente, nombrePaciente, numeroTelefonico, tipoDeTurno, osdeMap[osde]);


const listaPacientes = [];
listaPacientes.push(paciente1);
listaPacientes.push(paciente2);
listaPacientes.push(paciente3);
listaPacientes.push(paciente4);

listaPacientes.sort ((p1, p2)=> {
    if (p1.apellido < p2.apellido) {
        return -1;
    } else if (p1.nombre > p2.nombre){
        return 1;
    } else {
        return 0;
    }
});
console.log(listaPacientes);

let tituloLista = document.createElement("h2");
tituloLista.innerHTML= `LISTA DE PACIENTES INGRESADOS`
document.getElementById("listaPacientesIngresados").appendChild(tituloLista);

for (const paciente of listaPacientes) {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
                            <h3> Apellido: ${paciente.apellido}  <br>  Nombre: ${paciente.nombre}</h3>
                            <p> Teléfono: ${paciente.telefono}<br>
                            Tipo de turno: ${paciente.tipoDeTurno}<br>
                             OSDE: ${paciente.osde}</p>`;
    
    document.getElementById("listaPacientesIngresados").appendChild(contenedor)
}


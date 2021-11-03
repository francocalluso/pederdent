
// CONSTRUCTOR DE PACIENTES
class pacientes {
    constructor (apellido, nombre, telefono, tipoDeTurno, fecha, hora, osde) {
        this.apellido = apellido.toUpperCase();
        this.nombre = nombre.toUpperCase();
        this.telefono = parseInt(telefono);
        this.tipoDeTurno = tipoDeTurno;
        this.fecha = fecha;
        this.hora = hora;
        this.osde = osde;
    }
}

let listaPacientes = [];

//RECUPERAR STORAGE 

let storedTurno = localStorage.getItem('listaPacientesStorage');
let storedTurnoParse = JSON.parse(storedTurno);


if (storedTurnoParse !== null && storedTurnoParse !== undefined) {
    listaPacientes = storedTurnoParse;
};


//CARGA DE PACIENTES NUEVOS EN EL INPUT

function cargarPaciente () {
    let apellido = document.getElementById("inApell").value;
    let nombre = document.getElementById("inNom").value;
    let telefono = document.getElementById("inTel").value;
    let tipoDeTurno = document.getElementById("inTDT").value;
    let fecha = document.getElementById("inFecha").value;
    let hora = document.getElementById("inHora").value;
    let osde = document.getElementById("inOsde").value;
    const paciente = new pacientes(apellido,nombre,telefono,tipoDeTurno,fecha,hora,osde);
    listaPacientes.push(paciente);
    console.log(listaPacientes);

    storePaciente()
}



//VALIDACIÓN QUE HABILITA EL BOTÓN PARA SACAR TURNO 
//CUANDO LOS CAMPOS ESTÁN COMPLETADOS

function validarDatos() {

    if ((document.getElementById("inApell").value != "") 
        && (document.getElementById("inNom").value != "") 
        && (document.getElementById("inTel").value != "")
        && (document.getElementById("inFecha").value != "")
        && (document.getElementById("inHora").value != "")){
        document.getElementById("sacarTurno").disabled = false;
    }else {
        document.getElementById("sacarTurno").disabled = true;
    }

}

//EVENTO INPUT QUE ACTIVA LA VALIDACIÓN
document.getElementById("inApell").addEventListener("input", validarDatos);
document.getElementById("inNom").addEventListener("input", validarDatos);
document.getElementById("inTel").addEventListener("input", validarDatos);
document.getElementById("inFecha").addEventListener("input", validarDatos);
document.getElementById("inHora").addEventListener("input", validarDatos); 


//STORAGE 

function storePaciente() {

 localStorage.setItem("listaPacientesStorage", JSON.stringify(listaPacientes));
        
}




//DOM TARJETA DE TURNO SACADO

function mostrarTurno() {
    
let tituloLista = document.createElement("h2");
tituloLista.innerHTML= `¡Turno registrado!   Lista de turnos:`
document.getElementById("listaPacientesIngresados").appendChild(tituloLista);

for (const paciente of listaPacientes) {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
                            <h3> Apellido: ${paciente.apellido}  <br>  Nombre: ${paciente.nombre}</h3>
                            <p> Teléfono: ${paciente.telefono}<br>
                            Tipo de turno: ${paciente.tipoDeTurno}<br>
                             Día: ${paciente.fecha}<br>
                             Hora:${paciente.hora}</p> <br>
                             <button class="btn2" id="cancelar"> CANCELAR TURNO</button>
                             <a href=""><img src="assets/descarga.png" class="imgTarjeta"></a>
                             <a href=""><img src="assets/mail.png" class="imgTarjeta"></a>`;
    
    document.getElementById("listaPacientesIngresados").appendChild(contenedor);

    }
}

//FUNCIONES PARA LIMPIAR INPUTS Y RENDER UNA VEZ QUE SE CARGA UN PACIENTE 

function limpiarInputs() {

    document.getElementById("inApell").value = ""; 
    document.getElementById("inNom").value = "";
    document.getElementById("inTel").value = "";
    document.getElementById("inFecha").value = "";
    document.getElementById("inHora").value = "";
    validarDatos();

}

function resetRender() {
    
    document.getElementById("listaPacientesIngresados").innerHTML = ``;

    }


//EVENTO DEL CLICKS Y SUS LLAMADAS A FUNCIONES

document.getElementById("sacarTurno").addEventListener("click", function() {
 
    resetRender();
    cargarPaciente();
    mostrarTurno();
    limpiarInputs();
    
});




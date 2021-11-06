
// CONSTRUCTOR DE PACIENTES
class pacientes {
    constructor (id, apellido, nombre, telefono, tipoDeTurno, fecha, hora, osde) {
        this.id = parseInt(id);
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
}else{
    resetRender();
};


//CARGA DE PACIENTES NUEVOS EN EL INPUT

function cargarPaciente () {
    let id = listaPacientes.length;
    let apellido = document.getElementById("inApell").value;
    let nombre = document.getElementById("inNom").value;
    let telefono = document.getElementById("inTel").value;
    let tipoDeTurno = document.getElementById("inTDT").value;
    let fecha = document.getElementById("inFecha").value;
    let hora = document.getElementById("inHora").value;
    let osde = document.getElementById("inOsde").value;
    const paciente = new pacientes(id,apellido,nombre,telefono,tipoDeTurno,fecha,hora,osde);
    listaPacientes.push(paciente);


    storePaciente()
    Swal.fire(
        '',
        'Turno Registrado',
        'success'
      )
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


// INGRESO AL STORAGE DEL PACIENTE 

function storePaciente() {

 localStorage.setItem("listaPacientesStorage", JSON.stringify(listaPacientes));
        
}



//DOM TARJETA DE TURNO SACADO

function mostrarTurno() {
    
    let tituloLista = document.createElement("h2");
    tituloLista.innerHTML= `¡Turno registrado! Lista de turnos:`
    document.getElementById("listaPacientesIngresados").appendChild(tituloLista);

    for (const paciente of listaPacientes) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `
                                <h3> Apellido: ${paciente.apellido}  <br>  Nombre: ${paciente.nombre}</h3>
                                <p> Teléfono: ${paciente.telefono}<br>
                                Tipo de turno: ${paciente.tipoDeTurno}<br>
                                Día: ${paciente.fecha}<br>
                                Hora:${paciente.hora}</p> <br>
                                <button class="btn2" id="boton${paciente.id}"> CANCELAR TURNO</button>
                                <a href=""><img src="assets/descarga.png" class="imgTarjeta"></a>
                                <a href=""><img src="assets/mail.png" class="imgTarjeta"></a>`;

        $("#listaPacientesIngresados").append(contenedor);   
        
        //EVENTOS PARA CADA BOTON DE CANCELACIÓN DE TURNO 
        //(TIENE UN BUG QUE NO TERMINO DE IDENTIFICAR POR QUÉ :( ))

        $(`#boton${paciente.id}`).on('click', function(){
            cancelarTurno(paciente);
            resetRender();
            mostrarTurno();
        })
        
    }
}

//FUNCION CANCELAR PACIENTE (BUGG DE QUE A VECES QUEDA UN SOLO PACIENTE QUE NO SE ELIMINA)
function cancelarTurno(paciente) {
    listaPacientes.splice(`${paciente.id}`,1)
    if (listaPacientes == null || listaPacientes == undefined ) {
        resetRender();
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


//EVENTO DEL BOTON "SACAR TURNO" Y SUS LLAMADAS A FUNCIONES

document.getElementById("sacarTurno").addEventListener("click", function() {
 
    resetRender();
    cargarPaciente();
    mostrarTurno();
    limpiarInputs();

});




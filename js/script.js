



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

let storedTurno = localStorage.getItem("listaPacientesStorage");
let storedTurnoParse = JSON.parse(storedTurno);


if (storedTurnoParse !== null && storedTurnoParse !== undefined) {
    listaPacientes = storedTurnoParse;
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

//  DOM TARJETA DE TURNO SACADO

function mostrarTurno() {
    
    $("#listaPacientesIngresados").prepend("<h2 id='hList'>TURNOS INGRESADOS</h2>");
    $("#hList") .fadeToggle(0000, function(){})
                .fadeIn(3500, function(){})
                .slideUp(2000);
                


    for (const paciente of listaPacientes) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `
                                <input value="${paciente.id}" type="hidden">
                                <h3> Apellido: ${paciente.apellido}  <br>  Nombre: ${paciente.nombre}</h3>
                                <p> Teléfono: ${paciente.telefono}<br>
                                Tipo de turno: ${paciente.tipoDeTurno}<br>
                                Día: ${paciente.fecha}<br>
                                Hora:${paciente.hora}</p> <br>
                                <button class="btn2" id="botonCancelar"> CANCELAR TURNO</button>`;

        $("#listaPacientesIngresados").append(contenedor).fadeIn();         
    

        //  EVENTO PARA BOTON DE CANCELACIÓN DE TURNO 
        $(".btn2").click (function (e){
            Swal.fire({
                title:"¿Quieres eliminar el turno?",
                text: "No podrás revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#37b0a6',
                confirmButtonText: 'Sí, eliminalo!'

              }).then((result) => {
                if (result.isConfirmed) {
                    let padre = $(e.target).parent().children();
                    console.log(padre);
                    let idCanc = padre[0].value;
                    console.log(idCanc);
                    listaPacientes.splice(idCanc, 1);
                    $(e.target).parent().slideUp("slow");
                    storePaciente();
                  Swal.fire({
                    title:'Turno Cancelado',                
                    icon:'success',
                    confirmButtonColor:'#37b0a6'
                  }
                  )
                }
              })
            
        })                
    }
}

//  FUNCIONES PARA LIMPIAR INPUTS Y RENDER UNA VEZ QUE SE CARGA UN PACIENTE 

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


//  EVENTO DEL BOTON "SACAR TURNO" Y SUS LLAMADAS A FUNCIONES

document.getElementById("sacarTurno").addEventListener("click", function() {
 
    resetRender();
    cargarPaciente();
    mostrarTurno();
    limpiarInputs();

});

// AJAX
function obtenerDatos(){   
    $("#listaUsuarios").prepend("<h3>LISTA DE USUARIOS REGISTRADOS</h3>");
    const URLGET = "https://reqres.in/api/users?page=2";
    $.get(URLGET).done(function(resultado,estado){
        console.log("el estado que retorna es " + estado);
        console.log(resultado.data);
        if (estado == "success"){
            let usuarios=resultado.data;
            usuarios.forEach(usuario => {
                $("#tablaUser").append("<tr><td>" +usuario.first_name+"</td><td>" +usuario.last_name+ "</td><td>"  +usuario.email+ "</td><td><img class='avatarImg' src="+usuario.avatar+"></td></tr>" )
            }) 
        }
    }) 
    $("#btnSalirAdm").prepend("<button id='salirAdmin'class='btn1'>SALIR DEL MODO ADMINISTRADOR</button>");
    $("#salirAdmin").click(function(){
        $("#listaUsuarios").hide();
        $(".turnos").show();
    })   
};
obtenerDatos();
$("#listaUsuarios").hide();

function mostrarDatosAdmin(){
    $(".turnos").hide();
    $("#listaUsuarios").show();
}


//ADMIN LOGIN

$(".popup").hide();
$("#adminLog").click(function(){
    $(".popup").show();
});

$(".cerrar").click(function(){
    $(".popup").hide();
});

    //VALIDACIÓN DE CLAVE
    function validarAdminLog() {
        if (document.getElementById("adminPass").value == "1234") {
            document.getElementById("botonAdminLog").disabled = false;
        }else{
            document.getElementById("botonAdminLog").disabled = true;
        }
    };

   $("#adminPass").on('input', function(){
       validarAdminLog() }
       );

    $("#botonAdminLog").click(function(){
        $(".popup").hide();
        mostrarDatosAdmin();
        
    })
   

  



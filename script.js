import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getDatabase, ref, set, child, update, remove, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAVU1rSngM8HcJZu-xuWn59cQh5HZe7sMc",
    authDomain: "entradasysalidas-a8504.firebaseapp.com",
    databaseURL: "https://entradasysalidas-a8504-default-rtdb.firebaseio.com",
    projectId: "entradasysalidas-a8504",
    storageBucket: "entradasysalidas-a8504.appspot.com",
    messagingSenderId: "384035227095",
    appId: "1:384035227095:web:502f4614f0425d65dcb792"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dbRef = ref(database);

get(child(dbRef,"piezas")).then((snapshot)=>{
    if(snapshot.exists()){
        var datos = snapshot.val();
        console.log(datos);
        console.log(datos.length-1);
        for (var i in snapshot.val()){
            if (i!=1) {
                var row =
                    `<tr>
                    <td>${i-1}</td>
                    <td>${datos[i].nombre}</td>
                    <td>${datos[i].descripcion}</td>
                    <td>${datos[i].fechaentrada}</td>
                    <td>${datos[i].fechasalida}</td>
                    <td>${datos[i].origen}</td>
                    <td>${datos[i].destino}</td>
                </tr>`
                var table = $('#table-body');
                table.append(row)
            }
        }
    }else{
        console.log("No data available");
    }
}).catch((error)=>{
    console.error(error);
});

if(document.getElementById("botonInsertar")){
    document.getElementById("botonInsertar").addEventListener("click", insertar, false);
}

if(document.getElementById("botonEditar")){
    document.getElementById("botonEditar").addEventListener("click", editar, false);
}

if(document.getElementById("obtenerID")){
    document.getElementById("obtenerID").addEventListener("click", obtenerID, false);
}

function insertarDatos(nombre, descripcion, fechaentrada, fechasalida, origen, destino) {
    get(child(dbRef,"piezas")).then((snapshot)=> {
        if (snapshot.exists()) {
            var datos = snapshot.val();
            console.log(datos);
            console.log(datos.length - 1);
            var ultimoID = datos.length;

            set(ref(database, 'piezas/' + ultimoID), {
                nombre: nombre,
                descripcion: descripcion,
                fechaentrada: fechaentrada,
                fechasalida: fechasalida,
                origen: origen,
                destino: destino,
            });
        } else {
            console.log("No data available");
        }
    }).catch((error)=>{
        console.error(error);
    });


}

function insertar(){
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;
    var fechaentrada = document.getElementById("fechaentrada").value;
    var fechasalida = document.getElementById("fechasalida").value;
    var origen = document.getElementById("origen").value;
    var destino = document.getElementById("destino").value;

    console.log(nombre,descripcion,fechaentrada,fechasalida,origen,destino);

    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("fechaentrada").value = "";
    document.getElementById("fechasalida").value = "";
    document.getElementById("origen").value = "";
    document.getElementById("destino").value = "";

    document.getElementById("mensajeSuccess").innerHTML = "Pieza agregada, vuelva al Inicio";

    return insertarDatos(nombre,descripcion,fechaentrada,fechasalida,origen,destino);
}

function obtenerID(){
    var idAEditar = document.getElementById("idAEditar").value;
    var realID = (parseInt(idAEditar)+1).toString();

    get(child(dbRef,"piezas")).then((snapshot)=>{
        if(snapshot.exists()){
            var datos = snapshot.val();
            console.log(datos);
            console.log(datos.length-1);

            document.getElementById("nombreEditar").value = datos[realID].nombre;
            document.getElementById("descripcionEditar").value = datos[realID].descripcion;
            document.getElementById("fechaentradaEditar").value = datos[realID].fechaentrada;
            document.getElementById("fechasalidaEditar").value = datos[realID].fechasalida;
            document.getElementById("origenEditar").value = datos[realID].origen;
            document.getElementById("destinoEditar").value = datos[realID].destino;


        }else{
            console.log("No data available");
        }
    }).catch((error)=>{
        console.error(error);
    });

    document.getElementById("idAEditarFinal").innerHTML = idAEditar
}

function editar(){
    var ID = document.getElementById("idAEditarFinal").innerHTML;
    var IDmasuno = parseInt(ID)+1;
    console.log(IDmasuno);
    var strIDmasuno = IDmasuno.toString()
    console.log(strIDmasuno)

    var nombre = document.getElementById("nombreEditar").value;
    var descripcion = document.getElementById("descripcionEditar").value;
    var fechaentrada = document.getElementById("fechaentradaEditar").value;
    var fechasalida = document.getElementById("fechasalidaEditar").value;
    var origen = document.getElementById("origenEditar").value;
    var destino = document.getElementById("destinoEditar").value;

    console.log(nombre,descripcion,fechaentrada,fechasalida,origen,destino);

    set(ref(database, 'piezas/' + strIDmasuno), {
        nombre: nombre,
        descripcion: descripcion,
        fechaentrada: fechaentrada,
        fechasalida: fechasalida,
        origen: origen,
        destino: destino,
    });

    document.getElementById("idAEditar").value ="";
    document.getElementById("idAEditarFinal").innerHTML = "";

    document.getElementById("nombreEditar").value = "";
    document.getElementById("descripcionEditar").value = "";
    document.getElementById("fechaentradaEditar").value = "";
    document.getElementById("fechasalidaEditar").value = "";
    document.getElementById("origenEditar").value = "";
    document.getElementById("destinoEditar").value = "";

    document.getElementById("mensajeSuccessEditar").innerHTML = "Pieza editada, vuelva al Inicio";
}






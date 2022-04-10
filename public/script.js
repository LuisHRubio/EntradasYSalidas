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
        for (var i in snapshot.val()){
            var row =
                `<tr>
                    <td>${i}</td>
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
    }else{
        console.log("No data available");
    }
}).catch((error)=>{
    console.error(error);
});





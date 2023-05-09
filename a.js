var firebaseConfig = {
    apiKey: "AIzaSyBhh1Z0l0Z14dqZD3VGT-d_tJ3epmtg0rE",
    authDomain: "cartbdcv.firebaseapp.com",
    databaseURL: "https://cartbdcv-default-rtdb.firebaseio.com/",
    projectId: "cartbdcv",
    storageBucket: "cartbdcv.appspot.com",
    messagingSenderId: "165593545933",
    appId: "1:165593545933:web:62629ab8274630331fbd84"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
  //crea una variable para mantener los datos de Firebase
var firebaseDatosCollection = database.ref().child('asistencia');

// conteo de referencias ------------------------------------
var arf;
var arfu;
firebaseDatosCollection.on('value',function(asistencias){
    arf=0;
    asistencias.forEach(function(firebaseDatosReference){
        var dato = firebaseDatosReference.val();
        console.log(dato);
        arf=arf+1;
    });
    arfu=arf;
    var refHTML =``+arfu+`<br>`;
    document.getElementById('ref').innerHTML=refHTML;
});

//------------------------------------------------------------

function guardar(){
    // CON EL METODO update SI EXISTE LA MATRICULA LA actualiza
    // Y SI NO EXISTE AGREGA EL CHILD NUEVO CON LOS datos COMO SI FUERA push EN A BD
    var dato1 = {
        ref: arfu, //otra forma es $('#myForm [name="fullname"]').
        fecha:  f2,//$('#dt').val(),
        hora: hr, //$('#time').val(),
        atleta: $('#atop option:selected').text(),
        coach: $('#coop option:selected').text(),
        asistente: $('#asop option:selected').text(),
        turno: turno,    
    };
    if($('#atop option:selected').text() != "Selecciona al atleta" 
    && $('#coop option:selected').text() != "Seleccionar coach" 
    && $('#asop option:selected').text() != "Seleccionar asistente")
    {
        firebaseDatosCollection.child(arfu).update(dato1);
    }
};
 

//filtrado--------------------------------------------------------------
function filtrado(){
    if($('#ft option:selected').text() == 'Mostrar todo'){
        i=arfu;
        var recentPostsRef = database.ref().child('asistencia').limitToLast(i);
        Mostrar();
    }
    else if($('#ft option:selected').text() == 'Mostrar últimos 10 registros'){
        i=10;
        var recentPostsRef = database.ref().child('asistencia').limitToLast(i);
        Mostrar();
    }
    else if($('#ft option:selected').text() == 'Mostrar últimos 20 registros'){
        i=20;
        var recentPostsRef = database.ref().child('asistencia').limitToLast(i);
        Mostrar();
    }

    function Mostrar(){
        recentPostsRef.on('value',function(asistencias){
            var datosHtml = `<table class="table table-borderless table-dark">
                            <thead><tr>
                                    <th scope='col'>REF</th>
                                    <th scope='col'>FECHA</th>
                                    <th scope='col'>HORA</th>
                                    <th scope='col'>ATLETA</th>
                                    <th scope='col'>COACH</th>
                                    <th scope='col'>ASISTENTE</th>
                                    <th scope='col'>TURNO</th>
                                    <th scope='col'>ACCIONES</th>
                                    </tr></thead><tbody>`;
            asistencias.forEach(function(firebaseDatosReference){
            var dato = firebaseDatosReference.val();
            console.log(dato); 
            var datoIndividial =`<tr><th scope="row">`+dato.ref+`</th>
                                     <td>`+dato.fecha+`</td>
                                     <td>`+dato.hora+`</td>
                                     <td>`+dato.atleta+`</td>
                                     <td>`+dato.coach+`</td>
                                     <td>`+dato.asistente+`</td>
                                     <td>`+dato.turno+`</td>
                                     <td>
                                        <button class="btn btn-danger" id="boton" 
                                        onclick="borrar('`+dato.ref+`')">ELIMINAR</button>
                                      </td>
                                     </tr>`;
            datosHtml = datosHtml + datoIndividial;
            });
            datosHtml = datosHtml + `</tbody></table>`;
            $('#tasistencias').html(datosHtml);
        });
    
    };
    
}

function validate(){
    if ($('#dt').val() == "") {
        alert("selecciona una fecha", "alerta");   
    }
    else{
        filtrarfecha(); 
    }
}

function filtrarfecha(){
    firebaseDatosCollection.on('value',function(asistencias){
        var datosHtml = `<table class="table table-borderless table-dark">
                        <thead><tr>
                                <th scope='col'>REF</th>
                                <th scope='col'>FECHA</th>
                                <th scope='col'>HORA</th>
                                <th scope='col'>ATLETA</th>
                                <th scope='col'>COACH</th>
                                <th scope='col'>ASISTENTE</th>
                                <th scope='col'>TURNO</th>
                                <th scope='col'>ACCIONES</th>
                                </tr></thead><tbody>`;
        asistencias.forEach(function(firebaseDatosReference){
        var dato = firebaseDatosReference.val();
        console.log(dato);
        if (dato.fecha == $('#dt').val()) {
            var datoIndividial =`<tr><th scope="row">`+dato.ref+`</th>
            <td>`+dato.fecha+`</td>
            <td>`+dato.hora+`</td>
            <td>`+dato.atleta+`</td>
            <td>`+dato.coach+`</td>
            <td>`+dato.asistente+`</td>
            <td>`+dato.turno+`</td>
            <td>
               <button class="btn btn-danger" id="boton" 
               onclick="borrar('`+dato.ref+`')">ELIMINAR</button>
             </td>
            </tr>`;
            datosHtml = datosHtml + datoIndividial; 
        } 
        });
        datosHtml = datosHtml + `</tbody></table>`;
        $('#tasistencias').html(datosHtml);
    });
}
//----------------------------------------------------------------------


/**/
// asistencias de hoy ------------------------------------------------------------------
var todayPostsRef = database.ref('asistencia'); //.child('').equalTo()
todayPostsRef.on('value',function(asistencias){
    var datosHtml = `<table class="table table-borderless table-dark">
                    <thead><tr>
                            <th scope='col'>REF</th>
                            <th scope='col'>FECHA</th>
                            <th scope='col'>HORA</th>
                            <th scope='col'>ATLETA</th>
                            <th scope='col'>COACH</th>
                            <th scope='col'>ASISTENTE</th>
                            <th scope='col'>TURNO</th>
                            <th scope='col'>ACCIONES</th>
                            </tr></thead><tbody>`;
    asistencias.forEach(function(firebaseDatosReference){
    var dato = firebaseDatosReference.val();
    console.log(dato);
    if(dato.fecha == f2){
        var datoIndividial =`<tr><th scope="row">`+dato.ref+`</th>
                             <td>`+dato.fecha+`</td>
                             <td>`+dato.hora+`</td>
                             <td>`+dato.atleta+`</td>
                             <td>`+dato.coach+`</td>
                             <td>`+dato.asistente+`</td>
                             <td>`+dato.turno+`</td>
                             <td>
                                <button class="btn btn-danger" id="boton" 
                                onclick="borrar('`+dato.ref+`')">ELIMINAR</button>
                              </td>
                             </tr>`;
    datosHtml = datosHtml + datoIndividial;
    }
    });
    datosHtml = datosHtml + `</tbody></table>`;
    $('#tasistencias').html(datosHtml);
});

//-----------------------------------------------------------------------------------------



function borrar(pla){
    //alert("intento de borrar "+pla);
    // APUNTAMOS LA REFERENCIA EN LA BASE DE DATOS DE LA PLACA EN LA COLECCION autos
    let autosRef = this.database.ref('asistencia/'+pla)
    //ELIMINAMOS EL CHILD DE LA REFERENCIA    
    autosRef.remove();
    
    /* bucle para eliminar grandes cantidades
    pla=4  //inicio
    while(pla<550){ //final
        let autosRef = this.database.ref('asistencia/'+pla)
        autosRef.remove();
        pla++;
    }
    */
    
};


// obtencion de datos actules ------------------------------------
const fhoy = new Date();
a=fhoy.getHours();
b=fhoy.getMinutes();
c=fhoy.getSeconds();
var han = (a < 10) ? '0' + a : a;
var man = (b < 10) ? '0' + b : b;
var san = (c < 10) ? '0' + c : c;
var hr = a + ':' + b + ':' + c;

var turno;
if(a<12){
    turno=" Matutino";
} 
else 
{
    turno=" Vespertino";
}
document.getElementById('turno').innerHTML=turno;

function hoy(){
    alert("hoy es: "+ f +"\n"+"la hora es: " + hr);
}

var  today = new Date();               
var m = today.getMonth() + 1;
var d= today.getDate();               
var mes = (m < 10) ? '0' + m : m;
var dia = (d < 10) ? '0' + d : d;
var y=today.getFullYear();
var f=dia+'/'+mes+'/'+y;
var f2=y+'-'+mes+'-'+dia;
document.getElementById('date').innerHTML=f;

function startTime(){
today=new Date();                    
h=today.getHours();                    
m=today.getMinutes();                    
s=today.getSeconds();                    
m=checkTime(m);                    
s=checkTime(s);
ha=h+":"+m+":"+s;
document.getElementById('reloj').innerHTML=ha;                   
t=setTimeout('startTime()',500);}                    
function checkTime(i)                    
{if (i<10) {i="0" + i;}return i;}                    
window.onload=function(){startTime();}

//----------------------------------------------------------------------------------------------

/*
ref.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      // ...
    });
  });
*/

//listas-----------------------------------------
var atletaCollection = database.ref().child('atleta');  //'+atl+'/nombre'); //var atl;
var coachCollection = database.ref().child('coach');    //'+coa+'/nombre'); //var ;
var asistenteCollection = database.ref().child('asistente'); //'+ass+'/nombre'); //var ;

//atletas
atletaCollection.on('value',function(atleta){
    var datosHtml = `<option value="" disabled="disabled" selected="true">Selecciona al atleta</option>`;
    atleta.forEach(function(firebaseDatosReference){
    var dato = firebaseDatosReference.val();
    console.log(dato); 
    var datoIndividial =`<option value="`+dato.nombre+`">`+dato.nombre+`</option>`;
    datosHtml = datosHtml + datoIndividial;
    });
    datosHtml = datosHtml + `</select>`;
    $('#atop').html(datosHtml);
});

//coach
coachCollection.on('value',function(coach){
    var datosHtml = `<option value="" disabled="disabled" selected="true">Seleccionar coach</option>`;
    coach.forEach(function(firebaseDatosReference){
    var dato = firebaseDatosReference.val();
    console.log(dato); 
    var datoIndividial =`<option value="`+dato.nombre+`">`+dato.nombre+`</option>`;
    datosHtml = datosHtml + datoIndividial;
    });
    datosHtml = datosHtml + `</select>`;
    $('#coop').html(datosHtml);
});

//asistentes
asistenteCollection.on('value',function(asis){
    var datosHtml = `<option value="" disabled="disabled" selected="true">Seleccionar asistente</option>`;
    asis.forEach(function(firebaseDatosReference){
    var dato = firebaseDatosReference.val();
    console.log(dato); 
    var datoIndividial =`<option value="`+dato.nombre+`">`+dato.nombre+`</option>`;
    datosHtml = datosHtml + datoIndividial;
    });
    datosHtml = datosHtml + `</select>`;
    $('#asop').html(datosHtml);
});


//-----------------------------------------------

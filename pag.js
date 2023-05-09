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

// pagos--------------------------------------------------------------------------------------------

var firebaseDatosCollection = database.ref().child('pagos');

//conteo de referencias
var parf;
var parfu;
firebaseDatosCollection.on('value',function(nopagos){
    parf=0;
    nopagos.forEach(function(firebaseDatosReference){
        var dato = firebaseDatosReference.val();
        console.log(dato);
        parf=parf+1;
    });
    parfu=parf;
    var refHTML =`: `+parfu+`<br>`;
    document.getElementById('ref').innerHTML=refHTML;
});

function guardar(){
    // CON EL METODO update SI EXISTE LA MATRICULA LA actualiza
    // Y SI NO EXISTE AGREGA EL CHILD NUEVO CON LOS datos COMO SI FUERA push EN A BD
    var dato1 = {
        folio: parfu, //otra forma es $('#myForm [name="fullname"]').
        fecha:  f2,//$('#dt').val(),
        pago: $('#tipo option:selected').text(),
        atleta: $('#atop option:selected').text(),
        receptor: $('#recept option:selected').text()
        //vencimiento: end,    
    };
    if($('#atop option:selected').text() != "Selecciona al atleta" 
    && $('#tipo option:selected').text() != "Seleccionar concepto"
    && $('#recept option:selected').text() != "Seleccionar receptor")
    {
        firebaseDatosCollection.child(parfu).update(dato1);
    }
};

//pagos de hoy
var todayPostsRef = database.ref('pagos'); //.child('').equalTo()
todayPostsRef.on('value',function(pagos){
    var datosHtml = `<table class="table table-borderless table-dark">
                    <thead><tr>
                            <th scope='col'>FOLIO</th>
                            <th scope='col'>FECHA</th>
                            <th scope='col'>CONCEPTO</th>
                            <th scope='col'>ATLETA</th>
                            <th scope='col'>RECEPTOR</th>

                            <th scope='col'>ACCIONES</th>
                            </tr></thead><tbody>`;
    pagos.forEach(function(firebaseDatosReference){
    var dato = firebaseDatosReference.val();
    console.log(dato);
    if(dato.fecha == f2){
        var datoIndividial =`<tr><th scope="row">`+dato.folio+`</th>
                             <td>`+dato.fecha+`</td>
                             <td>`+dato.pago+`</td>
                             <td>`+dato.atleta+`</td>
                             <td>`+dato.receptor+`</td>

                             <td>
                                <button class="btn btn-danger" id="boton" 
                                onclick="borrar('`+dato.folio+`')">ELIMINAR</button>
                              </td>
                             </tr>`;
    datosHtml = datosHtml + datoIndividial;
    }
    });
    datosHtml = datosHtml + `</tbody></table>`;
    $('#tpagos').html(datosHtml);
});

//----------------------------------------------------------------------------------------------

//listas----------------------------------------------------------------------------------------
var atletaCollection = database.ref().child('atleta');  //'+atl+'/nombre'); //var atl;
var coachCollection = database.ref().child('coach');    //'+coa+'/nombre'); //var ;
var conceptosCollection = database.ref().child('conceptos'); //'+conc+'/nombre'); //var ;
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

//conceptos
var conceptCollection = database.ref('conceptos') //.child();
conceptCollection.on('value',function(ty){
    var tiposHTML = `<option value="" disabled="disabled" selected="true">Seleccionar concepto</option>`;
    ty.forEach(function(Reference){
    var tipos = Reference.val();
    console.log(tipos); 
    var tiposIndividial =`<option value="`+tipos.descripcion+`">`+tipos.descripcion+`- $`+tipos.cantidad+`.00</option>`;
    tiposHTML = tiposHTML + tiposIndividial
    });
    tiposHTML = tiposHTML + `</select>`;
    $('#tipo').html(tiposHTML);
});

//receptor
var datosHtmlu;
coachCollection.on('value',function(coach){
    datosHtmlu = `<option value="" disabled="disabled" selected="true">Seleccionar receptor</option>`;
    coach.forEach(function(firebaseDatosReference){
    var dato = firebaseDatosReference.val();
    console.log(dato); 
    var datoIndividial =`<option value="`+dato.nombre+`">`+dato.nombre+`</option>`;
    datosHtmlu = datosHtmlu + datoIndividial;
    });
});
asistenteCollection.on('value',function(asis){
    asis.forEach(function(firebaseDatosReference){
    var dato = firebaseDatosReference.val();
    console.log(dato); 
    var datoIndividial =`<option value="`+dato.nombre+`">`+dato.nombre+`</option>`;
    datosHtmlu = datosHtmlu + datoIndividial;
    });
    datosHtmlu = datosHtmlu + `</select>`;
    document.getElementById('recept').innerHTML=datosHtmlu;
});



//date------------------------------------------------------------------------------------------
var  today = new Date();               
var m = today.getMonth() + 1;
var d= today.getDate();               
var mes = (m < 10) ? '0' + m : m;
var dia = (d < 10) ? '0' + d : d;
var y=today.getFullYear();
var f=dia+'/'+mes+'/'+y;
var f2=y+'-'+mes+'-'+dia;

var fm = m; fy =y;
if(fm < 12){
    fm = m + 1;
}else{
    fm=1;
    fy= y + 1;
}
var fmes = (fm < 10) ? '0' + fm : fm; 
var end= fy+'-'+mes+'-'+dia;
document.getElementById('date').innerHTML=f;

//----------------------------------------------------------------------------------------------

//filtro----------------------------------------------------------------------------------------
function validate(){
    if ($('#dt').val() == "") {
        alert("selecciona una fecha", "alerta");   
    }
    else{
        filtrarfecha(); 
    }
}

function filtrarfecha(){
    firebaseDatosCollection.on('value',function(pagos){
        var datosHtml = `<table class="table table-borderless table-dark">
                        <thead><tr>
                                <th scope='col'>FOLIO</th>
                                <th scope='col'>FECHA</th>
                                <th scope='col'>CONCEPTO</th>
                                <th scope='col'>ATLETA</th>
                                <th scope='col'>RECEPTOR</th>

                                <th scope='col'>ACCIONES</th>
                                </tr></thead><tbody>`;
        pagos.forEach(function(firebaseDatosReference){
        var dato = firebaseDatosReference.val();
        console.log(dato);
        if(dato.fecha == $('#dt').val()){
            var datoIndividial =`<tr><th scope="row">`+dato.folio+`</th>
                                <td>`+dato.fecha+`</td>
                                <td>`+dato.pago+`</td>
                                <td>`+dato.atleta+`</td>
                                <td>`+dato.receptor+`</td>

                                <td>
                                    <button class="btn btn-danger" id="boton" 
                                    onclick="borrar('`+dato.folio+`')">ELIMINAR</button>
                                </td>
                                </tr>`;
        datosHtml = datosHtml + datoIndividial;
        }
        });
        datosHtml = datosHtml + `</tbody></table>`;
        $('#tpagos').html(datosHtml);
    });
}
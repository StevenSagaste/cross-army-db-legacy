   // Your web app's Firebase configuration
   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // Your web app's Firebase configuration
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
  var firebaseDatosCollectionZ = database.ref().child('conceptos');

     function guardar(){
      
        var dato1 = {
            descripcion: $('#tipo option:selected').text(), //otra forma es $('#myForm [name="fullname"]').
            cantidad: $('#cantidad').val(),
        };
        // CON EL METODO update SI EXISTE LA MATRICULA LA actualiza
       // Y SI NO EXISTE AGREGA EL CHILD NUEVO CON LOS datos COMO SI FUERA push EN A BD
       firebaseDatosCollectionZ.child($('#tipo option:selected').text()).update(dato1);
      };

     //CREA  'listener' 
    firebaseDatosCollectionZ.on('value',function(coach){
    var datosHtml = `<table class="table table-borderless table-dark">
                    <thead><tr>
                            <th scope='col'>CONCEPTO</th>
                            <th scope='col'>CANTIDAD</th>
                            <th scope='col'>ACCIONES</th>
                            </tr></thead><tbody>`;
    coach.forEach(function(firebaseDatosReference){
    var dato = firebaseDatosReference.val();
    console.log(dato); 
    var datoIndividial =`<tr><th scope="row">`+dato.descripcion+`</th>
                             <td>`+dato.cantidad+`</td>
                             
                             <td>
                                <button class="btn btn-danger" id="boton" 
                                onclick="borrar('`+dato.descripcion+`')">BORRAR</button>
                                <button class="btn btn-warning" id="boton" 
                                onclick="editar('`+dato.descripcion+`')">EDITAR</button>
                              </td>
                             </tr>`;
    datosHtml = datosHtml + datoIndividial;
    });
    datosHtml = datosHtml + `</tbody></table>`;
    $('#tpag').html(datosHtml);
});
function borrar(pla)
  {
    alert("intento de borrar "+pla);
    // APUNTAMOS LA REFERENCIA EN LA BASE DE DATOS DE LA PLACA EN LA COLECCION autos
    let autosRef = this.database.ref('conceptos/'+pla)
    //ELIMINAMOS EL CHILD DE LA REFERENCIA
    autosRef.remove();
  };
  function editar(pla)
  {
    alert("VAMOS A EDITAR "+pla);
    //PONEMOS LA PLACA RECIBIDA COMO VALOR EN LA CASILLA IDENTIDICADA COMO #placa
    $('#tipo option:selected').text(pla);
    //A TRAVES DE UN promise CONSULTAMOS UN CHILD DE LA BD
    // Y LO TRAEMOS COMO UN instantanea AL FORMULARIO
    database.ref('conceptos/'+pla).once("value").then(function(snapshot){
      $('#cantidad').val(snapshot.val().cantidad);
    }); 
  };

  firebaseDatosCollectionZ.on('value',function(ty){
    var tiposHTML = `<option value="" disabled="disabled" selected="true">Selecciona concepto</option>`;
    ty.forEach(function(Reference){
    var tipos = Reference.val();
    console.log(tipos); 
    var tiposIndividial =`<option value="`+tipos.descripcion+`">`+tipos.descripcion+`</option>`;
    tiposHTML = tiposHTML + tiposIndividial
    });
    tiposHTML = tiposHTML + `<option value="otro">Otro</option></select>`;
    $('#tipo').html(tiposHTML);
    });

function nuevo_concepto(){
    if($('#tipo option:selected').text() == 'Otro'){
        document.getElementById('agg').style.display = 'block';
        document.getElementById('boton').style.display = 'none';
        document.getElementById('co').style.display = 'none';
        document.getElementById('oculto1').style.display = 'block';
    }   
}
function ocultar(){
    document.getElementById('agg').style.display = 'none';
    document.getElementById('oculto1').style.display = 'none';
    document.getElementById('boton').style.display = 'block';
    document.getElementById('co').style.display = 'block';
}
function agregar(){
      
    var dato1 = {
        descripcion: $('#otro').val(), //otra forma es $('#myForm [name="fullname"]').
        cantidad: $('#cantidad2').val(),
    };
    // CON EL METODO update SI EXISTE LA MATRICULA LA actualiza
   // Y SI NO EXISTE AGREGA EL CHILD NUEVO CON LOS datos COMO SI FUERA push EN A BD
   firebaseDatosCollectionZ.child($('#otro').val()).update(dato1);
};
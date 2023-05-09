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
  var firebaseDatosCollection = database.ref().child('asistencias');

     function guardar(){
      
        var dato1 = {
            clave: $('#clave').val(), //otra forma es $('#myForm [name="fullname"]').
            coach: $('#coach').val(),
            asistente: $('#asistente').val(),
            fecha: $('#date').val(),
            hora: $('#time').val(),
            atleta: $('#atleta').val(),
            turno: $('#turno').val(),
            
        };
        // CON EL METODO update SI EXISTE LA MATRICULA LA actualiza
       // Y SI NO EXISTE AGREGA EL CHILD NUEVO CON LOS datos COMO SI FUERA push EN A BD
       firebaseDatosCollection.child($('#clave').val()).update(dato1);
      };

     //CREA  'listener' 
    firebaseDatosCollection.on('value',function(asistencias){
    var datosHtml = `<table class="table table-borderless table-dark">
                    <thead><tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>COACH</th>
                            <th scope='col'>ASISTENTE</th>
                            <th scope='col'>FECHA</th>
                            <th scope='col'>HORA</th>
                            <th scope='col'>ATLETA</th>
                            <th scope='col'>TURNO</th>
                            </tr></thead><tbody>`;
    asistencias.forEach(function(firebaseDatosReference){
    var dato = firebaseDatosReference.val();
    console.log(dato); 
    var datoIndividial =`<tr><th scope="row">`+dato.clave+`</th>
                             <td>`+dato.coach+`</td>
                             <td>`+dato.asistente+`</td>
                             <td>`+dato.fecha+`</td>
                             <td>`+dato.hora+`</td>
                             <td>`+dato.atleta+`</td>
                             <td>`+dato.turno+`</td>
                             <td>
                                <button class="btn btn-danger" id="boton" 
                                onclick="borrar('`+dato.clave+`')">ELIMINAR</button>
                                <button class="btn btn-warning" id="boton" 
                                onclick="editar('`+dato.clave+`')">EDITAR</button>
                              </td>
                             </tr>`;
    datosHtml = datosHtml + datoIndividial;
    });
    datosHtml = datosHtml + `</tbody></table>`;
    $('#tasistencias').html(datosHtml);
});
function borrar(pla)
  {
    alert("intento de borrar "+pla);
    // APUNTAMOS LA REFERENCIA EN LA BASE DE DATOS DE LA PLACA EN LA COLECCION autos
    let autosRef = this.database.ref('asistencias/'+pla)
    //ELIMINAMOS EL CHILD DE LA REFERENCIA
    autosRef.remove();
  };
  function editar(pla)
  {
    alert("VAMOS A EDITAR "+pla);
    //PONEMOS LA PLACA RECIBIDA COMO VALOR EN LA CASILLA IDENTIDICADA COMO #placa
    $('#clave').val(pla);
    //A TRAVES DE UN promise CONSULTAMOS UN CHILD DE LA BD
    // Y LO TRAEMOS COMO UN instantanea AL FORMULARIO
    database.ref('asistencias/'+pla).once("value").then(function(snapshot){
      $('#coach').val(snapshot.val().coach); 
      $('#asistente').val(snapshot.val().asistente);
      $('date').val(snapshot.val().fecha);
      $('#time').val(snapshot.val().hora);
      $('#atleta').val(snapshot.val().atleta);
      $('#turno').val(snapshot.val().turno);
    }); 
  };

  /* DIRECCION
  direccion: $('#direccion').val(),
  <th scope='col'>DIRECCION</th>
  <td>`+dato.direccion+`</td>
  $('#direccion').val(snapshot.val().direccion);
   */
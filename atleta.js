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
var firebaseDatosCollection = database.ref().child('atleta');

var atrf;
var atrfu;
firebaseDatosCollection.on('value',function(noatletas){
    atrf=0;
    noatletas.forEach(function(firebaseDatosReference){
        var dato = firebaseDatosReference.val();
        console.log(dato);
        atrf=atrf+1;
    });
    atrfu=atrf;
    var refHTML =`: `+atrfu+`<br>`;
    document.getElementById('clave').innerHTML=refHTML;
});

function guardar(){

  var dato1 = {
      clave: atrfu, //otra forma es $('#myForm [name="fullname"]').
      nombre: $('#nombre').val(),
      telefono: $('#telefono').val(),
  };
  // CON EL METODO update SI EXISTE LA MATRICULA LA actualiza
  // Y SI NO EXISTE AGREGA EL CHILD NUEVO CON LOS datos COMO SI FUERA push EN A BD
  firebaseDatosCollection.child(atrfu).update(dato1);
};


    //CREA  'listener' 
firebaseDatosCollection.on('value',function(atleta){
  var datosHtml = `<table class="table table-borderless table-dark">
                  <thead><tr>
                          <th scope='col'>ID</th>
                          <th scope='col'>NOMBRE</th>
                          
                          <th scope='col'>TELEFONO</th>
                          <th scope='col'>ACCIONES</th>
                          </tr></thead><tbody>`;
  atleta.forEach(function(firebaseDatosReference){
  var dato = firebaseDatosReference.val();
  console.log(dato); 
  var datoIndividial =`<tr><th scope="row">`+dato.clave+`</th>
                            <td>`+dato.nombre+`</td>
                            
                            <td>`+dato.telefono+`</td>
                            <td>
                              <button class="btn btn-danger" id="boton" 
                              onclick="borrar('`+dato.clave+`')">BORRAR</button>
                              <button class="btn btn-warning" id="boton" 
                              onclick="editar('`+dato.clave+`')">EDITAR</button>
                            </td>
                            </tr>`;
  datosHtml = datosHtml + datoIndividial;
  });
  datosHtml = datosHtml + `</tbody></table>`;
  $('#tatleta').html(datosHtml);
});

function borrar(pla)
{
  alert("intento de borrar "+pla);
  // APUNTAMOS LA REFERENCIA EN LA BASE DE DATOS DE LA PLACA EN LA COLECCION autos
  let autosRef = this.database.ref('atleta/'+pla)
  //ELIMINAMOS EL CHILD DE LA REFERENCIA
  autosRef.remove();
};

function editar(pla)
{
  alert("VAMOS A EDITAR "+pla);
  //PONEMOS LA PLACA RECIBIDA COMO VALOR EN LA CASILLA IDENTIDICADA COMO #placa
  $('#id').val(pla);
  //A TRAVES DE UN promise CONSULTAMOS UN CHILD DE LA BD
  // Y LO TRAEMOS COMO UN instantanea AL FORMULARIO
  database.ref('atleta/'+pla).once("value").then(function(snapshot){
    $('#nombre').val(snapshot.val().nombre); 
    
    $('#telefono').val(snapshot.val().telefono);
  });
  document.getElementById('botong').style.display = 'none';
  document.getElementById('idsect').style.display = 'block';
  document.getElementById('save').style.display = 'block';
};

function SaveEdit(){
  var dato2 = {
    clave: $('#id').val(), //otra forma es $('#myForm [name="fullname"]').
    nombre: $('#nombre').val(),
    telefono: $('#telefono').val(),
  };
  // CON EL METODO update SI EXISTE LA MATRICULA LA actualiza
  // Y SI NO EXISTE AGREGA EL CHILD NUEVO CON LOS datos COMO SI FUERA push EN A BD
  firebaseDatosCollection.child($('#id').val()).update(dato2);
  document.getElementById('idsect').style.display = 'none';
  document.getElementById('save').style.display = 'none';
  document.getElementById('botong').style.display = 'block';
}

/* DIRECCION
direccion: $('#direccion').val(),
<th scope='col'>DIRECCION</th>
<td>`+dato.direccion+`</td>
$('#direccion').val(snapshot.val().direccion);

firebaseDatosCollection.on('value',function(atleta){
  var datosHtml = `<option value="" disabled="disabled" selected="true">Selecciona concepto</option>`;
  atleta.forEach(function(firebaseDatosReference){
  var dato = firebaseDatosReference.val();
  console.log(dato); 
  var datoIndividial =`<option value="`+dato.nombre+`">`+dato.nombre+`</option>`;
  datosHtml = datosHtml + datoIndividial;
  });
  $('#tipo').html(datosHtml);
});

*/

  
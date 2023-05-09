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
var firebaseDatosCollection = database.ref().child('asistente');

var asrf;
var asrfu;
firebaseDatosCollection.on('value',function(noasis){
    asrf=0;
    noasis.forEach(function(firebaseDatosReference){
        var dato = firebaseDatosReference.val();
        console.log(dato);
        asrf=asrf+1;
    });
    asrfu=asrf;
    var refHTML =`: `+asrfu+`<br>`;
    document.getElementById('clave').innerHTML=refHTML;
});

function guardar(){

  var dato1 = {
      clave: asrfu, //otra forma es $('#myForm [name="fullname"]').
      nombre: $('#nombre').val(),
      direccion: $('#direccion').val(),
      telefono: $('#telefono').val(),
  };
  // CON EL METODO update SI EXISTE LA MATRICULA LA actualiza
  // Y SI NO EXISTE AGREGA EL CHILD NUEVO CON LOS datos COMO SI FUERA push EN A BD
  firebaseDatosCollection.child(asrfu).update(dato1);
};

  //CREA  'listener' 
firebaseDatosCollection.on('value',function(asistente){
var datosHtml = `<table class="table table-borderless table-dark">
                <thead><tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>NOMBRE</th>
                        <th scope='col'>DIRECCION</th>
                        <th scope='col'>TELEFONO</th>
                        <th scope='col'>ACCIONES</th>
                        </tr></thead><tbody>`;
asistente.forEach(function(firebaseDatosReference){
var dato = firebaseDatosReference.val();
console.log(dato); 
var datoIndividial =`<tr><th scope="row">`+dato.clave+`</th>
                          <td>`+dato.nombre+`</td>
                          <td>`+dato.direccion+`</td>
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
  $('#tasistente').html(datosHtml);
});
function borrar(pla)
{
  alert("intento de borrar "+pla);
  // APUNTAMOS LA REFERENCIA EN LA BASE DE DATOS DE LA PLACA EN LA COLECCION autos
  let autosRef = this.database.ref('asistente/'+pla)
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
  database.ref('asistente/'+pla).once("value").then(function(snapshot){
    $('#nombre').val(snapshot.val().nombre); 
    $('#direccion').val(snapshot.val().direccion);
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
function miperfil() {
  const cuerpo = document.getElementById('cuerpo');
  cuerpo.innerHTML = '';

  const contenidoTabs = `
    <div class='d-flex justify-content-center'>
      <ul class="nav nav-tabs" id="perfilTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="datos-tab" data-bs-toggle="tab" data-bs-target="#datos" type="button" role="tab" aria-controls="datos" onclick="document.getElementById('mensajes').innerHTML = '' aria-selected="true">Datos</button>
        </li>
        <li class="nav-item" role="presentation">
        <button class="nav-link" id="actividad-tab" data-bs-toggle="tab" data-bs-target="#actividad" type="button" role="tab" aria-controls="actividad" aria-selected="false" onclick="document.getElementById('mensajes').innerHTML = ''">Mi Actividad</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="seguridad-tab" data-bs-toggle="tab" data-bs-target="#seguridad" type="button" role="tab" aria-controls="seguridad" onclick="document.getElementById('mensajes').innerHTML = '' aria-selected="false">Seguridad</button>
        </li>
      </ul>
    </div>
    <div class="tab-content mt-3" id="perfilTabsContent"></div>
  `;

  cuerpo.innerHTML = contenidoTabs;

  const datosXhr = new XMLHttpRequest();
  datosXhr.open('POST', 'php/datos.php', true);
  const data2 = new FormData();
  data2.append('usuario', document.getElementById('nombre').innerText);
  datosXhr.send(data2);

  datosXhr.onload = function () {
    const datos = JSON.parse(datosXhr.responseText);

    const contenidoDatos = `
      <div class="m-5 tab-pane fade show active" id="datos" role="tabpanel" aria-labelledby="datos-tab">
        <h4 class="text-danger fw-bold mb-4 d-flex justify-content-center">📝 Datos</h4>
        <form>
          <div class="mb-3">
            <label class="form-label">Nombre y apellidos</label>
            <input type="text" id="inputnombreape" class="form-control" value="${datos[0].nombreape}">
          </div>
          <div class="mb-3">
            <label class="form-label">Correo</label>
            <input type="email" id="inputcorreo" class="form-control" value="${datos[0].correo}">
          </div>
          <div class="mb-3">
            <label class="form-label">Teléfono</label>
            <input type="tel" id="inputel" class="form-control" value="${datos[0].telefono}">
          </div>
          <div class="mb-3">
            <label class="form-label">Dirección</label>
            <input type="text" id="inputdireccion" class="form-control" value="${datos[0].direccion}">
          </div>
          <div class="text-center">
            <button type="button" id="btnguardar" onclick="actualizardatos()" class="btn btn-save m-5">Guardar</button>
          </div>
        </form>
      </div>`;

    document.getElementById('perfilTabsContent').innerHTML += contenidoDatos;

    const actXhr = new XMLHttpRequest();
    actXhr.open('POST', 'php/miactividad.php', true);
    const data = new FormData();
    data.append('usuario', document.getElementById('nombre').innerText);
    actXhr.send(data);

    actXhr.onload = function () {
      const actividad = JSON.parse(actXhr.responseText);
const platoFavorito = actividad.plato_mas_pedido?.Plato ?? "Aún no tienes un plato favorito, ¡Prueba algo delicioso hoy!";
const ultimoPedido = actividad.ultimo_pedido ?? "Aún no has hecho pedidos, ¿qué esperas para disfrutar?";
const primerLogin = actividad.primer_login ?? "¡Bienvenido! Esperamos que disfrutes tu primera visita.";
const totalPedidos = actividad.total_pedidos ?? 0;
const fraseTotalPedidos = totalPedidos === 0 
  ? "Aún no has realizado ningún pedido. ¡Es hora de probar nuestra carta!" 
  : `Has realizado ${totalPedidos} pedido(s). ¡Gracias por confiar en nosotros!`;


      const contenidoActividad = `
        <div style="margin:60px" class="tab-pane fade" id="actividad" role="tabpanel" aria-labelledby="actividad-tab">
          <h4 class="text-danger fw-bold mb-5 d-flex justify-content-center">📊 Mi Actividad</h4>
          <div class="row">
            <div  class="col-md-6 mb-3" >
              <div style="background-color: #fff5f5" class="p-3 border rounded  shadow-sm">
                <h5 style="color: #B22222">🍣 Plato Favorito</h5>
                <p>${platoFavorito}</p>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div style="background-color: #fff5f5" class="p-3 border rounded  shadow-sm">
                <h5 style="color: #B22222">📅 Fecha de tu último pedido</h5>
                <p>${ultimoPedido}</p>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div style="background-color: #fff5f5" class="p-3 border rounded  shadow-sm">
                <h5 style="color: #B22222">🕒 Tu primera visita</h5>
                <p>${primerLogin}</p>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div style="background-color: #fff5f5" class="p-3 border rounded  shadow-sm">
                <h5 style="color: #B22222">🚚 Pedidos realizados</h5>
                <p>${totalPedidos}</p>
              </div>
            </div>
          </div>
        </div>`;

      const contenidoSeguridad = `
        <div class="m-5 tab-pane fade" id="seguridad" role="tabpanel" aria-labelledby="seguridad-tab">
          <h4 class="text-danger fw-bold mb-4 d-flex justify-content-center">🔒 Seguridad</h4>
          <form>
            <div class="mb-3">
              <label  class="form-label">Contraseña actual</label>
              <input id="inputcontraseñactual" type="password" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">Nueva contraseña</label>
              <input id="inputnuevacontraseña" type="password" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">Confirmar nueva contraseña</label>
              <input id="inputconfirmarcontraseña" type="password" class="form-control">
            </div>
            <div class="text-center">
              <button type="button" onclick="actualizarcontraseña()" id="btnactualizar" class="m-5 btn btn-save">Actualizar Contraseña</button>
            </div>
          </form>
        </div>`;
      let divmensajes="<div class='d-flex justify-content-center' id='mensajes'></div>";
      document.getElementById('perfilTabsContent').innerHTML += contenidoActividad + contenidoSeguridad+ divmensajes;
    };
  };
}

function actualizardatos() {
  document.getElementById("mensajes").innerHTML=""
let nombreape = document.getElementById("inputnombreape").value;
let correo = document.getElementById("inputcorreo").value;
let telefono = document.getElementById("inputel").value;
let direccion = document.getElementById("inputdireccion").value;
let usuario = document.getElementById("nombre").innerText;
let xhr = new XMLHttpRequest();
xhr.open("POST", "php/actualizardatos.php", true);
if (nombreape == "" || correo == "" || telefono == "" || direccion == "") {
      document.getElementById("mensajes").innerHTML="Por favor, completa todos los campos.";
      document.getElementById("mensajes").style.color="red";
      document.getElementById("mensajes").style.fontSize="30px";
  
}else{
  let data = new FormData();
  data.append("nombreape", nombreape);
  data.append("correo", correo);
  data.append("telefono", telefono);
  data.append("direccion", direccion);
  data.append("usuario", usuario);
  xhr.send(data);

  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("mensajes").innerHTML="Datos actualizados correctamente.";
      document.getElementById("mensajes").style.color="green";
      document.getElementById("mensajes").style.fontSize="30px";
    } else {
document.getElementById("mensajes").innerHTML="Error al actualizar los datos.";
      document.getElementById("mensajes").style.color="red";
      document.getElementById("mensajes").style.fontSize="30px";    }
  };
}
}
function actualizarcontraseña() {
  document.getElementById("mensajes").innerHTML=""
  let contrasenaActual = document.getElementById("inputcontraseñactual").value;
  let nuevaContrasena = document.getElementById("inputnuevacontraseña").value;
  let confirmarContrasena = document.getElementById("inputconfirmarcontraseña").value;
  let usuario = document.getElementById("nombre").innerText;

  if (contrasenaActual == "" || nuevaContrasena == "" || confirmarContrasena == "") {
    document.getElementById("mensajes").innerHTML="Por favor, completa todos los campos.";
      document.getElementById("mensajes").style.color="red";
      document.getElementById("mensajes").style.fontSize="30px";
    
  } else if (nuevaContrasena !== confirmarContrasena) {
    document.getElementById("mensajes").innerHTML="Las contraseñas no coinciden.";
      document.getElementById("mensajes").style.color="red";
      document.getElementById("mensajes").style.fontSize="30px";
  } else {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/actualizarcontraseña.php", true);
    let data = new FormData();
    data.append("contraseñactual", contrasenaActual);
    data.append("nuevacontraseña", nuevaContrasena);
    data.append("usuario", usuario);
    xhr.send(data);
    xhr.onload = function () {
     let response = xhr.responseText;
     if(response =="Contraseña actualizada correctamente"){
      document.getElementById("mensajes").innerHTML="Contraseña actualizada correctamente.";
      document.getElementById("mensajes").style.color="green";
      document.getElementById("mensajes").style.fontSize="30px";
      document.getElementById("inputcontraseñactual").value=""
      document.getElementById("inputnuevacontraseña").value=""
      document.getElementById("inputconfirmarcontraseña").value=""
    }else if(response == "Contraseña actual incorrecta"){
      document.getElementById("mensajes").innerHTML="La contraseña actual es incorrecta.";
      document.getElementById("mensajes").style.color="red";
      document.getElementById("mensajes").style.fontSize="30px";
  }
}
  }
}
document.getElementById("perfil").addEventListener("click", miperfil);
 
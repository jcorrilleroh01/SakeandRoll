function admin() {
  document.getElementById("usuario").src = "img/admin.png";
  document.getElementById("carro").style.display = "none";
  document.getElementById("casa").style.display = "none";
  document.getElementById("usuario").removeEventListener("click", login);
  document.getElementById("usuario").addEventListener("click", modalsesion);
  document.getElementById("contador-carrito").style.display = "none";
  document.getElementById("logo").removeEventListener("click", contenido);

  cuerpo.innerHTML = `
    <div class="container-fluid mt-4">
      <h2 class="mb-4 text-center">Panel de Administración – Sake&Roll</h2>
      <div class="row g-4">
        <!-- Reservas -->
        <div class="col-12">
          <div class="card shadow rounded">
            <div class="card-header bg-dark text-white text-center">
              <h4>Reservas</h4>
            </div>
            <div class="card-body p-2">
              <table class="table table-bordered table-striped table-hover">
                <thead class="table-dark text-center">
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Personas</th>
                    <th>Mesa</th>
                    <th>Usuario</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaReservas"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Usuarios -->
        <div class="col-12">
          <div class="card shadow rounded">
            <div class="card-header bg-dark text-white text-center">
              <h4>Usuarios</h4>
            </div>
            <div class="card-body p-2">
              <table class="table table-bordered table-striped table-hover">
                <thead class="table-dark text-center">
                  <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaUsuarios"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  cargarReservas();
  cargarUsuarios();
}

function cargarReservas() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "php/reservas.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const datos = JSON.parse(xhr.responseText);
      const tabla = document.getElementById("tablaReservas");
      tabla.innerHTML = "";
      datos.forEach(res => {
        crearFila(res, tabla, "reservas");
      });
    }
  };
  xhr.send();
}

function cargarUsuarios() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "php/usuarios.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const datos = JSON.parse(xhr.responseText);
      const tabla = document.getElementById("tablaUsuarios");
      tabla.innerHTML = "";
      datos.forEach(usu => {
        crearFila(usu, tabla, "usuarios");
      });
    }
  };
  xhr.send();
}

function crearFila(obj, tabla, tipo) {
  const tr = document.createElement("tr");
  tr.dataset.tipo = tipo;
  tr.dataset.id = obj.id;

  const campos = tipo === "reservas"
    ? ["id", "fecha", "hora", "personas", "mesa", "usuario"]
    : ["id", "usuario", "nombre", "correo", "telefono", "direccion"];

  campos.forEach(clave => {
    const td = document.createElement("td");
    td.textContent = obj[clave];
    tr.appendChild(td);
  });

  const tdAcciones = document.createElement("td");
  tdAcciones.classList.add("text-center");

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar";
  btnEditar.className = "btn btn-warning btn-sm me-1";
  btnEditar.onclick = () => editarFila(tr);

  const btnGuardar = document.createElement("button");
  btnGuardar.textContent = "Guardar";
  btnGuardar.className = "btn btn-success btn-sm me-1 d-none";
  btnGuardar.onclick = () => guardarFila(tr, obj.id, tipo);

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Borrar";
  btnEliminar.className = "btn btn-danger btn-sm";
  btnEliminar.onclick = () => eliminarFila(tr, obj.id, tipo);

  tdAcciones.append(btnEditar, btnGuardar, btnEliminar);
  tr.appendChild(tdAcciones);
  tabla.appendChild(tr);
}

function editarFila(tr) {
  const celdas = tr.querySelectorAll("td:not(:last-child)");
  celdas.forEach((td, index) => {
    if (index === 0) return; // ID no editable
    const input = document.createElement("input");
    input.type = "text";
    input.value = td.textContent;
    input.className = "form-control form-control-sm";
    td.textContent = "";
    td.appendChild(input);
  });
  toggleBotones(tr, true);
}

function guardarFila(tr, id, tipo) {
  const inputs = tr.querySelectorAll("td input");
  const valores = Array.from(inputs).map(input => input.value);

  const campos = tipo === "reservas"
    ? ["fecha", "hora", "personas", "mesa", "usuario"]
    : ["usuario", "nombre", "correo", "telefono", "direccion"];

  let datos = `id=${id}`;
  campos.forEach((campo, i) => {
    datos += `&${campo}=${valores[i]}`;
  });

  const xhr = new XMLHttpRequest();
  xhr.open("POST", tipo === "reservas" ? "php/editar_reserva.php" : "php/editar_usuario.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.status === 200) {
      if (tipo === "reservas") {
        cargarReservas();
      } else {
        cargarUsuarios();
      }
    }
  };
  xhr.send(datos);
}

function eliminarFila(tr, id, tipo) {
  modalborrar(function (confirmado) {
    if (!confirmado) return;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", tipo === "reservas" ? "php/borrar_reserva.php" : "php/borrar_usuario.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      if (xhr.status === 200) {
        if (tipo === "reservas") {
          cargarReservas();
        } else {
          cargarUsuarios();
        }
      }
    };
    xhr.send(`id=${id}`);
  });
}

function toggleBotones(tr, editando) {
  const [btnEditar, btnGuardar] = tr.querySelectorAll("button");
  btnEditar.classList.toggle("d-none", editando);
  btnGuardar.classList.toggle("d-none", !editando);
}

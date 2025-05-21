function misreservas() {
  cuerpo.innerHTML = "";

  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.margin = '15px';
  wrapper.style.flexWrap = 'wrap';
  wrapper.style.gap = '1%';

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "php/misreservas.php", true);

  const data = new FormData();
  data.append("usuario", document.getElementById("nombre").innerText);
  xhr.send(data);

  xhr.onload = function () {
    let h1 = document.createElement('h1');
    h1.innerHTML = "Mis Reservas";
    h1.style.color = '#B22222';
    h1.style.textAlign = 'center';
    h1.style.marginBottom = '20px';
    h1.style.fontSize = '40px';
    h1.style.fontWeight = 'bold';
    h1.style.margin = '20px';
    cuerpo.appendChild(h1);

    const reservas = JSON.parse(xhr.responseText);
    reservas.forEach(reserva => {
      const tarjeta = document.createElement('div');
      tarjeta.className = 'tarjeta';

      const info = document.createElement('div');
      info.className = 'info';
      info.innerHTML = `
        <div class="fila"><img src="img/calendario.svg" width="18"> <span>${reserva.Fecha}</span></div>
        <div class="fila"><img src="img/reloj.svg" width="18"> <span>${reserva.Hora}</span></div>
        <div class="fila"><img src="img/personas.svg" width="18"> <span>${reserva.Npersonas} personas</span></div>
      `;

      const editar = document.createElement('div');
      editar.className = 'editar';
      editar.innerHTML = `
        <input type="date" class="fechareserva" value="${reserva.Fecha}">
        <input type="time" class="horareserva" value="${reserva.Hora}">
        <input type="number" class="npersonasreserva" min="1" value="${reserva.Npersonas}">
      `;

      const acciones = document.createElement('div');
      acciones.className = 'acciones';

      const btnEditar = document.createElement('button');
      btnEditar.className = 'editar-btn';
      btnEditar.textContent = 'Editar';
      btnEditar.onclick = () => tarjeta.classList.toggle('editando');

      const btnGuardar = document.createElement('button');
      btnGuardar.className = 'guardar-btn';
      btnGuardar.textContent = 'Guardar';
      btnGuardar.onclick = () => {
        const fecha = tarjeta.querySelector(".fechareserva").value;
        const hora = tarjeta.querySelector(".horareserva").value;
        const npersonas = tarjeta.querySelector(".npersonasreserva").value;
          tarjeta.classList.remove('editando');

        actualizarReserva(fecha, hora, npersonas, reserva.Idreserva);
      };

      acciones.appendChild(btnEditar);
      acciones.appendChild(btnGuardar);

      tarjeta.appendChild(info);
      tarjeta.appendChild(editar);
      tarjeta.appendChild(acciones);

      wrapper.appendChild(tarjeta);
    });

    cuerpo.appendChild(wrapper);
    let mensajeError = document.createElement('div');
    mensajeError.id = 'mensajeError';
    mensajeError.style.color = 'red';
    mensajeError.style.marginTop = '10px';
    mensajeError.className="d-flex justify-content-center";
    mensajeError.style.fontSize = '25px';
    mensajeError.style.fontWeight = 'bold';
    mensajeError.style.margin="20px"
    cuerpo.appendChild(mensajeError);
  }
}

function actualizarReserva(fecha, hora, npersonas, idreserva) {
  let mensajeError = document.getElementById('mensajeError');
  mensajeError.innerHTML = ""; 
  let ahora = new Date();
  let añohoy = ahora.getFullYear();
  let meshoy = ahora.getMonth() + 1;
  let díahoy = ahora.getDate();
  let [año, mes, dia] = fecha.split("-");
  const [horas, minutos] = hora.split(":");

  if (año < añohoy || (año == añohoy && mes < meshoy) || (año == añohoy && mes == meshoy && dia < díahoy)) {
    mensajeError.innerHTML ="No puedes reservar en una fecha anterior a hoy";
    return;
  } 
  if (año == añohoy && mes == meshoy && dia == díahoy) {
    const fechaHoraReserva = new Date(año, mes - 1, dia, horas, minutos);
    const difMinutos = (fechaHoraReserva - ahora) / 1000 / 60;
    
    if (difMinutos < 35) {
      mensajeError.innerHTML ="No puedes cambiar la reserva si faltan menos de 35 minutos";
      return;
    }
  }

  if (npersonas < 1) {
    mensajeError.innerHTML ="El número de personas debe ser al menos 1";
    return;
  }
  if (npersonas > 6) {
    mensajeError.innerHTML ="El número de personas no puede ser mayor a 10";
    return;
  }
  if (hora < "12:00" || hora > "23:00") {
    mensajeError.innerHTML ="La hora debe estar entre las 10:00 y las 23:00";
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "php/actualizareservas.php", true);
  const data = new FormData();
  data.append("fecha", fecha);
  data.append("hora", hora);
  data.append("npersonas", npersonas);
  data.append("idreserva", idreserva);

  xhr.send(data);

  xhr.onload = function () {
      misreservas();
    
  }
}

document.getElementById("misreservas").addEventListener("click", misreservas);

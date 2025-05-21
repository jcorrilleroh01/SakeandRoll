function desplegar() {
  var menu = document.getElementById('menu-usuario');

  if (menu.style.display === 'none' || menu.style.display === '') {
    menu.style.display = 'block';
    menu.style.right = '20px';
    menu.style.border = '3px solid #B22222';

    document.addEventListener('click', cerrarAlClickFuera);
  } else {
    menu.style.display = 'none';
    document.removeEventListener('click', cerrarAlClickFuera);
  }

  function cerrarAlClickFuera(event) {
    var botonUsuario = document.getElementById('usuario');
    if (!menu.contains(event.target) && event.target !== botonUsuario) {
      menu.style.display = 'none';
      document.removeEventListener('click', cerrarAlClickFuera);
    }
  }
}


function mispedidos() {
  cuerpo.innerHTML = "";
  (function() {
    const contenedor = document.createElement('div');
    contenedor.style.maxWidth = '650px';
    contenedor.style.margin = '40px auto';
    contenedor.style.borderRadius = '20px';
    contenedor.style.padding = '20px';
    contenedor.style.fontFamily = "'Mochiy Pop P One', sans-serif";
    contenedor.style.background = '#f4f1ec';
    contenedor.style.boxShadow = '0 5px 16px rgba(178, 34, 34, 0.2)';

    const titulo = document.createElement('h2');
    titulo.textContent = 'Mis Pedidos';
    titulo.style.color = '#B22222';
    titulo.style.textAlign = 'center';
    titulo.style.marginBottom = '20px';
    contenedor.appendChild(titulo);

    const pedidosContainer = document.createElement('div');
    contenedor.appendChild(pedidosContainer);

    cuerpo.appendChild(contenedor); 

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/mispedidos.php', true);
    let data = new FormData();
    data.append("usuario", document.getElementById("nombre").innerHTML);
    xhr.send(data);

    xhr.onload = function() {
      if (xhr.status === 200) {
        const pedidos = JSON.parse(xhr.responseText);

        pedidos.forEach(function(pedido) {
          const pedidoDiv = document.createElement('div');
          pedidoDiv.className = 'pedido';
          pedidoDiv.style.marginBottom = '20px';

          const resumen = document.createElement('div');
          resumen.style.display = 'flex';
          resumen.style.justifyContent = 'space-between';
          resumen.style.alignItems = 'center';
          resumen.style.border = '2px solid #2F2F2F';
          resumen.style.borderRadius = '15px';
          resumen.style.padding = '15px';

const info = document.createElement('div');

const pedidoNum = document.createElement('p');
pedidoNum.innerHTML = `<strong>Nº Pedido:</strong> #${pedido.Idpedido}`;
info.appendChild(pedidoNum);

const fecha = document.createElement('p');
fecha.innerHTML = `<strong>Fecha:</strong> ${pedido.Fecha}`;
info.appendChild(fecha);

const total = document.createElement('p');
total.innerHTML = `<strong>Total:</strong> ${pedido.Monto}€`;
info.appendChild(total);

const entrega = document.createElement('p');
entrega.innerHTML = `<strong>Entrega:</strong> ${pedido.entrega}`;
info.appendChild(entrega);

const notas = document.createElement('p');
notas.innerHTML = `<strong>Notas:</strong> ${pedido.notas === "" ? "Sin notas" : pedido.notas}`;
info.appendChild(notas);


const estadoLabel = document.createElement('p');
const estadoStrong = document.createElement('strong');
estadoStrong.textContent = 'Estado: ';
estadoLabel.appendChild(estadoStrong);

const estadoSpan = document.createElement('span');
estadoSpan.textContent = pedido.estado;

if (pedido.estado === "En preparacion") {
  estadoSpan.className = 'badge bg-warning text-dark';
} else {
  estadoSpan.className = 'badge bg-success';
}

estadoLabel.appendChild(estadoSpan);
info.appendChild(estadoLabel);

if (pedido.estado === "En preparacion") {
  const botonPedido = document.createElement('button');
  botonPedido.textContent = 'Seguimiento del pedido';
  botonPedido.style.backgroundColor = '#B22222';
  botonPedido.style.color = 'white';
  botonPedido.style.border = 'none';
  botonPedido.style.padding = '10px 15px';
  botonPedido.style.borderRadius = '15px';
  botonPedido.style.marginTop = '14px';
  botonPedido.style.cursor = 'pointer';
  botonPedido.style.fontFamily = "'Mochiy Pop P One', sans-serif";
  botonPedido.onclick = preparacion;

  info.appendChild(botonPedido);
}

          // Botón de detalles
          const btn = document.createElement('button');
          btn.textContent = 'Ver Detalles';
          btn.style.backgroundColor = '#B22222';
          btn.style.color = 'white';
          btn.style.border = 'none';
          btn.style.padding = '10px 15px';
          btn.style.borderRadius = '15px';
          btn.style.cursor = 'pointer';
          btn.style.fontFamily = "'Mochiy Pop P One', sans-serif";

          const detalles = document.createElement('div');
          detalles.style.display = 'none';
          detalles.style.marginTop = '10px';
          detalles.style.borderLeft = '4px solid #B22222';
          detalles.style.paddingLeft = '15px';
          detalles.style.background = '#fcecec';
          detalles.style.borderRadius = '10px';

          const tituloDetalles = document.createElement('p');
          tituloDetalles.innerHTML = '<strong>Platos:</strong>';
          detalles.appendChild(tituloDetalles);

          const lista = document.createElement('ul');
          lista.style.paddingLeft = '20px';

          let xhr2 = new XMLHttpRequest();
          xhr2.open('POST', 'php/mispedidosdetalles.php', true);
          let data2 = new FormData();
          data2.append("idpedido", pedido.Idpedido);
          xhr2.send(data2);

          xhr2.onload = function() {
            let platos = JSON.parse(xhr2.responseText);
            platos.forEach(function(plato) {
              const li = document.createElement('li');
              li.textContent = plato.nombre + ' x' + plato.cantidad;
              lista.appendChild(li);
            });

            detalles.appendChild(lista);
          };

          btn.addEventListener('click', function() {
            const visible = detalles.style.display === 'block';
            detalles.style.display = visible ? 'none' : 'block';
            btn.textContent = visible ? 'Ver Detalles' : 'Ocultar Detalles';
          });

          resumen.appendChild(info);
          resumen.appendChild(btn);
          pedidoDiv.appendChild(resumen);
          pedidoDiv.appendChild(detalles);
          pedidosContainer.appendChild(pedidoDiv);
        });

      } else {
        pedidosContainer.innerHTML = "<p style='color:red;'>Error al cargar pedidos</p>";
      }
      info.addEventListener('mouseover', () => {
  info.style.transform = 'scale(1.05)';
  info.style.transition = 'transform 0.2s ease';
});

info.addEventListener('mouseout', () => {
  info.style.transform = 'scale(1)';
});
    };
  })();
}



document.getElementById("mispedidos").addEventListener("click", mispedidos);

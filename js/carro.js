let importetotal = 0;
let supertotal = 0;
let puntos = 0;
let contadorCarrito
function listarcarro() {
  let nombreuser = document.getElementById("nombre");

  if (nombreuser && nombreuser.innerHTML != "") {
    let pedidoGuardado = JSON.parse(localStorage.getItem("pedido_" + nombreuser.innerHTML));

    if (pedidoGuardado && pedidoGuardado.usuario == nombreuser.innerHTML) {
      preparacion();
      return;
    }
  }
  if (pagado === false) {
    importetotal = 0;
    cuerpo.innerHTML = "";
    let cookieValue = getCookie("carrito");
if (cookieValue && cookieValue !== "[]"){
      let total = JSON.parse(cookieValue);
      cuerpo.innerHTML += "<h1 class='d-flex justify-content-center'>Carro</h1>";
      cuerpo.innerHTML += "<div id='cabecera'><h3>Plato</h3><h3>Cantidad</h3><h3>Precio</h3></div>";
      let contador = 0;
      let totalPlatos = total.length;
      cuerpo.innerHTML += "<div id='todocarro'>";
      for (let i = 0; i < totalPlatos; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "php/precio.php", true);
        let data = new FormData();
        data.append("plato", total[i].nombre);
        xhr.send(data);
        xhr.onload = function () {
          let precio = JSON.parse(xhr.responseText);
          let todocarro = document.getElementById("todocarro");
          todocarro.innerHTML += `<div id='listacarro'>
                                      <img id='fotopequecarro' src='img/plato${precio[0].Idplato}.png'>
                                      ${total[i].nombre}
                                      <input id='inputcarro' type='number' min='1' max='10' value=${total[i].cantidad}>
                                      ${precio[0].Precio}€
                                      <button class='btn btn-danger' onclick="borraritem('${total[i].nombre}', ${precio[0].Precio}, event)" data-nombre='${total[i].nombre}'>X</button>
                                  </div>`;
          importetotal += precio[0].Precio * total[i].cantidad;
          contador++;
          if (contador === totalPlatos) {
            cuerpo.innerHTML += `
                      <div class='form-check d-flex flex-row justify-content-center' id='checkbox'>
                          <input class='form-check-input' type='radio' name='entrega' id='domicilio' value='domicilio'>
                          <label class='form-check-label' for='domicilio'>Domicilio</label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <input class='form-check-input' type='radio' name='entrega' id='recoger' value='recoger' checked>
                          <label class='form-check-label' for='recoger'>Recoger en local</label>
                      </div>`;
            supertotal = importetotal;

            cuerpo.innerHTML += `<div id='totalcarro'>
                      <h3>Total</h3><span id='totalisimo'> ${importetotal}€</span>
                      <button class='btn btn-success' onclick='pagar(${importetotal})'>Pagar</button>
                  </div>`;
            listarOfertas();
          }
        };
      }
    }else{
      cuerpo.innerHTML=`<div id="carrito-vacio" class="d-flex flex-column align-items-center justify-content-center text-center" style="min-height: 60vh;">
  <div style="font-size: 80px;">🛒</div>
  <h3 class="mt-3">Todavía no tienes artículos en el carrito</h3>
  <p class="mb-4">¡Explora nuestro menú y encuentra algo delicioso!</p>
  <a onclick='mostrar()' class="btn btn-primary">Ver Carta</a>
</div>
`
    }
  } else {
    preparacion(supertotal);
  }
}
function listarOfertas() {
  let nombre = document.getElementById("nombre");
  let xhr2 = new XMLHttpRequest();
  xhr2.open("POST", "php/ofertascanje.php", true);
  let data2 = new FormData();
  data2.append("usuario", nombre.innerHTML);
  xhr2.send(data2);
  xhr2.onload = function () {
    let todocarro = document.getElementById("todocarro");
    let ofertas = JSON.parse(xhr2.responseText);
    localStorage.setItem("ofertasAplicadas", JSON.stringify(ofertas));
    for (let x = 0; x < ofertas.length; x++) {
      if (ofertas[x].tipo !== 'descuento') {
        todocarro.innerHTML += `<div id='listacarro'>
                                    <img id='fotopequecarro' src='img/oferta.png'>
                                    ${ofertas[x].plato}
                                    ${ofertas[x].precio}€
                                    <button class='btn btn-danger' onclick="borraritem('${ofertas[x].plato}', ${ofertas[x].precio},event)">X</button>
                                    </div>`;
      }
    }
  }
}

function borraritem(plato, precio, event) {
  
let inputCantidad = event.target.parentElement.querySelector("input[type='number']");
let cantidadEliminada = inputCantidad ? parseInt(inputCantidad.value) : 1;

let platoDiv = event.target.parentElement;
  platoDiv.remove();
  let cookieValue = getCookie("carrito");
  if (cookieValue) {
    let carrito = JSON.parse(cookieValue);
        for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].nombre === plato) {
        carrito[i].cantidad -= cantidadEliminada;  
        if (carrito[i].cantidad <= 0) {
          carrito.splice(i, 1); 
        }
        break;
      }
    }
    if(precio==0){
      let xhr3= new XMLHttpRequest();
      xhr3.open("POST", "php/borraroferta.php", true);
      let data3 = new FormData();
      data3.append("plato", plato);
      data3.append("usuario", document.getElementById("nombre").innerHTML);
      xhr3.send(data3);


    }
    setCookie(JSON.stringify(carrito));
    actualizarContadorCarrito();
    let importetotal = 0;
    for (let i = 0; i < carrito.length; i++) {
      let platoNombre = carrito[i].nombre;
      let cantidad = carrito[i].cantidad;
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "php/precio.php", true);
      let data = new FormData();
      data.append("plato", platoNombre);
      xhr.send(data);
      xhr.onload = function () {
        let precioPlato = JSON.parse(xhr.responseText);
        if (precioPlato && precioPlato[0]) {
          let precio = parseFloat(precioPlato[0].Precio);
          if (!isNaN(precio)) {
            importetotal += precio * cantidad; 
          }
          let supertotal = importetotal;
          let totalSpan = document.getElementById("totalisimo");
          if (totalSpan) {
            let domicilio = document.getElementById("domicilio");
            if (domicilio && domicilio.checked) {
              totalSpan.innerHTML = importetotal + "+ 2,5€ (Gastos de envio) = " + (importetotal + 2.5) + "€";
            } else {
              totalSpan.innerHTML = importetotal + "€";
            }
          }
        }
      };
    }
  }
}
function setCookie(value) {
  const oneYearInSeconds = 365 * 24 * 60 * 60;
  const ExpirationDate = new Date(Date.now() + oneYearInSeconds * 1000).toUTCString();
  document.cookie = "carrito=" + value + "; expires=" + ExpirationDate + "; path=/";
}
document.getElementById("carro").addEventListener("click", listarcarro);
document.getElementById("cuerpo").addEventListener("click", function (e) {
  if (e.target && e.target.id === "domicilio") {
    document.getElementById("totalisimo").innerHTML = importetotal + "+ 2,5€ (Gastos de envio) = " + (importetotal + 2.5) + "€";
  }
});
document.getElementById("cuerpo").addEventListener("click", function (e) {
  if (e.target && e.target.id === "recoger") {
    document.getElementById("totalisimo").innerHTML = importetotal + "€";
  }
});
function actualizarContadorCarrito() {
  let cookieValue = getCookie("carrito");
  let totalUnidades = 0;
  if (cookieValue) {
    let carrito = JSON.parse(cookieValue);
    for (let i = 0; i < carrito.length; i++) {
      totalUnidades += carrito[i].cantidad;
    }
  }
  let contadorCarrito = document.getElementById("contador-carrito");
  if (contadorCarrito) {
    contadorCarrito.innerText = totalUnidades;
  }
}
actualizarContadorCarrito();
document.getElementById("cuerpo").addEventListener("change", function (e) {
  if (e.target && e.target.id === "inputcarro") {
    let nuevaCantidad = parseInt(e.target.value);
    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) nuevaCantidad = 1;
    e.target.value = nuevaCantidad;
    let nombrePlato = e.target.parentElement.querySelector("button").getAttribute("data-nombre");
    let cookieValue = getCookie("carrito");
    if (cookieValue) {
      let carrito = JSON.parse(cookieValue);
      let totalUnidades = 0;
      for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombrePlato) {
          carrito[i].cantidad = nuevaCantidad;
        }
        totalUnidades += carrito[i].cantidad;
      }
      carrito.cantidadtotal = totalUnidades;
      setCookie(JSON.stringify(carrito));
       contadorCarrito = document.getElementById("contador-carrito");
      if (contadorCarrito) contadorCarrito.innerText = totalUnidades;
      let items = document.querySelectorAll("#todocarro #listacarro");
      let importetotal = 0;
      for (let i = 0; i < items.length; i++) {
        let cantidadInput = items[i].querySelector("input[type='number']");
        if (cantidadInput) {
          let cantidad = parseInt(cantidadInput.value);
          if (!isNaN(cantidad)) {
            let contenido = items[i].innerText;
            let partes = contenido.split("€");
            if (partes.length >= 2) {
              let textoPrecio = partes[partes.length - 2].split('\n').pop().trim();
              let precio = parseFloat(textoPrecio);
              if (!isNaN(precio)) {
                importetotal += cantidad * precio;
              }
            }
          }
        }
      }
      let supertotal = importetotal;
      let totalSpan = document.getElementById("totalisimo");
      if (totalSpan) {
        let domicilio = document.getElementById("domicilio");
        if (domicilio && domicilio.checked) {
          totalSpan.innerHTML = importetotal + "+ 2,5€ (Gastos de envio) = " + (importetotal + 2.5) + "€";
        } else {
          totalSpan.innerHTML = importetotal + "€";
        }
      }
    }
  }
});


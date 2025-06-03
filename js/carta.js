let cant = 0;  
let carrito = [];

function mostrar() {
    let divcontroles=document.createElement("div");
    divcontroles.className="d-flex justify-content-center gap-2 m-3";
    divcontroles.innerHTML=`<a href=#neon1 style="border-radius: 10px; background-color:#e5e1dc; border:2px solid #f0ece8 ; color:black" class="text-decoration-none   p-3">Entrantes</a><a style="border-radius: 10px; background-color:#e5e1dc; border:2px solid #f0ece8 ; color:black" class="text-decoration-none   p-3" href=#neon2 >Platos principales</a><a style="border-radius: 10px; background-color:#e5e1dc; border:2px solid #f0ece8 ; color:black" class="text-decoration-none   p-3" href=#neon3 >Postres</a><a href=#neon4 style="border-radius: 10px; background-color:#e5e1dc; border:2px solid #f0ece8 ; color:black" class="text-decoration-none   p-3">Cócteles</a>`
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/cartamostraar.php", true);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            let carta = JSON.parse(xhr.responseText);
            let div = document.createElement("div");
            div.className = "carta";
            div.innerHTML = "<div id='carta'>";

            const orden = ["Entrante", "Plato principal", "Coctel", "Postre"];

            orden.forEach(tipo => {
                if(tipo === "Entrante" ){ 
                div.innerHTML += `<h2 id='neon1' class="m-6 d-flex justify-content-center">Entrantes</h2>`;
            }else{
                if(tipo === "Plato principal"){ 
                    div.innerHTML += `<h2 id='neon2' class="m-6 d-flex justify-content-center">Platos principales</h2>`;

                }else{if(tipo === "Postre"){
                    div.innerHTML += `<h2 id='neon3' class="m-6 d-flex justify-content-center">Postres</h2>`;

                }else{

                div.innerHTML += `<h2 id='neon4' class="m-6 d-flex justify-content-center">Cócteles</h2>`;}
                }
            }
                carta.forEach(plato => {
                    if (plato.tipo === tipo && plato.Precio != 0) {
                        div.innerHTML += `
    <div class="table-responsive">
        <table class="table align-middle" style="border:2px solid #f0ece8">
            <tr >
                <td style="width: 200px; height: 200px; background-color:#e5e1dc">
                    <div style=" width: 200px; height: 200px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                        <img src='img/plato${plato.Idplato}.png' 
                             style="width: 100%; height: 100%; object-fit: cover;" 
                             alt='${plato.Plato}'>
                    </div>
                </td>
                <td style="background-color:#e5e1dc";>
                    <h3>${plato.Plato}</h3>
                    <p>${plato.descripcion}</p>
                    <p><strong>${plato.Precio}€</strong></p>
                    <div class="d-flex align-items-center gap-2">
                        <input class='form-control input-cantidad'  value=1 type='number' min='1' max='10' style="width: 60px;">
                        <button onclick='añadir("${plato.Plato}", this)' class='btn btn-success'>🛒</button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
                        `;
                    }
                });
            });

            div.innerHTML += "</div>";
            cuerpo.innerHTML = "";
                cuerpo.appendChild(divcontroles);

            cuerpo.appendChild(div);
        }
    };
}

function getCookie(nombrecookie) {
    try {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [cookieNombre, cookieValor] = cookie.split("=");
            if (cookieNombre === nombrecookie) {
                return cookieValor;
            }
        }
    } catch (error) {
        return null;
    }
    return null;
}
function setCookie(value) {
    const oneYearInSeconds = 365 * 24 * 60 * 60;
    const ExpirationDate = new Date(Date.now() + oneYearInSeconds * 1000).toUTCString();
    document.cookie = "carrito=" + value + "; expires=" + ExpirationDate + "; path=/";
}
function añadir(plato, boton) {
modalCarrito(); 
setTimeout(() => {
  const modal = document.getElementById('modalCarrito');
  if (modal) modal.remove();
}, 1000);    let cantidad2 = boton.parentNode.querySelector(".input-cantidad").value;
    if (isNaN(cantidad2) || cantidad2 === "" || parseInt(cantidad2) <= 0) {
        return;
    }
    let cantidad = parseInt(cantidad2);
    let cookieValue = getCookie("carrito");
    if (cookieValue) {
        carrito = JSON.parse(cookieValue);
    }
    let platoExistente = null;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === plato) {
            platoExistente = carrito[i];
            break;
        }
    }
    if (platoExistente) {
        platoExistente.cantidad = parseInt(platoExistente.cantidad) + cantidad;
        platoExistente.cantidadtotal = parseInt(platoExistente.cantidadtotal) + cantidad;
    } else {
        carrito.push({ nombre: plato, cantidad: cantidad, cantidadtotal: cantidad });
    }
    cant += cantidad; 
    console.log(cant);
    document.getElementById("contador-carrito").innerHTML = cant;

    setCookie(JSON.stringify(carrito));
}
let cookieValue = getCookie("carrito");
if (cookieValue) {
    let total = JSON.parse(cookieValue);
    let sumaCookie = 0;
    for (let i = 0; i < total.length; i++) {
        sumaCookie += parseInt(total[i].cantidad);
    }
    cant = sumaCookie;  
    document.getElementById("contador-carrito").innerHTML = cant;
}
document.getElementById("carta").addEventListener("click", mostrar);

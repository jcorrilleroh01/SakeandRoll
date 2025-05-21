let entrega='recoger'
let fechitaa = new Date();
let diaa = fechitaa.getDate();
let mess = fechitaa.getMonth() + 1; 
let añoo = fechitaa.getFullYear();
let fechahoy= `${añoo}-${mess}-${diaa}`;
function pagar(total){
    let ofertasAplicadas = JSON.parse(localStorage.getItem("ofertasAplicadas") || "[]");
    if(document.getElementById("bienvenido").innerHTML !== ""){
        if(document.getElementById("domicilio").checked) {
            total += 2.5;
            entrega = 'Domicilio'
        }
        if(document.getElementById("recoger").checked) {
            entrega = 'Recoger'
        }
        let cookie = getCookie("carrito");
        if (cookie) {
            let carrito = JSON.parse(cookie); 
            let html = `<div id='junte'>`;
            html += `
                <div class="resumen" >
                    <h3>Resumen del pedido</h3>
                    <ul>`;
            carrito.forEach(item => {
                html += `<li>${item.nombre} - ${item.cantidad}</li>`;
            });
            ofertasAplicadas.forEach(item => {
                html += `<li>OFERTA - ${item.plato}</li>`;
            });
            html += `</ul><strong>Total:${JSON.stringify(total)}€</strong></div>`;
            html += `
                <div class="notas">
                    <h3>Notas para el restaurante</h3>
                    <textarea rows="4" placeholder="¿Alguna indicación especial?"></textarea>
                </div>
            </div>`; 
            html += `
                <div id='pago'>
                    <h3>Métodos de pago</h3>
                    <div id="paypal-button-container"></div>
                </div>
            `;
            cuerpo.innerHTML = html;
            paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: total 
                            }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        cant=0;
                        document.getElementById("contador-carrito").innerHTML=cant; 
                        localStorage.removeItem("ofertasAplicadas");
                        pagado = true;
                        let xhr = new XMLHttpRequest();
                        xhr.open("POST", "php/pagar.php", true); 
                        let data = new FormData();
                        data.append("nombre", document.getElementById("nombre").innerHTML);
                        data.append("entrega", entrega);
                        data.append("total", total);
                        data.append("carrito", JSON.stringify(carrito));
                        data.append("notas", document.querySelector(".notas textarea").value);
                        data.append("fecha", fechahoy);
                        data.append("ofertasAplicadas", JSON.stringify(ofertasAplicadas));
                        xhr.send(data);
                        xhr.onload=function(){
                            if(JSON.parse(xhr.responseText) == "okey"){
                            preparacion(total,ofertasAplicadas)     
                        sumarpuntos(total)                                       }
                    }
                    });
                },
                onError: function(err) {
                    alert("Hubo un error con el pago");
                    console.error(err);
                }
            }).render("#paypal-button-container");
        }
    } else {
        login();
    }
}
function sumarpuntos(total){
    let nombre=document.getElementById("nombre").innerHTML
    let puntos=total*10
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/sumarpuntos.php", true); 
    let data = new FormData();
    data.append("nombre", nombre);
    data.append("puntos", puntos);
    xhr.send(data);
}

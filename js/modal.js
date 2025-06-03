function modalsesion() {
    let modal = document.createElement("div");
    modal.id = "modal";
    modal.className = "modal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; 
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "10000";
    modal.style.borderRadius = "10px";
    modal.style.fontFamily = "'Mochiy Pop P One', sans-serif";
    let contenido = document.createElement("div");
    contenido.style.backgroundColor = "#e5e1dc";
    contenido.style.padding = "30px";
    contenido.style.borderRadius = "10px";
    contenido.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
    contenido.style.textAlign = "center";
    contenido.style.maxWidth = "400px";
    contenido.style.width = "100%";
    let h1 = document.createElement("h1");
    h1.innerHTML = "Cerrar sesión";
    h1.style.fontSize = "24px";
    h1.style.marginBottom = "20px";
    h1.style.color = "#333"; 
    contenido.appendChild(h1);   
    let p = document.createElement("p");
    p.innerHTML = "¿Estás seguro de que quieres cerrar sesión?";
    p.style.fontSize = "16px";
    p.style.color = "#555"; 
    p.style.marginBottom = "30px";
    contenido.appendChild(p);
    let botonesModal = document.createElement("div");
    botonesModal.id = "botonesmodal";
    botonesModal.style.display = "flex";
    botonesModal.style.justifyContent = "space-around";
    let btnSi = document.createElement("button");
    btnSi.id = "botonsi";
    btnSi.className = "btn btn-success";
    btnSi.innerHTML = "Sí";
    btnSi.style.padding = "10px 20px";
    btnSi.style.borderRadius = "5px";
    btnSi.style.border = "none";
    btnSi.style.color = "white";
    btnSi.style.cursor = "pointer";
    btnSi.style.transition = "background-color 0.3s";
    btnSi.onmouseover = function() { btnSi.style.backgroundColor = "#0056b3"; };
    btnSi.onmouseout = function() { btnSi.style.backgroundColor = "#007bff"; };
    let btnNo = document.createElement("button");
    btnNo.id = "botono";
    btnNo.className = "btn btn-danger";
    btnNo.innerHTML = "No";
    btnNo.style.padding = "10px 20px";
    btnNo.style.borderRadius = "5px";
    btnNo.style.border = "none";
    btnNo.style.backgroundColor = "#dc3545";
    btnNo.style.color = "white";
    btnNo.style.cursor = "pointer";
    btnNo.style.transition = "background-color 0.3s";
    btnNo.onmouseover = function() { btnNo.style.backgroundColor = "#c82333"; };
    btnNo.onmouseout = function() { btnNo.style.backgroundColor = "#dc3545"; };
    botonesModal.appendChild(btnSi);
    botonesModal.appendChild(btnNo);
    contenido.appendChild(botonesModal);
    let cerrar = document.createElement("span");
    cerrar.id = "cerrar";
    cerrar.innerHTML = "&times;";
    cerrar.style.position = "absolute";
    cerrar.style.top = "10px";
    cerrar.style.right = "10px";
    cerrar.style.fontSize = "30px";
    cerrar.style.cursor = "pointer";
    cerrar.style.color = "#aaa";
    cerrar.onmouseover = function() { cerrar.style.color = "#333"; };
    cerrar.onmouseout = function() { cerrar.style.color = "#aaa"; };
    cerrar.onclick = function() {
        modal.style.display = "none"; 
    };

    btnNo.onclick = function() {
        modal.style.display = "none"; 
    };
    btnSi.onclick = function() {
window.location.reload();
    usuario.src="img/usuario.png";
    bandera=0   
    }
    contenido.appendChild(cerrar);
    modal.appendChild(contenido);
    document.body.appendChild(modal);
}
function modalreserva() {
    let modal = document.createElement("div");
    modal.id = "modalreserva";
    modal.className = "modalreserva";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; 
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "10000";
    modal.style.borderRadius = "10px";
    modal.style.fontFamily = "'Mochiy Pop P One', sans-serif";
    let contenido = document.createElement("div");
    contenido.style.backgroundColor = "#e5e1dc";
    contenido.style.padding = "30px";
    contenido.style.borderRadius = "10px";
    contenido.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
    contenido.style.textAlign = "center";
    contenido.style.maxWidth = "500px";
    contenido.style.width = "100%";
    let h1 = document.createElement("h3");
    h1.innerHTML = "Tu reserva,<div id='sake'>"+document.getElementById("nombre").innerText+",</div><br> a las <div id='sake'>"+document.getElementById("hora").value+"</div> <br>del <div id='sake'>"+document.getElementById("fecha").value+"</div> <br>para <div id='sake'>"+document.getElementById("personas").value+"</div> personas ha sido realizada con éxito";
    h1.style.fontSize = "24px";
    h1.style.marginBottom = "20px";
    h1.style.color = "#333"; 
    contenido.appendChild(h1);   
    let botonesModal = document.createElement("div");
    botonesModal.id = "botonesmodal";
    botonesModal.style.display = "flex";
    botonesModal.style.justifyContent = "space-around";
    let btnNo = document.createElement("button");
    btnNo.id = "botonok";
    btnNo.className = "btn btn-success";
    btnNo.innerHTML = "OK";
    btnNo.style.padding = "10px 20px";
    btnNo.style.borderRadius = "5px";
    btnNo.style.border = "none";
    btnNo.style.backgroundColor = "#dc3545";
    btnNo.style.color = "white";
    btnNo.style.cursor = "pointer";
    btnNo.style.transition = "background-color 0.3s";
    btnNo.onclick = function() {
        modal.remove()
    }
    btnNo.onmouseover = function() { btnNo.style.backgroundColor = "#c82333"; };
    btnNo.onmouseout = function() { btnNo.style.backgroundColor = "#dc3545"; };
    botonesModal.appendChild(btnNo);
    contenido.appendChild(botonesModal);
    modal.appendChild(contenido);
    document.body.appendChild(modal);
}
function modalpuntos() {
    let modal = document.createElement("div");
    modal.id = "modalpuntos";
    modal.className = "modalpuntos";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; 
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "10000";
    let contenido = document.createElement("div");
    contenido.style.backgroundColor = "white";
    contenido.style.padding = "30px";
    contenido.style.borderRadius = "10px";
    contenido.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
    contenido.style.textAlign = "center";
    contenido.style.maxWidth = "500px";
    contenido.style.width = "100%"; 
    let h1 = document.createElement("h3");
    h1.innerHTML = "Tu canje ha sido realizado con éxito";
    h1.style.fontSize = "24px";
    h1.style.marginBottom = "20px";
    h1.style.color = "#333"; 
    contenido.appendChild(h1);   
    let botonesModal = document.createElement("div");
    botonesModal.style.display = "flex";
    botonesModal.style.justifyContent = "center";
    let btnNo = document.createElement("button");
    btnNo.className = "btn btn-success";
    btnNo.innerHTML = "OK";
    btnNo.style.padding = "10px 20px";
    btnNo.style.borderRadius = "5px";
    btnNo.style.border = "none";
    btnNo.style.backgroundColor = "#dc3545";
    btnNo.style.color = "white";
    btnNo.style.cursor = "pointer";
    btnNo.style.transition = "background-color 0.3s";
    btnNo.onclick = function() {
        modal.remove();
        actupuntos()
    };
    btnNo.onmouseover = function() {
        btnNo.style.backgroundColor = "#c82333";
    };
    btnNo.onmouseout = function() {
        btnNo.style.backgroundColor = "#dc3545";
    };
    botonesModal.appendChild(btnNo);
    contenido.appendChild(botonesModal);
    modal.appendChild(contenido);
    document.body.appendChild(modal);
}
function modalnopuntos(){
    let modal = document.createElement("div");
    modal.id = "modalpuntos";
    modal.className = "modalpuntos";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; 
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "10000";
    let contenido = document.createElement("div");
    contenido.style.backgroundColor = "white";
    contenido.style.padding = "30px";
    contenido.style.borderRadius = "10px";
    contenido.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
    contenido.style.textAlign = "center";
    contenido.style.maxWidth = "500px";
    contenido.style.width = "100%";
    let h1 = document.createElement("h3");
    h1.innerHTML = "No tienes suficientes puntos!!!";
    h1.style.fontSize = "24px";
    h1.style.marginBottom = "20px";
    h1.style.color = "#333"; 
    contenido.appendChild(h1);   
let h3 = document.createElement("h3");
    h3.innerHTML = "Sigue interactuando con nuestra web mediante pedidos o inicia sesion diariamente para ganar mas puntos!!";
    h3.style.fontSize = "16px";
    h3.style.marginBottom = "20px";
    h3.style.color = "#333";
    contenido.appendChild(h3);
    let botonesModal = document.createElement("div");
    botonesModal.style.display = "flex";
    botonesModal.style.justifyContent = "center";
    let btnNo = document.createElement("button");
    btnNo.className = "btn btn-danger";
    btnNo.innerHTML = "OK";
    btnNo.style.padding = "10px 20px";
    btnNo.style.borderRadius = "5px";
    btnNo.style.border = "none";
    btnNo.style.backgroundColor = "#dc3545";
    btnNo.style.color = "white";
    btnNo.style.cursor = "pointer";
    btnNo.style.transition = "background-color 0.3s";
    btnNo.onclick = function() {
        modal.remove();
    };
    btnNo.onmouseover = function() {
        btnNo.style.backgroundColor = "#c82333";
    };
    btnNo.onmouseout = function() {
        btnNo.style.backgroundColor = "#dc3545";
    };
    botonesModal.appendChild(btnNo);
    contenido.appendChild(botonesModal);
    modal.appendChild(contenido);
    document.body.appendChild(modal);
}
 function modalCarrito() {
      if (document.getElementById('modalCarrito')) return;

      const estilo = document.createElement('style');
      estilo.textContent = `
        #modalCarrito {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          font-family: 'Mochiy Pop P One', sans-serif;
        }
        #modalContenido {
          background-color: #fff8f0;
          border: 3px solid #B22222;
          border-radius: 16px;
          padding: 20px;
          width: 90%;
          max-width: 400px;
          text-align: center;
          position: relative;
        }
        #modalContenido h2 {
          color: #B22222;
          margin-bottom: 15px;
        }
        #modalContenido p {
          color: #333;
          font-size: 1.1rem;
        }
        #modalContenido button {
          background-color: #B22222;
          color: white;
          border: none;
          padding: 10px 20px;
          margin-top: 15px;
          border-radius: 6px;
          cursor: pointer;
        }
        #modalContenido button:hover {
          background-color: #a11d1d;
        }
        #cerrarModal {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          color: #B22222;
          cursor: pointer;
        }
      `;
      document.head.appendChild(estilo);

      const modal = document.createElement('div');
      modal.id = 'modalCarrito';

      modal.innerHTML = `
        <div id="modalContenido">
          <div id="cerrarModal">×</div>
          <h2>🍱 ¡Añadido al carrito!</h2>
          <p>Tu producto ha sido añadido correctamente al carrito.</p>
          <button id="verCarrito">Ver carrito</button>
        </div>
      `;

      modal.querySelector('#cerrarModal').onclick = () => modal.remove();
      modal.querySelector('#verCarrito').onclick = () => listarcarro();

      document.body.appendChild(modal);
    }
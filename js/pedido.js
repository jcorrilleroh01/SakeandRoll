let pagado = false;
let intervalRefresco = null;
let intervalTiempo = null;
let pedidoresumen;
let pedidofertas;

function preparacion(total, ofertas) {
    const usuario = document.getElementById("nombre").innerHTML;
    cuerpo.innerHTML = "";

    let cookie = getCookie("carrito");
    let carrito = cookie ? JSON.parse(cookie) : [];

    let pedidoGuardado = JSON.parse(localStorage.getItem("pedido_" + usuario));

    if (pedidoGuardado) {
        iniciarSeguimientoPedido(pedidoGuardado, usuario, pedidoGuardado.carrito || [], pedidoGuardado.ofertas || []);
        return;
    }

    if (carrito.length > 0) {
        let html = `<div id='junte'>
            <div class="resumen">
                <h3>Resumen del pedido</h3>
                <ul>`;

        carrito.forEach(item => {
            html += `<li>${item.nombre} - ${item.cantidad}</li>`;
        });
        ofertas.forEach(item => {
            html += `<li>OFERTA - ${item.plato}</li>`;
        });

        pedidoresumen = carrito;
        pedidofertas = ofertas;

        let tiempo = 30 + Math.floor(Math.random() * 30);
        html += `</ul><strong>Total: ${total}€</strong></div>`;
        html += `
            <div id='barramensaje'>
                <div id='infomensajepedido'>
                    <h3><span id='pedidomensaje'>Su pedido está siendo preparado</span></h3>
                    <p id='vacio' class='d-flex align-items-center'>Estará listo en un tiempo aproximado de <span id='tiempopedido'>${tiempo}</span>min</p>
                </div>
                <div id='progreso' class="progress">
                    <div class="progress-bar" id="barraa" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                </div>
            </div>
        </div>`;

        cuerpo.innerHTML = html + `<div id='juego'></div>`;
        juego();

        guardarPedido(usuario, 0, "preparando", total, tiempo, Date.now(), carrito, ofertas);
        iniciarSeguimientoPedido({
            usuario,
            total,
            tiempo,
            inicio: Date.now(),
            carrito,
            ofertas
        }, usuario, carrito, ofertas);

        deleteCookie("carrito");
    }
}

function iniciarSeguimientoPedido(pedido, usuario, carrito = [], ofertas = []) {
    clearInterval(intervalRefresco);
    clearInterval(intervalTiempo);

    const minutosPasados = (Date.now() - pedido.inicio) / (1000 * 60);
    const { estado, porcentaje, restante } = calcularEstadoPedido(pedido.tiempo, minutosPasados);

    pedido.estado = estado;
    pedido.porcentaje = porcentaje;
    pedido.tiempoRestante = restante;
    localStorage.setItem("pedido_" + usuario, JSON.stringify(pedido));

    renderizarPedido(pedido, carrito, ofertas);
    actualizarbarra(estado, usuario);

    intervalTiempo = setInterval(() => {
        const pedidoActual = JSON.parse(localStorage.getItem("pedido_" + usuario));
        if (!pedidoActual) return;

        const minutosPasados = (Date.now() - pedidoActual.inicio) / (1000 * 60);
        const { restante } = calcularEstadoPedido(pedidoActual.tiempo, minutosPasados);

        document.getElementById("tiempopedido").textContent = restante;

        if (restante === 0) {
            actualizarbarra("entregado", usuario);
            clearInterval(intervalTiempo);
            clearInterval(intervalRefresco);
        }
    }, 30000);

    intervalRefresco = setInterval(() => {
        const pedidoActual = JSON.parse(localStorage.getItem("pedido_" + usuario));
        if (!pedidoActual) return;

        const minutosPasados = (Date.now() - pedidoActual.inicio) / (1000 * 60);
        const { estado, porcentaje, restante } = calcularEstadoPedido(pedidoActual.tiempo, minutosPasados);

        pedidoActual.estado = estado;
        pedidoActual.porcentaje = porcentaje;
        pedidoActual.tiempoRestante = restante;
        localStorage.setItem("pedido_" + usuario, JSON.stringify(pedidoActual));

        actualizarbarra(estado, usuario);
    }, 30000);
}

function calcularEstadoPedido(tiempoTotal, minutosPasados) {
    const restante = Math.max(tiempoTotal - Math.floor(minutosPasados), 0);
    let estado = "preparando";
    let porcentaje = 25;

    const progreso = minutosPasados / tiempoTotal;

    if (restante <= 0) {
        estado = "entregado";
        porcentaje = 100;
    } else if (progreso >= 0.75) {
        estado = "en camino";
        porcentaje = 75;
    } else if (progreso >= 0.5) {
        estado = "enviando";
        porcentaje = 50;
    }

    return { estado, porcentaje, restante };
}

function renderizarPedido(pedido, carrito, ofertas) {
    let htmlResumen = `<div id='junte'>
        <div class="resumen">
            <h3>Resumen del pedido</h3>
            <ul>`;

    carrito.forEach(item => htmlResumen += `<li>${item.nombre} - ${item.cantidad}</li>`);
    ofertas.forEach(item => htmlResumen += `<li>OFERTA - ${item.plato}</li>`);
    htmlResumen += `</ul><strong>Total: ${pedido.total}€</strong></div>`;

    let seguimientoHTML = `
        <div id='barramensajee'>
            <div id='infomensajepedidoo'>
                <h3 id='pedidomensajee'>Su pedido está siendo preparado</h3>
                <p id='vacioo'>Estará listo en aproximadamente <span id='tiempopedido'>${pedido.tiempoRestante ?? pedido.tiempo}</span> min</p>
            </div>
            <div id='progreso' class="progress">
                <div class="progress-bar" id="barraa" role="progressbar" style="width: ${pedido.porcentaje || 0}%;" aria-valuenow="${pedido.porcentaje || 0}" aria-valuemin="0" aria-valuemax="100">${pedido.estado || 'Preparando'}</div>
            </div>
        </div>`;

    let cierre = `</div>`;

    cuerpo.innerHTML = htmlResumen + seguimientoHTML + cierre + `<div id='juego'></div>`;
    juego();
}

function actualizarbarra(estado, usuario) {
    const barra = document.getElementById("barraa");
    let porcentaje;

    switch (estado) {
        case "preparando":
            porcentaje = 25;
            barra.textContent = "Preparando!";
            break;
        case "enviando":
            porcentaje = 50;
            barra.textContent = "Enviando!";
            break;
        case "en camino":
            porcentaje = 75;
            barra.textContent = "En camino!";
            break;
        case "entregado":
            porcentaje = 100;
            barra.textContent = "Entregado!";
            document.getElementById("pedidomensajee").innerHTML = "Su pedido está listo!";
            document.getElementById("vacioo").innerHTML = "Disfrute de su comida!";
            setTimeout(() => {
                localStorage.removeItem("pedido_" + usuario);
                contadorCarrito = 0;
                document.getElementById("contador-carrito").innerHTML = contadorCarrito;
                contenido();
            }, 6000);
            pagado = false;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'php/entregado.php', true);
            let data = new FormData();
            data.append("usuario", usuario);
            xhr.send(data);
            break;
        default:
            porcentaje = 0;
            barra.textContent = "Esperando...";
    }

    barra.style.width = porcentaje + "%";
    barra.setAttribute("aria-valuenow", porcentaje);

    const pedido = JSON.parse(localStorage.getItem("pedido_" + usuario));
    if (pedido) {
        pedido.estado = estado;
        pedido.porcentaje = porcentaje;
        localStorage.setItem("pedido_" + usuario, JSON.stringify(pedido));
    }
}

function guardarPedido(usuario, porcentaje, estado, total, tiempo, inicio, carrito = [], ofertas = []) {
    const pedido = { usuario, porcentaje, estado, total, tiempo, inicio, carrito, ofertas };
    localStorage.setItem("pedido_" + usuario, JSON.stringify(pedido));
}

function deleteCookie(nombrecookie) {
    document.cookie = nombrecookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

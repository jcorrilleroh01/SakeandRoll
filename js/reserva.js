function reserva() {
    cuerpo.innerHTML = "";
    let div = document.createElement("div");
    div.id = "divreserva";
    let div1 = document.createElement("div");
    div1.className = "col-5 d-flex flex-column align-items-center justify-content-center";
    div1.id = "div1";
    let div2 = document.createElement("div");
    div2.id = "div2";
    div2.className = "col-7  align-items-center justify-content-center";
    div.appendChild(div1);
    div.appendChild(div2);
    cuerpo.appendChild(div);
    div1.innerHTML = `
        <h3>Elige la fecha de tu reserva</h3><input type="date" id="fecha" class="form-control">
        <h3>Elige la hora de tu reserva</h3><input type="time" id="hora" class="form-control" step="900" min="12:00" max="23:45">
        <h3>Elige el número de personas</h3><input type="number" id="personas" min="1" max="6" class="form-control">
        <button id="disponibilidad" class="btn btn-primary">Ver disponibilidad</button>`;
let titulo = document.createElement("h1");
    titulo.className = "d-flex justify-content-center";
    titulo.innerText = "Elige tu mesa!";
    div2.appendChild(titulo);

    let contenedorMesas = document.createElement("div");
    contenedorMesas.id = "mesas";
    div2.appendChild(contenedorMesas);

    for (let i = 0; i < 9; i++) {
        let img = document.createElement("img");
        img.src = "img/mesa.png";
        img.id = `mesa${i}`;
        img.className = "mesa";
        contenedorMesas.appendChild(img);
    }

    let mensaje = document.createElement("div");
    mensaje.id = "reservamensaje";
    mensaje.className = "text-danger";
    div2.appendChild(mensaje);

}
function disponible() {
    if (bandera == 0) { login(); }
    let fechaElement = document.getElementById("fecha");
    if (!fechaElement) {
        console.log("El elemento con ID 'fecha' no se ha encontrado.");
        return;
    }
    let fecha = fechaElement.value;
    let hora = document.getElementById("hora").value;
    let personas = document.getElementById("personas").value;
    let mensaje = document.getElementById("reservamensaje");
    mensaje.innerHTML = "";
    if (fecha === "" || hora === "" || personas === "") {
        mensaje.innerHTML = "<h3>Por favor, rellena todos los campos</h3>";
        return;
    }
    let año = fecha.slice(0, 4);
    let mes = fecha.slice(5, 7);
    let dia = fecha.slice(8, 10);
    let diahoy = new Date().getDate();
    let meshoy = new Date().getMonth() + 1;
    let añohoy = new Date().getFullYear();
    if (año < añohoy || (año == añohoy && mes < meshoy) || (año == añohoy && mes == meshoy && dia < diahoy)) {
        mensaje.innerHTML = "<h3>Fecha no válida</h3>";
        return;
    }
    let [h, m] = hora.split(":").map(Number);
    console.log(h, m);
    if (h<12 || h > 23 || (h == 23 && m > 45)) {
        mensaje.innerHTML = "<h3>Horario de 12:00 a 23:45</h3>";
        return;
    }
    if (personas > 6 || personas < 1) {
        mensaje.innerHTML = "<h3>El número de personas es incorrecto</h3>";
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/reserva.php", true);
    let data = new FormData();
    data.append("fecha", fecha);
    data.append("hora", hora);
    xhr.send(data);
    xhr.onload = function () {
        let ocupadas = JSON.parse(xhr.responseText.split(","));
        mensaje.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            let mesa = document.getElementById(`mesa${i}`);
            if (ocupadas.includes(i.toString())) {
                mesa.src = "img/mesarojo.png";
            } else {
                mesa.src = "img/mesaverde.png";
            }
        }
    };
}
function reservar(e) {
    if (e.target.src.includes("img/mesaverde.png")){
                let fechaElement = document.getElementById("fecha");
        let usuario = document.getElementById("nombre").innerText;
        let fecha = fechaElement.value;
        let hora = document.getElementById("hora").value;
        let personas = document.getElementById("personas").value;
        let mensaje = document.getElementById("reservamensaje");
        if (fecha === "" || hora === "" || personas === "") {
            mensaje.innerHTML = "<h3>Por favor, rellena todos los campos</h3>";
            return;
        }else{let xhr = new XMLHttpRequest();
        xhr.open("POST", "php/reservar.php", true);
        let data = new FormData();
        data.append("fecha", fecha);
        data.append("hora", hora);
        data.append("personas", personas);
        data.append("usuario", usuario);
        data.append("nmesa", e.target.id.slice(4));
        xhr.send(data);
        xhr.onload = function () {
            if (xhr.responseText == "ok") {
                modalreserva()

            }else{
                mensaje.innerHTML = "<h3>"+xhr.responseText+"</h3>";
            }
        }}
    }else{return}   
     setTimeout(disponible, 1000) 
}
document.getElementById("reserva").addEventListener("click", reserva);
document.getElementById("cuerpo").addEventListener("click", function (e) {
    if (e.target && e.target.className === "mesa") {
        reservar(e);
    } else if (e.target && e.target.id === "disponibilidad") {
        e.preventDefault();
        disponible();
    }
});

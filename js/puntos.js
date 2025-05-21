function actupuntos(){   
     cuerpo.innerHTML = "";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/puntos.php", true);
    let data = new FormData();
    data.append("usuario", document.getElementById("nombre").innerHTML);
    xhr.send(data);
    xhr.onload = function () {
        let puntos = xhr.responseText;
        cuerpo.innerHTML = `<h2 class="text-center my-3">Puntos: ${puntos}</h2>`;
        interfazpuntos();
    }
}
function interfazpuntos() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/ofertas.php", true);
    let data = new FormData();
    data.append("usuario", document.getElementById("nombre").innerHTML);
    xhr.send(data);
    xhr.onload = function () {
        let oferta = JSON.parse(xhr.responseText);
        for (let i = 0; i < 5; i++) {
            let divs = document.createElement("div");
            divs.id = "divs" + i;
            divs.style.backgroundColor= "#e5e1dc";
            divs.style.border="3 px solid #f0ece8"
            divs.className = " w-90 h-50  rounded p-3 m-2  d-flex justify-content-between align-items-center";
            let boton=document.createElement("button");
            boton.className="btn btn-success";
            boton.innerHTML="Canjear";   
            boton.id="botonpuntos" 
            if(oferta[i].Descripcion===" Canjea tu Sushi roll GRATIS!!"){
            divs.innerHTML = "<img  id ='ofertas'  src='img/oferta1.jpg'>"+oferta[i].Descripcion+"<div id=puntos"+i+">"+oferta[i].Puntos+" PUNTOS</div>";

            }else if(oferta[i].Descripcion===" Consigue una bebida GRATIS!!"){
            divs.innerHTML = "<img  id ='ofertas'  src='img/oferta2.jpg'>"+oferta[i].Descripcion+"<div id=puntos"+i+">"+oferta[i].Puntos+" PUNTOS</div>";

            }else if(oferta[i].Descripcion===" Prueba un postre japonés completamente GRATIS!!"){
            divs.innerHTML = "<img  id ='ofertas'  src='img/oferta3.jpg'>"+oferta[i].Descripcion+"<div id=puntos"+i+">"+oferta[i].Puntos+" PUNTOS</div>";

            }else{
            divs.innerHTML = "<img  id ='ofertas'  src='img/oferta4.jpg'>"+oferta[i].Descripcion+"<div id=puntos"+i+">"+oferta[i].Puntos+" PUNTOS</div>";
            
            }
            divs.appendChild(boton);
            cuerpo.appendChild(divs);
        ;}
    }
}
document.getElementById("navbar").addEventListener("click", function (e) {
    if (e.target && e.target.id === "puntos") {
        actupuntos();
    }
});
document.getElementById("cuerpo").addEventListener("click", function (e) {
    if (e.target && e.target.id === "botonpuntos") {
        canjear(event);
    }
});
function actualizarcanje(texto) {
    let fechita= new Date();
    let dia = fechita.getDate();
    let mes = fechita.getMonth() + 1; 
    let anio = fechita.getFullYear();
    let fecha = `${dia}/${mes}/${anio}`;
let xhr = new XMLHttpRequest();
xhr.open("POST", "php/actualizarcanje.php", true);
let data = new FormData();
data.append("usuario", document.getElementById("nombre").innerHTML);
data.append("texto", texto);
data.append("fecha",fecha)
xhr.send(data);
xhr.onload = function () {
modalpuntos()
}}
function canjear(event) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/canjear.php", true);
    let data = new FormData();
    let divOferta = event.target.parentElement;
    let texto = divOferta.children[1].innerHTML;
    let puntos = texto.match(/\d+/)[0];  
    data.append("puntos", puntos);
    let usuario = document.getElementById("nombre").innerHTML;
    data.append("usuario", usuario);
    xhr.send(data);
    xhr.onload = function () {
        if (xhr.responseText == "OK") {
            let divHTML = divOferta.childNodes[1].textContent.trim();;
actualizarcanje(divHTML)
        } else {
modalnopuntos()        }
    };
}


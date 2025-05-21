let cuerpo=document.getElementById("cuerpo");
function contenido(){
    silog();
    document.getElementById("navbar").style.display="block";
    cuerpo.innerHTML="";
    let div=document.createElement("div");
    div.id="texto1"
    let imagen=document.createElement("img");
    imagen.src="img/foto1.jpg";
    imagen.id="imagen1";
    div.appendChild(imagen);
    let texto=document.createElement("p");
    texto.innerHTML="<div class='m-5'><h1>Un viaje de sabores auténticos</h1><br>Sumérgete en una experiencia gastronómica donde la tradición y la innovación se encuentran. En nuestro restaurante, cada plato es una obra de arte, elaborado con ingredientes frescos y recetas ancestrales reinventadas para el paladar moderno. Disfruta del equilibrio perfecto entre elegancia, sabor y cultura en un ambiente sofisticado diseñado para deleitar todos tus sentidos.</div>";
    div.appendChild(texto);
    cuerpo.appendChild(div);
    let div2=document.createElement("div");
    div2.id="texto2"
    let imagen2=document.createElement("img");
    imagen2.src="img/foto2.jpg";
    imagen2.id="imagen2";
    let texto2=document.createElement("p");
    texto2.innerHTML="<div><h1>Descubre el arte de los cócteles asiáticos</h1><br>Déjate sorprender por una selección única de cócteles inspirados en los sabores de Asia. Desde el clásico sake hasta creaciones modernas con té y especias exóticas, cada bebida es una experiencia sensorial. Disfruta de un momento especial en nuestro bar, donde la tradición y la innovación se fusionan en cada sorbo.</div>";
    div2.appendChild(texto2);
    div2.appendChild(imagen2);
    cuerpo.appendChild(div2);
}
function silog(){
    if(bandera===1){
        let a=document.createElement("a");
        a.className="navbar-brand";
    a.innerHTML="PUNTOS"
    a.id="puntos"
    if(document.getElementById("puntos")==null){
        document.getElementById("barra").appendChild(a);
    }
    document.getElementById("usuario").src="img/usuariolog.png";
    document.getElementById("usuario").removeEventListener("click",login);
    document.getElementById("usuario").addEventListener("click",desplegar);

    }
}
window.onload=contenido;
document.getElementById("logo").addEventListener("click",contenido);
document.getElementById("casa").addEventListener("click",contenido);









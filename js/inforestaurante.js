function info() {
    cuerpo.innerHTML = "";
    let div = document.createElement("div");
    div.id = "carrusel";
  
    let carrusel = `
  <div class="col-12 mb-4">
    <div class="text-center p-3">
      <h2 class="display-6 fw-bold m-2">Bienvenido a <span id="sake">Sake&Roll</span></h2>
      <p class="lead text-muted">Donde la tradición oriental se encuentra con la innovación culinaria.</p>
    </div>
  </div>
  <div class="col-12">
    <div id="carruselentero" class="carousel slide carousel-fade shadow rounded-4 overflow-hidden"
         data-bs-ride="carousel" data-bs-interval="2000" data-bs-pause="false">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="img/carrusel4.webp" class="d-block w-100" alt="Sake&Roll imagen 1">
        </div>
        <div class="carousel-item">
          <img src="img/carrusel2.jpg" class="d-block w-100" alt="Sake&Roll imagen 2">
        </div>
        <div class="carousel-item">
          <img src="img/carrusel3.jpg" class="d-block w-100" alt="Sake&Roll imagen 3">
        </div>
        <div class="carousel-item">
          <img src="img/carrusel1.jpg" class="d-block w-100" alt="Sake&Roll imagen 4">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carruselentero" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carruselentero" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  </div>
`;


let texto = `
  <div class="row mt-5 text-center">
    <div class="col-md-4 d-flex flex-column gap-4">
      <div>
        <h4 class="fw-bold" id='sake'>La Cocina</h4>
        <p class="text-muted">Fusión de sushi rolls, ramen artesanal y dim sum, elaborados con ingredientes de temporada y creatividad sin límites.</p>
      </div>
      <div>
        <h4 class="fw-bold" id='sake'>Reservas Online</h4>
        <p class="text-muted">Planifica tu visita fácilmente desde nuestra web o app. ¡Tu mesa te espera!</p>
      </div>
      <div>
        <h4 class="fw-bold" id='sake'>Postres Artesanales</h4>
        <p class="text-muted">Delicias dulces como mochi casero, tarta de té verde y creaciones propias que culminan la experiencia.</p>
      </div>
    </div>
    <div class="col-md-4 d-flex flex-column gap-4">
      <div>
        <h4 class="fw-bold" id='sake'>La Ideología</h4>
        <p class="text-muted">Innovamos con respeto por las raíces. Calidad, sostenibilidad y productos locales guían nuestra propuesta gastronómica.</p>
      </div>
      <div>
        <h4 class="fw-bold" id='sake'>Eventos y Catering</h4>
        <p class="text-muted">Celebraciones privadas, cenas corporativas y menús personalizados para cualquier ocasión.</p>
      </div>
      <div>
        <h4 class="fw-bold" id='sake'>Take Away Premium</h4>
        <p class="text-muted">Lleva nuestra cocina a casa con presentaciones cuidadas y la misma calidad que en el restaurante.</p>
      </div>
    </div>
    <div class="col-md-4 d-flex flex-column gap-4">
      <div>
        <h4 class="fw-bold" id='sake'>El Servicio</h4>
        <p class="text-muted">Ambiente acogedor, trato exquisito y experiencias únicas, perfectas para cualquier ocasión.</p>
      </div>
      <div>
        <h4 class="fw-bold" id='sake'>Compromiso Ecológico</h4>
        <p class="text-muted">Reducimos plásticos, reciclamos y usamos envases biodegradables para cuidar el planeta.</p>
      </div>
      <div>
        <h4 class="fw-bold" id='sake'>Atención Personalizada</h4>
        <p class="text-muted">Nos adaptamos a tus gustos y necesidades, incluyendo opciones veganas, sin gluten y alérgenos controlados.</p>
      </div>
    </div>
    <hr class="my-4">
    <div class="col-12">
      <h5 class="fw-semibold">¡Descubre <span id='sake'>Sake&Roll</span> y despierta tus sentidos!</h5>
    </div>
  </div>
`;


  
    div.innerHTML = "<div class='row'>" + carrusel + texto + "</div>";
  
    cuerpo.appendChild(div);
}
  
document.getElementById("info").addEventListener("click", info);

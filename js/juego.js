function juego() {
    let juegos = document.getElementById("juego");
    let html = ` 
        <h3>Mientras esperas,</h3>
        <h1>¡Atrapa el sushi!</h1>
        <h2>Puntos: <span id="puntoss">0</span></h2>
        <div id="contenedorJuego" style="width: 500px; height: 400px; background-color: #FFEBEE; position: relative; border: 5px solid #B22222; margin-top: 20px; overflow: hidden; border-radius: 10px;">
            <button id="sushi" style="font-size:40px; position: absolute;">🍣</button>
        </div>
        <br>
        <button id="mejora" style="display:none;">Comprar Mejora (+5 por click)</button>
    `;
    juegos.innerHTML = html;

    let puntos = 0;
    let puntosPorClick = 1;
    let mejoraComprada = 0; 
    const contenedorWidth = 500;
    const contenedorHeight = 400;
    const sushiWidth = 40;  
    const sushiHeight = 40; 

    function moverSushi() {
        let sushi = document.getElementById("sushi");
        if (!sushi) return;

        let maxX = contenedorWidth - sushiWidth;
        let maxY = contenedorHeight - sushiHeight;

        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);

        sushi.style.left = `${randomX}px`;
        sushi.style.top = `${randomY}px`;
    }

    // Espera que el DOM esté actualizado antes de usar sushi
    setTimeout(() => setInterval(moverSushi, 999), 50);

    document.getElementById('sushi').addEventListener('click', function() {
        puntos += puntosPorClick;
        document.getElementById('puntoss').textContent = puntos;

        this.style.animation = "reboteSushi 0.5s ease"; 
        setTimeout(() => {
            this.style.animation = ""; 
        }, 1900);

        if (puntos >= 25 && puntos < 50 && mejoraComprada === 0) {
            document.getElementById('mejora').textContent = "Comprar Mejora (+2 por click)";
            document.getElementById('mejora').style.display = 'inline-block';
        } else if (puntos >= 50 && puntos < 100 && mejoraComprada === 1) {
            document.getElementById('mejora').textContent = "Comprar Mejora (+3 por click)";
            document.getElementById('mejora').style.display = 'inline-block';
        } else if (puntos >= 100 && mejoraComprada === 2) {
            document.getElementById('mejora').textContent = "Comprar Mejora (+5 por click)";
            document.getElementById('mejora').style.display = 'inline-block';
        }
    });

    document.getElementById('mejora').addEventListener('click', function() {
        if (puntos >= 25 && puntos < 50 && mejoraComprada === 0) {
            puntos -= 25;
            puntosPorClick = 2;
            mejoraComprada = 1;
        } else if (puntos >= 50 && puntos < 100 && mejoraComprada === 1) {
            puntos -= 50;
            puntosPorClick = 3;
            mejoraComprada = 2;
        } else if (puntos >= 100 && mejoraComprada === 2) {
            puntos -= 100;
            puntosPorClick = 5;
            mejoraComprada = 3;
        }
        
        document.getElementById('puntoss').textContent = puntos;
        document.getElementById('mejora').style.display = 'none';
    });
}

juego();

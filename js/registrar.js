

function registrar() {
    cuerpo.innerHTML = "";
    let div = document.createElement("div");
    div.id = "registro";
    div.innerHTML = `
        <div class='m-5' id='form'>
            <h1>Registro</h1><br>
            <form>
                <div class='row'>
                    <div class='col-6 form-group'>
                        <label for='usuarioform'>Usuario</label>
                        <input type='text' class='form-control' id='usuarioform'required>
                    </div>
                    <div class='col-6 form-group'>
                        <label for='contraseña'>Contraseña</label>
                        <input type='password' class='form-control' id='contraseña' required>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-6 form-group'>
                        <label for='nombreape'>Nombre y Apellidos</label>
                        <input type='text' class='form-control' id='nombreape' required>
                    </div>
                    <div class='col-6 form-group'>
                        <label for='correo'>Correo Electrónico</label>
                        <input type='email' class='form-control' id='correo' required>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-6 form-group'>
                        <label for='direccionform'>Dirección Completa</label>
                        <input type='text' class='form-control' id='direccionform' required>
                    </div>
                    <div class='col-6 form-group'>
                        <label for='tlfform'>Teléfono</label>
                        <input type='tel' class='form-control' id='tlfform' required>
                    </div>
                </div>
                <button id='registroboton' class='btn btn-primary'>Registrarse</button>
            </form>
        </div>
        <div id='mensaje'></div>
    `;
    cuerpo.appendChild(div);
}
function insertar(){
    let usuario=document.getElementById("usuarioform").value;
    let contraseña=document.getElementById("contraseña").value;
    let nombre=document.getElementById("nombreape").value;
    let correo=document.getElementById("correo").value;
    let direccion=document.getElementById("direccionform").value;
    let tlf=document.getElementById("tlfform").value;
    let xhr=new XMLHttpRequest();
    xhr.open("POST","php/insertar.php",true);
    let data=new FormData();
    data.append("usuario",usuario);
    data.append("contraseña",contraseña);
    data.append("nombre",nombre);
    data.append("correo",correo);
    data.append("direccion",direccion);
    data.append("tlf",tlf);
    xhr.send(data);
    xhr.onload=function(){
        document.getElementById("mensaje").innerHTML=xhr.responseText
    if(xhr.responseText==="Registro exitoso!"){
        setTimeout(contenido,4000)

    }
}
    
}


document.getElementById("cuerpo").addEventListener("click", function(e) {
    if (e.target && e.target.id === "registrar") {
        registrar();  
    }
});
document.getElementById("cuerpo").addEventListener("click", function(e) {
    if (e.target && e.target.id === "registroboton") {
e.preventDefault();
insertar();
    }});
    
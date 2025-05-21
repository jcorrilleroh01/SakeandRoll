        let bandera=0
              let fechita= new Date();
        let dia = fechita.getDate();
        let mes = fechita.getMonth() + 1;
        let año = fechita.getFullYear();
        let fecha = dia+"/"+mes+"/"+año; 

function login(){
    document.getElementById("navbar").style.display="none";
        cuerpo.innerHTML="";
        let div=document.createElement("div");
        div.id="login";
        div.innerHTML="<div class='m-5'><h1>Iniciar Sesión</h1><br><form><div class='form-group'><label for='exampleInputEmail1'>Usuario</label><input type='text' class='form-control' id='usuariologin' ></div><div class='form-group'><label>Contraseña</label><input type='password' class='form-control' id='contraseñalogin'></div><button id='sesion' class='btn btn-primary'>Iniciar Sesión</button></form><label>Si no tienes cuenta<div id='registrar'> Regístrate</div></label>        <div id='mensaje2'></div></div>";
        cuerpo.appendChild(div); 

    } 

    function loguear(){ 
        let usuario=document.getElementById("usuariologin").value;
        let contraseña=document.getElementById("contraseñalogin").value;
        let xhr=new XMLHttpRequest();
        xhr.open("POST","php/login.php",true);
        let data=new FormData();
        data.append("usuario",usuario);
        data.append("contraseña",contraseña);
        data.append("fecha",fecha);
        xhr.send(data);        
        xhr.onload=function(){
            if(xhr.responseText.length<12){   
                setTimeout(contenido,2000)
                document.getElementById("mensaje2").innerHTML="<div class='text-success'>"+xhr.responseText+"</div>"
                bandera=1                
                document.getElementById("bienvenido").innerHTML="Bienvenido,<span id='nombre'>"+usuario+"</span>";

                let xhr2=new XMLHttpRequest();
                xhr2.open("POST","php/actualizarpuntos.php",true);
         
                let data=new FormData();
                data.append("usuario",usuario);
                data.append("puntos",100);
                data.append("fecha",fecha);
                xhr2.send(data);



            }else{
                document.getElementById("mensaje2").innerHTML="<div class='text-danger'>"+xhr.responseText+"</div>"
            }
        }
    }

    document.getElementById("usuario").addEventListener("click",login);
    document.getElementById("cuerpo").addEventListener("click", function(e) {
        if (e.target && e.target.id === "sesion") {
    e.preventDefault();
    loguear();
        }});
      
function PrincipalPgn(){
    window.location.href = "PrincipalCliente.html";
}

function AdminPgn(){
    window.location.href = "Admin.html";
}

function AdminIngreso(){
    const usuario = document.getElementById("usuario").value.trim();
if(!usuario.includes(".ADMIN.midulceantojo")){
    alert("❌ Seccion solo para administradores ❌");
        return false;
}

    const password = document.getElementById("password").value.trim();
    if(!password.includes("12345678ADMIN")){
        alert("Contraseña Incorrecta");
        return false;
    }
window.location.href = "WelcomeAdmin.html"
}

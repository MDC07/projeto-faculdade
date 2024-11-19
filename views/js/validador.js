
function validarDadosPasseio() {

    let campo_local = document.forms["cadastro_passeio"]["local"].value;
         
    if (campo_local == "") {

        alert("Campo Local precisa ser preenchido!");
        return false;
    }
}

function validarDadosCliente() {
    
}
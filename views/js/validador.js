
function validarDadosPasseio() {

    let campo_local = document.forms["cadastro_passeio"]["local"].value;
         
    if (campo_local == "") {

        alert("Campo Local precisa ser preenchido!");
        return false;
    }

    let campo_vagas = document.forms["cadastro_passeio"]["vagas"].value;

    if (typeof campo_vagas !== 'number' || campo_vagas < 0) {
        console.error("Erro: 'vagas' precisa ser um número válido e maior ou igual a zero.");
        return;
      }
}

function validarDadosCliente() {
    const nome = document.getElementById("nome").value.trim();
    const fone = document.getElementById("fone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome) {
        alert("Por favor, preencha o campo Nome.");
        return false;
    }

    if (!fone && !email) {
        alert("Por favor, preencha pelo menos um dos campos: Telefone ou E-mail.");
        return false;
    }

    return true;
}
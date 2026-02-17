const trocaDeTema = document.getElementById("toggleTema");
const themeIcon = trocaDeTema.querySelector("img");

function atualizarIcone(isDark) {
    if (isDark) {
        themeIcon.setAttribute("src", "/images/sun.svg");
        themeIcon.setAttribute("alt", "Logo do Sol - Tema Claro");
    } else {
        themeIcon.setAttribute("src", "/images/moon.svg");
        themeIcon.setAttribute("alt", "Logo da Lua - Tema Escuro");
    }
}

if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark-mode");
    atualizarIcone(true);
}

trocaDeTema.addEventListener("click", function (event) {
    event.preventDefault();

    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("tema", isDark ? "escuro" : "claro");

    atualizarIcone(isDark);
});


$(document).ready(function () {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("dados.logradouro");
        $("#bairro").val("dados.bairro");
        $("#cidade").val("dados.localidade");
        $("#uf").val("dados.uf");
        $("#ibge").val("dados.ibge");
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                $("#ibge").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        // Salva os dados em variáveis JS
                        var rua = dados.logradouro;
                        var bairro = dados.bairro;
                        var cidade = dados.localidade;
                        var uf = dados.uf;
                        var ibge = dados.ibge;
                        // Mostra no console para você ver
                        console.log("Rua:", rua);
                        console.log("Bairro:", bairro);
                        console.log("Cidade:", cidade);
                        console.log("UF:", uf);
                        console.log("IBGE:", ibge);
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").val(rua);
                        $("#bairro").val(bairro);
                        $("#cidade").val(cidade);
                        $("#uf").val(uf);
                        $("#ibge").val(ibge);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});
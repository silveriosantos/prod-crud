ajax = new XMLHttpRequest();
var lista;
var api = "https://atividade-backend01.herokuapp.com/api/produto/";

function listar() {    
    ajax.open("GET", api);
    ajax.send();    
    ajax.onload = function () {
        lista = this.responseText;        
        lista = JSON.parse(lista);       
        texto = "";
        i = 0;
        for (const p of lista) {
            texto += `<tr onclick='editar(${i})'><td>${p.nome}</td><td>${p.descricao}</td><td>${p.valor}</td></tr>`;
            i++;
        }
        document.getElementById('lista').innerHTML = texto;
    }
}

function editar(i) {
    p = lista[i];
    document.getElementById("nome").value = p.nome;
    document.getElementById("descricao").value = p.descricao;
    document.getElementById("valor").value = p.valor;
    document.getElementById("id").value = p.id;
}

function gravar() {
  
    var produto = {};
    produto.nome = document.getElementById("nome").value;
    produto.descricao = document.getElementById("descricao").value;
    produto.valor = document.getElementById("valor").value;    

    produto.id = document.getElementById("id").value;
    if (produto.id > 0) {
        acao = "PUT"; // alteração
    } else {
        acao = "POST"; // incluir
    }

    ajax.open(acao, api);
    ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    ajax.send(JSON.stringify(produto));
    ajax.onload = function () {
        // console.log(this.responseText);
        listar();
        limpar();
    }
}

function limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("id").value = "";
}

function apagar() {
    id = document.getElementById("id").value;
    ajax.open("DELETE", api + id);
    ajax.send();
    ajax.onload = function () {
        alert(this.responseText);
        listar();
        limpar();
    }
}
listar();
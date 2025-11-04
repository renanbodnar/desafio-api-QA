// teste da API de login serverest em que dois cenarios são testados: exclusao de carrinho de compras e adicao de carrinho de compras
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

import { testarLogin } from "./login.js";
// logando para pegar o token
let token_acesso = await testarLogin();

async function testarExclusaoCarrinho() {
  // efetua a exclusao do carrinho para caso haja algo nele e atrapalhe o outro cenario
  // cenario testado: avaliar a exclusao do carrinho, idependente de haver um, ou nao
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization",token_acesso);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://serverest.dev/carrinhos/cancelar-compra",requestOptions);

    // caso o retorno seja JSON, faz o parse:
    const result = await response.json();
    console.log("Resultado:", result);

    return result;
  } catch (error) {
    console.error("Erro ao cancelar carrinho:", error);
  }
}

// executa
let resultado_exclusao = await testarExclusaoCarrinho(token_acesso);

// validacao 1
let resultado1 = false;
if (resultado_exclusao && JSON.stringify(resultado_exclusao).includes("Não foi encontrado")) {
  resultado1 = "Aprovado";
}
else{
  resultado1 = "Reprovado";
}

async function testarCadastroCarrinho(token_acesso) {
  // simula a adicao de um item ao carrinho de compras
  // cenario 2: testar comportamento ao cadastrar um item no carrinho de compras
  const myHeaders2 = new Headers();
  myHeaders2.append("Content-Type", "application/json");
  myHeaders2.append("Accept", "application/json");
  myHeaders2.append("Authorization", token_acesso);

  const raw = JSON.stringify({
    "produtos": [
      {
        "idProduto": "BeeJh5lz3k6kSIzA",
        "quantidade": 3
      }
    ]
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders2,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch("https://serverest.dev/carrinhos", requestOptions);
    const result = await response.json(); // parse automático da resposta JSON
    console.log("Resultado:", result);
    return result;
  } catch (error) {
    console.error("Erro ao cadastrar carrinho:", error);
  }
}

// executa
let resultado_cadastro = await testarCadastroCarrinho(token_acesso);

// executa funcao de exclusao novamente para deixar o teste limpo
await testarExclusaoCarrinho(token_acesso);

// validacao 2
let resultado2 = false;
if (resultado_cadastro && JSON.stringify(resultado_cadastro).includes("sucesso")) {
  resultado2 = "Aprovado";
}
else{
  resultado2 = "Reprovado";
}

// resultado final: se os dois cenarios de teste tiverem seus resultados esperados, sera aprovado. Caso um cenario tenha falha, o resultado sera reprovado
console.log('Cenario 1: ',resultado1,"\n");
console.log('Cenario 2: ',resultado2,"\n");

if (resultado1 === "Aprovado" && resultado2 === "Aprovado") {
  console.log("TESTE APROVADO!");
} 
else {
  console.log("TESTE REPROVADO!");
}

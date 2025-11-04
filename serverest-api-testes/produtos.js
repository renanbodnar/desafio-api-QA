// teste da API de produtos serverest em que dois cenarios sao testados: retorno de dados em caso de id correto e incorreto

// cadastrando o produto
import { cadastroProduto } from "./cadastro.js";
let id_produto = await cadastroProduto();
console.log("O id eh: ",id_produto);

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

async function testarProduto(id_produto) {
    // cenario1: procurar produto com o id correto | esperado: retornar dados do produto
    const response1 = await fetch(`https://serverest.dev/produtos/${id_produto}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    });

    const result1 = await response1.json();
    console.log(result1, "\n");

    // validacao 1
    let resultado1 = false;
    if (response1.ok && JSON.stringify(result1).includes("Testador humano")) {
        resultado1 = "Aprovado";
    }
    else{
        resultado1 = "Reprovado";
    }

    // cenario 2: procurar produto com o id incorreto | esperado: aviso de produto nao encontrado
    const response2 = await fetch("https://serverest.dev/produtos/BeeJh5lz3k6kSIyX", {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    });

    const result2 = await response2.json();
    console.log(result2, "\n");

    // validacao 2
    let resultado2 = false;
    if (!response2.ok && JSON.stringify(result2).includes("não encontrado")) {
        resultado2 = "Aprovado";
    }
    else{
        resultado2 = "Reprovado";
    }

    // resultado final: se os dois cenarios de teste tiverem seus resultados esperados, sera aprovado. Caso um cenario tenha falha, o resultado sera reprovado
    console.log('Cenario 1 produto: ',resultado1,"\n");
    console.log('Cenario 2 produto: ',resultado2,"\n");
  
    if (resultado1 === "Aprovado" && resultado2 === "Aprovado") {
        console.log("TESTE APROVADO!");
    } else {
        console.log("TESTE REPROVADO!");
    }

}

// executa
testarProduto(id_produto);

// teste da API de produtos serverest
const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

async function testarProduto() {
    // cenario1: procurar produto com o id correto | esperado: retornar dados do produto
    const response1 = await fetch("https://serverest.dev/produtos/BeeJh5lz3k6kSIzA", {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    });

    const result1 = await response1.json();
    console.log(result1, "\n");

    // validacao1
    let resultado1 = false;
    if (response1.ok && JSON.stringify(result1).includes("Logitech MX Vertical")) {
        resultado1 = "Aprovado";
    }
    else{
        resultado1 = "Reprovado";
    }

    // cenario2: procurar produto com o id incorreto | esperado: aviso de produto nao encontrado
    const response2 = await fetch("https://serverest.dev/produtos/BeeJh5lz3k6kSIzB", {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    });

    const result2 = await response2.json();
    console.log(result2, "\n");

    // validacao2
    let resultado2 = false;
    if (!response2.ok && JSON.stringify(result2).includes("não encontrado")) {
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
    } else {
        console.log("TESTE REPROVADO!");
    }

}

// executa
testarProduto();

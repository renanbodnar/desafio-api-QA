// teste da API de usuarios serverest
const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

async function testarUsuario() {
    // cenario1: procurar usuario com o id correto | esperado: retornar dados do usuario
    // id para a procura do usuario
    const id_correto = "0uxuPY0cbmQhpEz1";

    const response1 = await fetch(`https://serverest.dev/usuarios/${id_correto}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    });

    const result1 = await response1.json();
    console.log(result1, "\n");

    // validacao1
    let resultado1 = false;
    if (response1.ok && JSON.stringify(result1).includes("Esther")) {
        resultado1 = "Aprovado";
    }
    else{
        resultado1 = "Reprovado";
    }

    // cenario2: procurar usuario com o id incorreto | esperado: aviso de cliente nao encontrado
    // id para a procura do usuario
    const id_incorreto = "0uxuPY0cbmQhpEz2";

    const response2 = await fetch(`https://serverest.dev/usuarios/${id_incorreto}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    });

    const result2 = await response2.json();
    console.log(result2, "\n");

    // validacao2
    let resultado2 = false;
    if (!response2.ok && result2.message && result2.message.includes("não encontrado")) {
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
testarUsuario();
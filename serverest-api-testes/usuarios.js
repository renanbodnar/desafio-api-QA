// teste da API de usuarios serverest em que dois cenarios sao testados: retorno da API em caso de input de id correto e incorreto

// sera usado no final
import { excluiUsuario } from "./cadastro.js";

// cadastrando o usuario, pois ele eh temporario. Caso ainda esteja ativo, o teste nao funcionara!!!
import { cadastroUsuario } from "./cadastro.js";
const email = "testenovousuario@venus.com";
const senha = "pizza12345";
let id_usuario = await cadastroUsuario(email,senha);
console.log(id_usuario);

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

async function testarUsuario(id_usuario) {
    // cenario 1: procurar usuario com o id correto | esperado: retornar dados do usuario
    // id para a procura do usuario
    const id_correto = id_usuario;

    const response1 = await fetch(`https://serverest.dev/usuarios/${id_correto}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    });

    const result1 = await response1.json();
    console.log(result1, "\n");

    // validacao 1
    let resultado1 = false;
    if (response1.ok && JSON.stringify(result1).includes("Desafio API")) {
        resultado1 = "Aprovado";
    }
    else{
        resultado1 = "Reprovado";
    }

    // cenario 2: procurar usuario com o id incorreto | esperado: aviso de cliente nao encontrado
    // id para a procura do usuario
    const id_incorreto = "tgOnGdLTf2FVQhr1";

    const response2 = await fetch(`https://serverest.dev/usuarios/${id_incorreto}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    });

    const result2 = await response2.json();
    console.log(result2, "\n");

    // validacao 2
    let resultado2 = false;
    if (!response2.ok && result2.message && result2.message.includes("não encontrado")) {
        resultado2 = "Aprovado";
    }
    else{
        resultado2 = "Reprovado";
    }

  // resultado final: se os dois cenarios de teste tiverem seus resultados esperados, sera aprovado. Caso um cenario tenha falha, o resultado sera reprovado
  console.log('Cenario 1 usuario: ',resultado1,"\n");
  console.log('Cenario 2 usuario: ',resultado2,"\n");
  
  if (resultado1 === "Aprovado" && resultado2 === "Aprovado") {
    console.log("TESTE DE USUARIO APROVADO!");
  } else {
    console.log("TESTE DE USUARIO REPROVADO!");
  }
}

// executa
await testarUsuario(id_usuario);

// executa funcao para excluir usuario criado
await excluiUsuario(id_usuario);

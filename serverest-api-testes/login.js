// teste da API de login serverest em que dois cenarios são testados: login bem-sucedido e login falho

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

export async function testarLogin() {
  // cenário 1: testar credenciais corretas | esperado: resposta de login com sucesso
  const raw = JSON.stringify({
    "email": "desserverest@apiteste.com",
    "password": "apisenha"
  });

  const response1 = await fetch("https://serverest.dev/login", {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  });

  const result1 = await response1.json();
  console.log(result1, "\n");

  // verificacao 1
  let resultado1 = false;
  if (response1.ok && result1.message.includes("sucesso")) {
    resultado1 = "Aprovado";
  }
  else{
    resultado1 = "Reprovado:";
    console.log("Verifique se o usuario esta cadastrado","\n")
  }
  // cenário 2: testar credenciais incorretas | esperado: resposta indicando e-mail ou senha incorretos
  const raw2 = JSON.stringify({
    "email": "desafio@api.com.br",
    "password": "desafioapis"
  });

  const response2 = await fetch("https://serverest.dev/login", {
    method: "POST",
    headers: myHeaders,
    body: raw2,
    redirect: "follow"
  });

  const result2 = await response2.json();
  console.log(result2, "\n");

  // verificacao 2
  let resultado2 = false;
  if (!response2.ok && result2.message.includes("inválidos")) {
    resultado2 = "Aprovado";
  }
  else{
    resultado2 = "Reprovado";
  }

  // resultado final: se os dois cenarios de teste tiverem seus resultados esperados, sera aprovado. Caso um cenario tenha falha, o resultado geral sera reprovado
  console.log('Cenario 1 login: ',resultado1,"\n");
  console.log('Cenario 2 login: ',resultado2,"\n");
  
  if (resultado1 === "Aprovado" && resultado2 === "Aprovado") {
    console.log("TESTE APROVADO!");
  } else {
    console.log("TESTE REPROVADO!");
  }

  return result1.authorization;
}

// executa
testarLogin();

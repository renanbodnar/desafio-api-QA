const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

async function Login() {
  // cenário 1: testar credenciais corretas | esperado: resposta de login com sucesso
  const raw = JSON.stringify({
    "email": "fulano@qa.com",
    "password": "teste"
  });

  const response = await fetch("https://serverest.dev/login", {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  });

  const result = await response.json();
  console.log(result, "\n");
  const token = result.authorization;

  return token;
}

//executa login para obter token
let token_acesso = await Login();

async function testarExclusaoCarrinho() {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append(
    "Authorization",token_acesso);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://serverest.dev/carrinhos/cancelar-compra",
      requestOptions
    );

    // caso o retorno seja JSON, faz o parse:
    const result = await response.json();
    console.log("Resultado:", result);

    return result;
  } catch (error) {
    console.error("Erro ao cancelar carrinho:", error);
  }
}

// executa
await testarExclusaoCarrinho(token_acesso);

async function testarCadastroCarrinho(token_acesso) {
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
await testarCadastroCarrinho(token_acesso);

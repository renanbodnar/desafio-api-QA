// efetua o cadastro do usuario para os testes, pois ele eh apagado apos certo tempo e eh necessario refazer o cadastro

// sera usado mais abaixo
import { testarLogin } from "./login.js";

export async function cadastroUsuario(email = "desserverest@apiteste.com", senha = "apisenha") {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  const raw = JSON.stringify({
    "nome": "Desafio API",
    "email": email,          // usa o parâmetro, se informado
    "password": senha,       // idem
    "administrador": "true"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch("https://serverest.dev/usuarios", requestOptions);

    // se o retorno for JSON:
    const result = await response.json();
    console.log("Resultado:", result._id);

    return result._id;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
  }

}

// executa a função
await cadastroUsuario();

// efetua o cadastro de um produto para o usuario
export async function cadastroProduto() {

  // logando para pegar o token
  let token_user = await testarLogin();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append(
    "Authorization",token_user);

  const raw = JSON.stringify({
    "nome": "Testador humano",
    "preco": 100,
    "descricao": "Produto para teste de APIs",
    "quantidade": 1000
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch("https://serverest.dev/produtos", requestOptions);
    const result = await response.json();

    console.log("Resultado do cadastro:", result);

    return result._id;
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
  }
}

// executa
//cadastroProduto();

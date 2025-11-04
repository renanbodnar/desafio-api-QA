# Projeto de Testes de API – Serverest

Este projeto tem como objetivo automatizar os principais cenários de teste da API [Serverest](https://serverest.dev/).

---

## Instalação e Execução

### 1️. Clonar o repositório
git clone https://github.com/renanbodnar/desafio-api-QA.git

cd serverest-API-QA


### 2. Executar os testes
node nomeDoArquivo.js

### 3. Sequência de testes e orientações **(FUNDAMENTAL SEGUIR A ORDEM PARA O FUNCIONAMENTO ADEQUADO)!!!**

1. **cadastro.js** (garantir que o usuario esteja cadastrado antes de qualquer coisa)
    obs: o arquivo contém funções que cadastram e excluem (usuário e produto) para viabilidade de repetições 
2. **login.js** (testará o login)
3. **usuarios.js** (testa a busca pelo id)
4. **produtos.js** (procura produto pelo id)
5. **carrinhos.js** (cadastra e exclui carrinho de compras)

---

## Cenários Importantes para Automatização

| Cenário | Descrição |
|----------|------------|
| **Cadastro de Usuário** | Valida a criação de um novo usuário com dados válidos. |
| **Login de Usuário** | Verifica o processo de autenticação e retorno do token de acesso. |
| **Cadastro de Produto** | Testa a criação de um produto com campos obrigatórios preenchidos corretamente. |
| **Listagem de Produtos** | Garante que a API retorne corretamente a lista de produtos disponíveis. |
| **Cadastro de Carrinho** | Simula o processo de adicionar produtos ao carrinho. |
| **Exclusão de Carrinho** | Testa a exclusão/cancelamento de um carrinho ativo. |
| **Exclusão de Usuário** | Valida se o endpoint de exclusão de usuário funciona corretamente. |
| **Exclusão de Produto** | Garante que o produto seja removido com sucesso e não apareça em listagens futuras. |

---

## Critérios de Escolha dos Cenários

Os cenários acima foram selecionados por representarem o **fluxo principal de uso da API Serverest**, cobrindo as funcionalidades essenciais:
- **Criação e autenticação de usuários**
- **Gerenciamento de produtos**
- **Simulação de processo de compra**

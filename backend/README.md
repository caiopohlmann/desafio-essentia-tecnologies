# Projeto Backend de Tarefas

Este é o backend para o projeto de tarefas, desenvolvido com Node.js, MySQL e Sequelize. Este servidor fornece as APIs necessárias para gerenciar listas e tarefas.

## Requisitos

- Node.js (v18.20.4 ou superior)
- MySQL (com servidor rodando na porta padrão 3306)
- Sequelize CLI

## Configuração do Banco de Dados

1. Crie um banco de dados MySQL com o nome `tasksdb`:

    - **Hostname:** 127.0.0.1
    - **Porta:** 3306
    - **Username:** root

2. Certifique-se de que o servidor MySQL está rodando.

## Instalação e Configuração

1 Instale as dependências:

    ```bash
    npm install
    ```

2. Crie as tabelas no banco de dados:

    ```bash
    node create-tables.js
    ```

3. Verifique a conexão com o banco de dados:

    ```bash
    node test-connection.js
    ```

    Certifique-se de que a mensagem `Connection has been established successfully.` é exibida.

4. Inicie o servidor:

    ```bash
    npm start
    ```

    O servidor deve estar rodando ao mesmo tempo que o front-end.

## Scripts Disponíveis

- `npm start`: Inicia o servidor backend.
- `node create-tables.js`: Cria as tabelas necessárias no banco de dados.
- `node test-connection.js`: Testa a conexão com o banco de dados.


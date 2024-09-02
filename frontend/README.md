# Projeto Front-End

Este é o front-end para o projeto. Desenvolvido com Angular, este aplicativo se comunica com um backend para gerenciar listas e tarefas.

## Requisitos

- Node.js (v18.20.4 ou superior)
- Angular CLI

## Instalação

1. Instale as dependências:

    ```bash
    npm install
    ```

2. (Opcional) Se você encontrar problemas relacionados ao OpenSSL, pode precisar definir a variável de ambiente:

    No Windows PowerShell:

    ```powershell
    $env:NODE_OPTIONS="--openssl-legacy-provider"
    ```

    No Linux/MacOS:

    ```bash
    export NODE_OPTIONS="--openssl-legacy-provider"
    ```

## Rodando o Projeto

Inicie o servidor de desenvolvimento:

```bash
ng serve

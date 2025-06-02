# Nest Store Application

## Descrição

Este projeto é uma aplicação de e-commerce construída com o framework [NestJS](https://nestjs.com/). Ele utiliza o banco de dados SQLite e Prisma ORM para gerenciar os dados. A aplicação possui funcionalidades como gerenciamento de produtos, carrinho de compras e lista de desejos.

---

## Configuração do Projeto

### Dependências

Certifique-se de ter as seguintes dependências instaladas:

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **SQLite** (banco de dados utilizado no projeto)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Pandor4b/nest-store.git
   cd nest-store
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados SQLite:

   - Certifique-se de que o arquivo `dev.db` está presente na pasta `prisma/`.
   - Caso contrário, execute as migrações para criar o banco de dados:
     ```bash
     npx prisma migrate dev
     ```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
     ```
     DATABASE_URL="file:./dev.db"
     ```

---

## Executando a Aplicação

### Modos de Execução

- **Desenvolvimento**:

  ```bash
  npm run start:dev
  ```

- **Produção**:
  ```bash
  npm run start:prod
  ```

A aplicação estará disponível em `http://localhost:3000`.

---

## Testes

### Executar os testes:

- **Unitários**:
  ```bash
  npm run test
  ```

---

## Endpoints

### Produtos (`/product`)

- **POST `/product/create`**: Criar um novo produto.
- **GET `/product`**: Listar todos os produtos.
- **GET `/product/:id`**: Obter detalhes de um produto pelo ID.
- **PUT `/product/:id`**: Atualizar um produto pelo ID.
- **DELETE `/product/:id`**: Excluir um produto pelo ID.

### Carrinho (`/cart`)

- **POST `/cart/add`**: Adicionar um produto ao carrinho.
- **GET `/cart`**: Listar os itens do carrinho.
- **PUT `/cart/:id`**: Atualizar a quantidade de um item no carrinho.
- **DELETE `/cart/:id`**: Remover um item do carrinho.
- **DELETE `/cart/clear`**: Limpar o carrinho.
- **POST `/cart/checkout`**: Finalizar a compra.
- **GET `/cart/history`**: Obter o histórico de compras.

### Lista de Desejos (`/wishlist`)

- **POST `/wishlist/add`**: Adicionar um produto à lista de desejos.
- **GET `/wishlist`**: Listar os itens da lista de desejos.
- **DELETE `/wishlist/:id`**: Remover um item da lista de desejos.

---

## Documentação da API

A documentação da API está disponível no Swagger. Para acessá-la, siga os passos abaixo:

1. Inicie a aplicação:

   ```bash
   npm run start:dev
   ```

2. Abra o navegador e acesse:
   ```
   http://localhost:3000/api
   ```

A documentação inclui todos os endpoints disponíveis, os parâmetros esperados e exemplos de requisições e respostas.

---

## Estrutura do Projeto

- **`src/`**: Código-fonte da aplicação.
- **`prisma/`**: Arquivos de configuração e migrações do banco de dados.
- **`test/`**: Testes end-to-end.

---

## Recursos Adicionais

- [Documentação do NestJS](https://docs.nestjs.com)
- [Documentação do Prisma](https://www.prisma.io/docs)

---

## Licença

Este projeto é licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

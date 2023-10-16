# Arani's Somos Take Home

This is my take on the Somos take home task. Please review

## Setup

- First run `npm install`
- Run `npm run start` to start the GraphQL Server. This generates the GraphQL Query types and spins up an Apollo GraphQL Server
- Once running, you can go to `http://localhost:4000/` to interact with the server via Apollo Explorer.
- Run `npm run codegen` to generate GraphQL Typescript types without needing to run the server.
- Run `npm run test` to run test cases.

## GraphQL Endpoints

You can also see all of the documentation on the Schema tab in the Apollo Explorer after going to `http://localhost:4000/`

### Queries

| Query             | Description               |
| ----------------- | ------------------------- |
| getBook(id:int)   | Get a specific book       |
| getBooks          | Get all available books   |
| getAuthor(id:int) | Get a specific author     |
| getAuthors        | Get all available authors |

### Mutations

| Mutation                     | Description                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| updateBook(id:int book:Book) | update a specific book                                                             |
| removeBook(id:int)           | removes a book                                                                     |
| addBook(book:Book)           | adds a book                                                                        |
| addAuthor(author:Author)     | adds an author (in order to add an author to a book you need to add/update a book) |
| removeAuthor(id:int)         | removes author (in order to remove an author from a book, use updateBook)          |

## Project Structure

Each section is a specific folder in `/src`. This describes the purpose

### DB

This directory houses all of the code that interacts with the database or any external connection. Keeping these connections separate so that it is more modular.In this case, the database is just in memory state.

### Entities

This directory holds all of the necessary types, interfaces, and error classes involved with a entity in the application. In this case, there are 2 entities: Book and Author.

### Usecases

This directory is where all of the business logic is held. The code here will

### Schemas

This directory holds all of the GraphQL schemas.

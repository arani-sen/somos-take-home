import { readFileSync } from "fs";
import { dirname } from "path";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  MutationAddAuthorArgs,
  MutationAddBookArgs,
  MutationRemoveAuthorArgs,
  MutationRemoveBookArgs,
  MutationUpdateAuthorArgs,
  MutationUpdateBookArgs,
  QueryGetAuthorArgs,
  QueryGetBookArgs,
} from "./generated/graphql";
import { BookDB } from "./DB/BookDB";
import { BookUseCase } from "./usecases/Book";
import { AuthorUseCase } from "./usecases/Author";

const queries = readFileSync(`./src/schemas/queries.graphql`, {
  encoding: "utf-8",
});

const mutations = readFileSync("./src/schemas/mutations.graphql", {
  encoding: "utf-8",
});

const types = readFileSync("./src/schemas/types.graphql", {
  encoding: "utf-8",
});

const inputTypes = readFileSync("./src/schemas/inputs.graphql", {
  encoding: "utf-8",
});

const typeDefs = [types, inputTypes, queries, mutations];

// All instances of code that handles the database calls
const booksDB = new BookDB();

//Instances of usecases
const book = new BookUseCase(booksDB);
const author = new AuthorUseCase(booksDB);
const resolvers = {
  Query: {
    getBooks: () => book.getBooks(),
    getBook: (_, args: QueryGetBookArgs) => book.getBook(args.id),
    getAuthors: () => author.getAuthors(),
    getAuthor: (_, args: QueryGetAuthorArgs) => author.getAuthor(args.id),
  },
  Mutation: {
    addBook: (_, args: MutationAddBookArgs) => book.addBook(args.book),
    updateBook: (_, args: MutationUpdateBookArgs) =>
      book.updateBook(args.id, args.book),
    removeBook: (_, args: MutationRemoveBookArgs) => book.removeBook(args.id),

    addAuthor: (_, args: MutationAddAuthorArgs) =>
      author.addAuthor(args.author),
    updateAuthor: (_, args: MutationUpdateAuthorArgs) =>
      author.updateAuthor(args.id, args.author),
    removeAuthor: (_, args: MutationRemoveAuthorArgs) =>
      author.removeAuthor(args.id),
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main();

import { readFileSync } from "fs";
import { dirname } from "path";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  MutationAddBookArgs,
  MutationRemoveBookArgs,
  MutationUpdateBookArgs,
  QueryGetBookArgs,
} from "./generated/graphql";
import { BookDB } from "./DB/BookDB";
import { BookUseCase } from "./usecases/Book";

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

const resolvers = {
  Query: {
    getBooks: () => book.getBooks(),
    getBook: (_, args: QueryGetBookArgs) => book.getBook(args.id),
  },
  Mutation: {
    addBook: (_, args: MutationAddBookArgs) => book.addBook(args.book),
    updateBook: (_, args: MutationUpdateBookArgs) =>
      book.updateBook(args.id, args.book),
    removeBook: (_, args: MutationRemoveBookArgs) => book.removeBook(args.id),
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

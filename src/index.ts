import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  MutationAddBookArgs,
  MutationRemoveBookArgs,
  MutationUpdateBookArgs,
  QueryBookArgs,
} from "./generated/graphql";
import { BookDB } from "./DB/BookDB";
import { BookUseCase } from "./usecases/Book";

const queries = ` 
  type Query {
    """
    This will provide a list of books.
    """
    books: [Book]

    """
    When given a specific id, this will return a specific book. 
    """
    book(id: Int!): Book
  }
`;

const mutations = ` 
  type Mutation {
    """
    This will add a book to the "database". 
    Returns the book that was added. 
    """
    addBook(book:BookInput!): Book

    """
    This will update a specific book in the "database". 
    Returns the newly updated book. 
    """
    updateBook(id: Int!, book: BookInput!): Book

    """
    When given a specific id, this will remove the book from the "database"
    """
    removeBook(id: Int!): String
  }
`;

const types = `
  """
  Information on the Book
  """
  type Book {
    title: String
    author: Author
    coverImage: String
    publishedDate: String
  }

  """
  Information of the Author
  """
  type Author {
    firstName: String
    lastName: String
    birthDate: String
  }
`;

const inputTypes = `
  input BookInput {
    title: String!
    author: AuthorInput!
    coverImage: String
    publishedDate: String
  }

  input AuthorInput {
    firstName: String!
    lastName: String!
    birthDate: String
  }
`;

const typeDefs = `#graphql
  ${types}
  
  ${inputTypes}

  ${queries}

  ${mutations}
`;

// All instances of code that handles the database calls
const booksDB = new BookDB();

//Instances of usecases
const book = new BookUseCase(booksDB);

const resolvers = {
  Query: {
    books: () => book.getBooks(),
    book: (_, args: QueryBookArgs) => book.getBook(args.id),
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

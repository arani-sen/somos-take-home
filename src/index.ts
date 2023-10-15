import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const queries = ` 
  type Query {
    """
    This will provide a list of books.
    """
    books: [Book]

    """
    When given a specific id, this will return a specific book. 
    """
    book(id: String): Book
  }
`;

const mutations = ` 
  type Mutation {
    """
    This will add a book to the "database". 
    Returns the book that was added. 
    """
    addBook(book:BookInput): Book

    """
    This will update a specific book in the "database". 
    Returns the newly updated book. 
    """
    updateBook(id: Int!, book: BookInput): Book

    """
    When given a specific id, this will remove the book from the "database"
    """
    removeBook(id: Int!): String
  }
`;

const types = `
  type Book {
    title: String
    author: Author
    coverImage: String
    publishedDate: String
  }

  """
    This type will provide all of full name of an author
  """
  type Author {
    firstName: String!
    lastName: String!
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
const resolvers = {
  Query: {
    books: () => books,
    book: (_, args) => args.random + " insert",
  },
  Mutation: {
    addBook: () => {},
    updateBook: () => {},
    removeBook: () => {},
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

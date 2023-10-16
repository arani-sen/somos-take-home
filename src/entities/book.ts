import { Author } from "./author";

export interface IBooksDB {
  getBook: (id: number) => Book;
  getAllBooks: () => Book[];
  insertBook: (book: Omit<Book, "id">) => Book;
  updateBook: (id: number, bookUpdate: Book) => Book;
  deleteBook: (id: number) => Book[];

  getAuthor: (id: number) => Author;
  getAllAuthors: () => Author[];
  insertAuthor: (book: Omit<Author, "id">) => Author;
  updateAuthor: (id: number, authorUpdate: Author) => Author;
  deleteAuthor: (id: number) => Author[];
}

export type Book = {
  id: number;
  title: string;
  authorID: number;
  coverImage?: String; // URL to location of the cover image
  publishedDate: Date;
};

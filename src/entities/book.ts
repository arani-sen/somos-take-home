import { Author } from "./author";

export interface IBooksDB {
  get: (id: number) => Book;

  getAll: () => Book[];

  add: (book: Book) => Book;
}

export type Book = {
  title: string;
  author: Author;
  coverImage?: String; // URL to location of the cover image
  publishedDate: Date;
};

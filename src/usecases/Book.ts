import { BookDB } from "../DB/BookDB";
import { Book } from "../entities/book";
import { BookInput } from "../generated/graphql";

export class BookUseCase {
  constructor(private bookDB: BookDB) {}

  getBook(index: number) {
    this.bookDB.get(index);
  }

  getBooks() {
    const books = this.bookDB
      .getAll()
      .map((currentBook) => this.dbToGraph(currentBook));
  }

  addBook(bookInput: BookInput) {
    const newBook = this.graphToDB(bookInput);

    const insertedBook = this.bookDB.add(newBook);

    return this.dbToGraph(insertedBook);
  }

  removeBook(index: number) {
    return this.bookDB.delete(index);
  }

  updateBook(index, bookInput: BookInput) {
    const updatedBook = {
      ...bookInput,
      author: {
        ...bookInput.author,
        birthDate: new Date(bookInput.author.birthDate),
      },
      publishedDate: new Date(bookInput.publishedDate),
    };

    this.bookDB.update(index, updatedBook);
  }

  private graphToDB(graphBook: BookInput) {
    return {
      ...graphBook,
      author: {
        ...graphBook.author,
        birthDate: new Date(graphBook.author.birthDate),
      },
      publishedDate: new Date(graphBook.publishedDate),
    };
  }

  private dbToGraph(dbBook: Book) {
    return {
      ...dbBook,
      author: {
        ...dbBook.author,
        birthDate: new Date(dbBook.author.birthDate),
      },
      publishedDate: new Date(dbBook.publishedDate),
    };
  }
}

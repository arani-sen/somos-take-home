import { BookDB } from "../DB/BookDB";
import { CannotFindAuthor } from "../entities/author";
import { Book } from "../entities/book";
import { BookInput } from "../generated/graphql";

export class BookUseCase {
  constructor(private bookDB: BookDB) {}

  getBook(id: number) {
    this.bookDB.getBook(id);
  }

  getBooks() {
    const books = this.bookDB
      .getAllBooks()
      .map((currentBook) => this.dbToGraph(currentBook));

    return books;
  }

  addBook(bookInput: BookInput) {
    const newBook = this.graphToDB(bookInput);
    this.checkIfAuthorExists(bookInput.authorID);
    const insertedBook = this.bookDB.insertBook(newBook);

    return this.dbToGraph(insertedBook);
  }

  removeBook(id: number) {
    return this.bookDB.deleteBook(id);
  }

  updateBook(id: number, bookInput: BookInput) {
    this.checkIfAuthorExists(bookInput.authorID);
    const updatedBook = this.graphToDB(bookInput);

    this.bookDB.updateBook(id, { id, ...updatedBook });
  }

  private checkIfAuthorExists(authorID: number) {
    const author = this.bookDB
      .getAllAuthors()
      .find((author) => author.id === authorID);

    if (!!author) throw new CannotFindAuthor("The author cannot be found");
  }

  private graphToDB(graphBook: BookInput) {
    return {
      ...graphBook,
      publishedDate: new Date(graphBook.publishedDate),
    };
  }

  private dbToGraph(dbBook: Book) {
    return {
      ...dbBook,
      publishedDate: dbBook.publishedDate.toString(),
    };
  }
}

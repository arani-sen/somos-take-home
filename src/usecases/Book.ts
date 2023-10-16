import { BookDB } from "../DB/BookDB";
import { CannotFindAuthor } from "../entities/author";
import { Book, CannotFindBook } from "../entities/book";
import { BookInput } from "../generated/graphql";

export class BookUseCase {
  constructor(private bookDB: BookDB) {}

  getBook(id: number) {
    const foundBook = this.bookDB.getBook(id);
    if (!foundBook) throw new CannotFindBook("Book was not found");

    const addedAuthor = this.addAuthorToBook(foundBook);
    return this.dbToGraph(addedAuthor);
  }

  getBooks() {
    const books = this.bookDB
      .getAllBooks()
      .map((book) => this.addAuthorToBook(book))
      .map((currentBook) => this.dbToGraph(currentBook));

    return books;
  }

  addBook(bookInput: BookInput) {
    const newBook = this.graphToDB(bookInput);
    this.checkIfAuthorExists(bookInput.authorID);
    const insertedBook = this.bookDB.insertBook(newBook);
    const authorAdded = this.addAuthorToBook(insertedBook);
    return this.dbToGraph(authorAdded);
  }

  removeBook(id: number) {
    const book = this.bookDB.getBook(id);

    if (!book) throw new CannotFindBook("Cannot find book to remove");

    return this.bookDB
      .deleteBook(id)
      .map((book) => this.addAuthorToBook(book))
      .map((currentBook) => this.dbToGraph(currentBook));
  }

  updateBook(id: number, bookInput: BookInput) {
    this.checkIfAuthorExists(bookInput.authorID);
    const bookToDb = this.graphToDB(bookInput);

    const updatedBook = this.bookDB.updateBook(id, { id, ...bookToDb });
    const authorAdded = this.addAuthorToBook(updatedBook);

    return this.dbToGraph(authorAdded);
  }

  private addAuthorToBook(book: Book) {
    const author = this.bookDB.getAuthor(book.authorID);
    const graphAuthor = {
      ...author,
      birthDate: author.birthDate.toString(),
    };

    return {
      ...book,
      author: graphAuthor,
    };
  }

  private checkIfAuthorExists(authorID: number) {
    const author = this.bookDB
      .getAllAuthors()
      .find((author) => author.id === authorID);

    if (!author) throw new CannotFindAuthor("The author cannot be found");
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

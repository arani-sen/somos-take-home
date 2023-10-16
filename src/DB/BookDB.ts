import { Book, IBooksDB } from "../entities/book";
import { Author } from "../entities/author";
export class BookDB implements IBooksDB {
  private bookList: Book[] = new Array<Book>();
  private authorList: Author[] = new Array<Author>();
  private bookID: number = 0;
  private authorID: number = 0;
  constructor() {}

  // Book Actions
  getBook(id: number) {
    return this.bookList.find((book) => book.id === id);
  }

  getAllBooks() {
    return this.bookList;
  }

  insertBook(book: Omit<Book, "id">) {
    const newBook: Book = { ...book, id: this.bookID };
    this.bookList.push(newBook);
    this.bookID++;
    return newBook;
  }
  updateBook(id: number, bookUpdate: Book) {
    this.bookList.map((book) => {
      if ((book.id = id)) return bookUpdate;
    });
    return bookUpdate;
  }

  deleteBook(id: number) {
    this.bookList.splice(id, 1);
    return this.bookList;
  }

  // Author Actions
  getAuthor(id: number) {
    return this.authorList.find((author) => author.id === id);
  }

  getAllAuthors() {
    return this.authorList;
  }

  insertAuthor(book: Omit<Author, "id">) {
    const newAuthor: Author = { ...book, id: this.authorID };
    this.authorList.push(newAuthor);
    this.authorID++;
    return newAuthor;
  }
  updateAuthor(id: number, authorUpdate: Author) {
    this.authorList.map((author) => {
      if ((author.id = id)) return authorUpdate;
    });
    return authorUpdate;
  }
  deleteAuthor(id: number) {
    this.authorList.splice(id, 1);
    return this.authorList;
  }
}

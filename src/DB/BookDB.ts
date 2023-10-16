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
    return this.bookList.find((book) => book.id === id) || null;
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
    this.bookList = this.bookList.map((book) => {
      if (book.id === id) return bookUpdate;
      return book;
    });
    return bookUpdate;
  }

  deleteBook(id: number) {
    const index = this.bookList.findIndex((book) => book.id === id);
    this.bookList.splice(index, 1);
    return this.bookList;
  }

  // Author Actions
  getAuthor(id: number) {
    return this.authorList.find((author) => author.id === id) || null;
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
    this.authorList = this.authorList.map((author) => {
      if (author.id === id) return authorUpdate;
      return author;
    });
    return authorUpdate;
  }
  deleteAuthor(id: number) {
    const index = this.authorList.findIndex((author) => author.id === id);
    this.authorList.splice(index, 1);
    return this.authorList;
  }
}

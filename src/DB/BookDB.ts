import { Book, IBooksDB } from "../entities/book";

export class BookDB implements IBooksDB {
  private bookList: Book[] = new Array<Book>();

  constructor() {}

  get(id: number) {
    return this.bookList[id];
  }

  getAll() {
    return this.bookList;
  }

  add(book: Book) {
    this.bookList.push(book);
    return book;
  }
  update(id: number, book: Book) {
    this.bookList[id] = book;
    return book;
  }
  delete(id: number) {
    this.bookList.splice(id, 1);
  }
}

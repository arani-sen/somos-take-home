import { BookDB } from "../DB/BookDB";
import { BookUseCase } from "../usecases/Book";

const fakeDB = jest.mocked(BookDB) as unknown as BookDB;
let book: BookUseCase;
describe("Book Use Case tests", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    book = new BookUseCase(fakeDB);
  });
  test("get book", () => {
    fakeDB.getBook = jest.fn().mockReturnValue({
      id: 1,
      authorID: 1,
      title: "a book",
      publishedDate: "2020-02-02",
      coverImageURL: "some.com",
    });
    fakeDB.getAuthor = jest.fn().mockReturnValue({
      id: 1,
      firstName: "firstname",
      lastName: "lastname",
      birthDate: new Date(),
    });
    const foundBook = book.getBook(1);
    expect(fakeDB.getBook).toHaveBeenCalledWith(1);
    expect(foundBook).toEqual({
      id: 1,
      authorID: 1,
      title: "a book",
      publishedDate: "2020-02-02",
      coverImageURL: "some.com",
      author: {
        id: 1,
        firstName: "firstname",
        lastName: "lastname",
        birthDate: new Date().toString(),
      },
    });
  });

  test("get book error when no books", () => {
    fakeDB.getBook = jest.fn().mockReturnValue(null);
    expect(() => book.getBook(1)).toThrowError("Book was not found");
  });

  test("get books", () => {
    fakeDB.getAllBooks = jest.fn().mockReturnValue([
      {
        id: 1,
        authorID: 1,
        publishedDate: "2020-02-02",
        coverImageURL: "some.com",
      },
    ]);
    fakeDB.getAuthor = jest.fn().mockReturnValue({
      id: 1,
      firstName: "firstname",
      lastName: "lastname",
      birthDate: new Date(),
    });
    const foundBook = book.getBooks();
    expect(foundBook).toEqual([
      {
        id: 1,
        authorID: 1,
        publishedDate: "2020-02-02",
        coverImageURL: "some.com",
        author: {
          id: 1,
          firstName: "firstname",
          lastName: "lastname",
          birthDate: new Date().toString(),
        },
      },
    ]);
  });

  test("addBook", () => {
    const bookInput = {
      authorID: 1,
      title: "a book",
      publishedDate: "2020-02-02",
      coverImageURL: "some.com",
    };
    fakeDB.insertBook = jest.fn().mockReturnValue({
      authorID: 1,
      title: "a book",
      publishedDate: new Date("2020-02-02"),
      coverImageURL: "some.com",
    });
    fakeDB.getAllAuthors = jest.fn().mockReturnValue([
      {
        id: 1,
        firstName: "firstname",
        lastName: "lastname",
        birthDate: new Date("2020-02-02"),
      },
    ]);
    fakeDB.getAuthor = jest.fn().mockReturnValue({
      id: 1,
      firstName: "firstname",
      lastName: "lastname",
      birthDate: new Date("2020-02-02"),
    });

    const bookAdded = book.addBook(bookInput);
    expect(bookAdded).toEqual({
      author: {
        birthDate: new Date("2020-02-02").toString(),
        firstName: "firstname",
        id: 1,
        lastName: "lastname",
      },
      authorID: 1,
      coverImageURL: "some.com",
      publishedDate:
        "Sat Feb 01 2020 18:00:00 GMT-0600 (Central Standard Time)",
      title: "a book",
    });
  });

  test("remove book and no book exists", () => {
    fakeDB.getBook = jest.fn().mockReturnValue(null);

    expect(() => book.removeBook(1)).toThrowError("Cannot find book to remove");
  });
});

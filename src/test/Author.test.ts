import { BookDB } from "../DB/BookDB";
import { AuthorUseCase } from "../usecases/Author";

const fakeDB = jest.mocked(BookDB) as unknown as BookDB;
let author: AuthorUseCase;
describe("Testing for Authors", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    author = new AuthorUseCase(fakeDB);
  });
  test("All Authors", () => {
    fakeDB.getAllAuthors = jest.fn().mockReturnValue([
      {
        id: 1,
        firstName: "firstname",
        lastName: "lastname",
        birthDate: new Date(),
      },
    ]);
    author.getAuthors();
    expect(fakeDB.getAllAuthors).toHaveBeenCalledWith();
  });
  test("Single Author", () => {
    fakeDB.getAuthor = jest.fn().mockReturnValue({
      id: 1,
      firstName: "firstname",
      lastName: "lastname",
      birthDate: new Date(),
    });
    author.getAuthor(1);
    expect(fakeDB.getAuthor).toHaveBeenCalledWith(1);
  });
  test("Single Author doesn't exist", () => {
    fakeDB.getAuthor = jest.fn();
    expect(() => author.getAuthor(1)).toThrow("Author was not found ");
  });
  test("addAuthor", () => {
    const authorInput = {
      id: 1,
      firstName: "firstname",
      lastName: "lastname",
      birthDate: new Date().toString(),
    };
    fakeDB.insertAuthor = jest.fn().mockReturnValue({
      id: 1,
      firstName: "firstname",
      lastName: "lastname",
      birthDate: new Date(),
    });
    const addedAuthor = author.addAuthor(authorInput);

    expect(addedAuthor).toEqual(authorInput);
  });
  test("removeAuthor", () => {
    fakeDB.getAuthor = jest.fn().mockReturnValue({
      id: 1,
      firstName: "firstname",
      lastName: "lastname",
      birthDate: new Date(),
    });
    fakeDB.getAllBooks = jest.fn().mockReturnValue([]);
    fakeDB.deleteAuthor = jest.fn().mockReturnValue([]);
    expect(() => author.removeAuthor(1)).not.toThrowError();
  });
  test("removeAuthor error when author still attached to book", () => {
    fakeDB.getAuthor = jest.fn().mockReturnValue({
      id: 1,
      firstName: "firstname",
      lastName: "lastname",
      birthDate: new Date(),
    });
    fakeDB.getAllBooks = jest.fn().mockReturnValue([
      {
        authorID: 1,
      },
    ]);
    expect(() => author.removeAuthor(1)).toThrowError(
      "You cannot remove an author attached to a book"
    );
  });

  test("removeAuthor error when author doesn't exist", () => {
    fakeDB.getAuthor = jest.fn().mockReturnValue(null);
    expect(() => author.removeAuthor(1)).toThrowError(
      "Cannot find Author to remove"
    );
  });
  test("update author", () => {
    const authorInput = {
      id: 1,
      firstName: "firstname",
      lastName: "lastname",
      birthDate: new Date().toString(),
    };
    fakeDB.updateAuthor = jest.fn().mockReturnValue({
      id: 1,
      firstName: "firstname",
      lastName: "lastname",
      birthDate: new Date(),
    });
    const addedAuthor = author.addAuthor(authorInput);

    expect(addedAuthor).toEqual(authorInput);
  });
  test("update author doesn't exist", () => {
    fakeDB.getAuthor = jest.fn().mockReturnValue(null);
    expect(() =>
      author.updateAuthor(1, {
        firstName: "Hersh",
        lastName: "bob",
      })
    ).toThrowError("Cannot find Author to update");
  });
});

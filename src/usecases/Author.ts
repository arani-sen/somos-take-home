import { BookDB } from "../DB/BookDB";
import { Author, CannotRemoveAuthor } from "../entities/author";
import { AuthorInput } from "../generated/graphql";

export class AuthorUseCase {
  constructor(private bookDB: BookDB) {}

  getAuthor(id: number) {
    this.bookDB.getAuthor(id);
  }

  getAuthors() {
    const authors = this.bookDB
      .getAllAuthors()
      .map((currentAuthor) => this.dbToGraph(currentAuthor));

    return authors;
  }

  addAuthor(authorInput: AuthorInput) {
    const newAuthor = this.graphToDB(authorInput);

    const insertedAuthor = this.bookDB.insertAuthor(newAuthor);

    return this.dbToGraph(insertedAuthor);
  }

  removeAuthor(id: number) {
    const matchingBooks = this.bookDB.getAllBooks().map((book) => {
      if (book.authorID === id) return book;
    });

    if (matchingBooks.length > 0)
      throw new CannotRemoveAuthor(
        "You cannot remove an author attached to a book"
      );

    return this.bookDB.deleteBook(id);
  }

  updateAuthor(id: number, authorInput: AuthorInput) {
    const updatedAuthor = this.graphToDB(authorInput);

    this.bookDB.updateAuthor(id, { id, ...updatedAuthor });
  }

  private graphToDB(graphAuthor: AuthorInput) {
    return {
      ...graphAuthor,
      birthDate: new Date(graphAuthor.birthDate),
    };
  }

  private dbToGraph(dbAuthor: Author) {
    return {
      ...dbAuthor,
      birthDate: dbAuthor.birthDate.toString(),
    };
  }
}

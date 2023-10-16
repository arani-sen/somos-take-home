import { BookDB } from "../DB/BookDB";
import {
  Author,
  CannotFindAuthor,
  CannotRemoveAuthor,
} from "../entities/author";
import { AuthorInput } from "../generated/graphql";

export class AuthorUseCase {
  constructor(private bookDB: BookDB) {}

  getAuthor(id: number) {
    const foundAuthor = this.bookDB.getAuthor(id);
    if (!foundAuthor) throw new CannotFindAuthor("Author was not found ");

    return this.dbToGraph(this.bookDB.getAuthor(id));
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
    //TODO: Check if exists
    const matchingBooks = this.bookDB
      .getAllBooks()
      .filter((book) => book.authorID === id);

    if (matchingBooks.length > 0)
      throw new CannotRemoveAuthor(
        "You cannot remove an author attached to a book"
      );

    return this.bookDB
      .deleteAuthor(id)
      .map((currentAuthor) => this.dbToGraph(currentAuthor));
  }

  updateAuthor(id: number, authorInput: AuthorInput) {
    const dbAuthor = this.graphToDB(authorInput);

    const updatedBook = this.bookDB.updateAuthor(id, { id, ...dbAuthor });
    return this.dbToGraph(updatedBook);
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

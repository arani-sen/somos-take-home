export type Author = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
};
export class CannotRemoveAuthor extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CannotRemoveAuthor";
  }
}

export class CannotFindAuthor extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CannotFindAuthor";
  }
}

export interface IUsers {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  }
  export interface IUserValidation {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }

  export interface IUserLoginValidation {
    email: string;
    password: string;
  }
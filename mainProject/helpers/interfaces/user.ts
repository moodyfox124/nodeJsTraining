export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface IUserRequestBody {
  login: string;
  password: string;
  age: number;
}

export interface CreateUserInterface {
  name: string;
  email: string;
  password: string;
  birthdate: Date;
  role?: string;
}

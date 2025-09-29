export class CreateUser {
  constructor(
    private readonly _name: String,
    private readonly _email: String,
    private readonly _password: String,
    private readonly _birthDate: Date,
    private readonly _role: String = 'user'
  ) {}

  public get name(): String {
    return this._name;
  }

  public get email(): String {
    return this._email;
  }
  public get password(): String {
    return this._password;
  }
  public get birthDate(): Date {
    return this._birthDate;
  }
  public get role(): String {
    return this._role;
  }
}

class LoginCredential {
  constructor(private readonly _email: string, private readonly _password: string) {}

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }
}

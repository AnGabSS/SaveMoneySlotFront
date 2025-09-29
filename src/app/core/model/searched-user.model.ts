class SearchedUser {
  constructor(
    private readonly _id: String,
    private readonly _name: String,
    private readonly _email: String,
    private readonly _birthDate: Date,
    private readonly _balance: Number,
    private readonly _role: String = 'user'
  ) {}

  public get id(): String {
    return this._id;
  }

  public get name(): String {
    return this._name;
  }

  public get email(): String {
    return this._email;
  }

  public get birthDate(): Date {
    return this._birthDate;
  }
}

export class User {
  constructor(
    {id, email, displayName, password, token, tokenExpiration, bio, affiliation, profilePicture}:
    {id?: string; email?: string; displayName?: string; password?: string; token?: string; tokenExpiration?: Date; bio?: string; affiliation?: string; profilePicture?: string}) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.password = password;
    this.token = token;
    this.tokenExpiration = tokenExpiration;
    this.bio = bio;
    this.affiliation = affiliation;
    this.profilePicture = profilePicture;
  }

  public id: string
  public email: string
  public displayName: string
  public password?: string
  public token: string
  public tokenExpiration: Date
  public bio?: string
  public affiliation?: string
  public profilePicture?: string;

  public getAbbreviation(): string {
    if (!this.displayName) {
      return '?';
    }

    const words = this.displayName.split(' ');
    const first = words.shift();

    if (words.length === 0) {
      return first[0].toUpperCase();
    }

    const last = words.pop();

    return first[0].toUpperCase() + last[0].toUpperCase();
  }

  public static mock(): User {
    return new User({
      id: '1',
      displayName: 'Floris de Bijl'
    });
  }

  public toObject(): object {
    const u = this as User;
    Object.keys(u).forEach(key => u[key] === undefined ? delete u[key] : {});
    return u;
  }
}

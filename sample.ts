export class Sample {
  constructor(private _a: string, private _b: string, private _c: string) {}

  public get a(): string {
    return this._a;
  }

  public set a(a: string) {
    this._a = a;
  }

  public get b(): string {
    return this._b;
  }

  public set b(b: string) {
    this._b = b;
  }

  public get c(): string {
    return this._c;
  }

  public set c(c: string) {
    this._c = c;
  }
}

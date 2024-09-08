export default class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public add(vec: Vector) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }
  public mult(value: Number | Vector) {
    if (value instanceof Vector) {
      this.x *= value.x;
      this.y *= value.y;
    } else if (value instanceof Number) {
      this.x *= value as number;
      this.y *= value as number;
    }
    return this;
  }

  public mag() {
    return Math.sqrt(this.magSq());
  }
  public sub(vec: Vector) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  public heading() {
    const h = Math.atan2(this.y, this.x);
    // if (this.isPInst) return this._fromRadians(h);
    return h;
  }
  public static sub(v1: Vector, v2: Vector) {
    let target = v1.copy();
    target.sub(v2);
    return target;
  }
  public dist(v: Vector) {
    return v.copy().sub(this).mag();
  }

  public static dist(v1: Vector, v2: Vector) {
    return v1.dist(v2);
  }

  public copy() {
    return new Vector(this.x, this.y);
  }
  public limit(max: number) {
    const mSq = this.magSq();
    if (mSq > max * max) {
      //normalize it
      this.ScalarDivide(Math.sqrt(mSq)).mult(max);
    }
    return this;
  }
  public div(value: Vector) {
    this.x /= value.x;
    this.y /= value.y;
    return this;
  }
  public ScalarDivide(value: number) {
    this.x = (this.x / value) as number;
    this.y = (this.y / value) as number;
    return this;
  }
  public normalize() {
    const len = this.mag();
    // here we multiply by the reciprocal instead of calling 'div()'
    // since div duplicates this zero check.
    if (len !== 0) this.mult(1 / len);
    return this;
  }

  public magSq() {
    const x = this.x;
    const y = this.y;
    return x * x + y * y;
  }
}

export class Vector2D {
  x: number;
  y: number;
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
  // angle of vector
  public heading() {
    return Math.atan2(this.y, this.x);
  }
}

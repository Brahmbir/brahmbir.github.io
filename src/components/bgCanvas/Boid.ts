import { random } from "../../utils/ramdom";
import { Vector2D } from "./Vector2D";

export default class Boid {
  private _char: string;
  private _Color: string;

  private position: Vector2D = new Vector2D();
  private velocity: Vector2D = new Vector2D();

  constructor(
    x: number,
    y: number,
    Color: string = "#111111",
    char: string = "A"
  ) {
    this.position = new Vector2D(x, y);
    this.velocity = new Vector2D(random(-1, 1), random(-1, 1));

    this._Color = Color;
    this._char = char;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // Draw a triangle rotated in the direction of velocity
    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    let angle = this.velocity.heading();
    ctx.rotate(angle + (90 * Math.PI) / 180);

    let measure = ctx.measureText(this._char);
    let actualHeight =
      measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent;

    ctx.fillStyle = this._Color;
    ctx.fillText(this._char, -measure.width / 2, actualHeight / 2);

    ctx.restore();
  }

  public update(
    flock: Boid[],
    canvasWidth: number,
    canvasHeight: number,
    separationMagnitude: number,
    alignmentMagnitude: number,
    cohesionMagnitude: number
  ) {
    // let unit = 10; // pixel
    let unit = canvasWidth / 100; // pixel

    // let unit = Math.max(canvasHeight, canvasWidth);

    const separation = this.separate(flock, unit * 2);
    const alignment = this.align(flock, unit * 9);
    const cohesion = this.cohere(flock, unit * 10);

    this.velocity.x +=
      separation.x * separationMagnitude +
      alignment.x * alignmentMagnitude +
      cohesion.x * cohesionMagnitude;
    this.velocity.y +=
      separation.y * separationMagnitude +
      alignment.y * alignmentMagnitude +
      cohesion.y * cohesionMagnitude;

    // Limit speed
    const speedLimit = 5;
    const speed = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y
    );
    if (speed > speedLimit) {
      this.velocity.x = (this.velocity.x / speed) * speedLimit;
      this.velocity.y = (this.velocity.y / speed) * speedLimit;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.x < 0) this.position.x = canvasWidth;
    if (this.position.x > canvasWidth) this.position.x = 0;
    if (this.position.y < 0) this.position.y = canvasHeight;
    if (this.position.y > canvasHeight) this.position.y = 0;
  }

  private separate(flock: Boid[], separationDistance: number): Vector2D {
    let sumX = 0;
    let sumY = 0;
    let count = 0;

    for (const other of flock) {
      const distance = Math.sqrt(
        (this.position.x - other.position.x) ** 2 +
          (this.position.y - other.position.y) ** 2
      );
      if (other !== this && distance < separationDistance) {
        sumX += this.position.x - other.position.x;
        sumY += this.position.y - other.position.y;
        count++;
      }
    }

    if (count > 0) {
      return new Vector2D(sumX / count, sumY / count);
    } else {
      return new Vector2D(0, 0);
    }
  }

  private align(flock: Boid[], alignmentDistance: number): Vector2D {
    let sumVx = 0;
    let sumVy = 0;
    let count = 0;

    for (const other of flock) {
      const distance = Math.sqrt(
        (this.position.x - other.position.x) ** 2 +
          (this.position.y - other.position.y) ** 2
      );
      if (other !== this && distance < alignmentDistance) {
        sumVx += other.velocity.x;
        sumVy += other.velocity.y;
        count++;
      }
    }

    if (count > 0) {
      return new Vector2D(sumVx / count / 8, sumVy / count / 8); // Reduced influence
    } else {
      return new Vector2D(0, 0);
    }
  }

  private cohere(flock: Boid[], cohesionDistance: number): Vector2D {
    let sumX = 0;
    let sumY = 0;
    let count = 0;

    for (const other of flock) {
      const distance = Math.sqrt(
        (this.position.x - other.position.x) ** 2 +
          (this.position.y - other.position.y) ** 2
      );
      if (other !== this && distance < cohesionDistance) {
        sumX += other.position.x;
        sumY += other.position.y;
        count++;
      }
    }

    if (count > 0) {
      return new Vector2D(
        (sumX / count - this.position.x) / 100,
        (sumY / count - this.position.y) / 100
      ); // Reduced influence
    } else {
      return new Vector2D(0, 0);
    }
  }
}

import { random } from "../../utils/ramdom";
import BoidSimulation from "./BoidSimulation";
import Vector from "./Vector";

export default class Boid {
  private acceleration: Vector;
  private velocity: Vector;
  private position: Vector;
  private r: number;
  private _char: string;
  private _Color: string;

  private maxspeed: number;
  private maxforce: number;
  constructor(
    x: number,
    y: number,
    Color: string = "#111111",
    char: string = "A"
  ) {
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(random(-1, 1), random(-1, 1));
    this.position = new Vector(x, y);
    this.r = 3.0;
    this._char = char;
    this._Color = Color;
    this.maxspeed = this.r * 1; // Maximum speed
    this.maxforce = 0.005; // Maximum steering force
  }

  public run(boids: Array<Boid>, ctx: CanvasRenderingContext2D) {
    this.r = BoidSimulation.SizeOfBoid * 0.35;
    this.maxspeed = this.r * 1;

    this.flock(boids);
    this.update();
    this.borders(ctx);
    this.show(ctx);
  }

  private show(ctx: CanvasRenderingContext2D) {
    // Draw a triangle rotated in the direction of velocity
    let angle = this.velocity.heading();
    ctx.save();
    ctx.translate(this.position.x + this.r, this.position.y + this.r);

    ctx.rotate(angle + (90 * Math.PI) / 180);

    let measure = ctx.measureText(this._char);
    let actualHeight =
      measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent;
    ctx.fillStyle = this._Color;
    ctx.fillText(this._char, -measure.width / 2, actualHeight / 2);
    ctx.restore();
  }

  private applyForce(force: Vector) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  private flock(boids: Array<Boid>) {
    let separation = this.separate(boids);
    let alignment = this.align(boids);
    let cohesion = this.cohere(boids);
    // Arbitrarily weight these forces
    separation.mult(1.5);
    alignment.mult(1.0);
    cohesion.mult(1.0);

    // console.log(separation, alignment, cohesion);
    // Add the force vectors to acceleration
    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
  }
  // Separation
  private separate(boids: Array<Boid>) {
    let SearchArea = this.r * 16.6;

    let steer = new Vector(0, 0);
    let count = 0;

    // For every boid in the system, check if it's too close
    for (const singleBoid of boids) {
      let dist = Vector.dist(this.position, singleBoid.position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (dist > 0 && dist < SearchArea) {
        // Calculate vector pointing away from neighbor
        let diff = Vector.sub(this.position, singleBoid.position);

        diff.normalize();
        diff.ScalarDivide(dist); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
        // }
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.ScalarDivide(count);
    }
    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  private align(boids: Array<Boid>) {
    let neighborDistance = this.r * 16.6;

    let sum = new Vector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighborDistance) {
        sum.add(boids[i].velocity);
        count++;
      }
    }

    if (count > 0) {
      sum.ScalarDivide(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return new Vector(0, 0);
    }
  }

  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  private cohere(boids: Array<Boid>) {
    let neighborDistance = this.r * 36.6;
    let desiredspace = this.r * 26.6;

    let sum = new Vector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;

    for (const singleBoid of boids) {
      let dist = Vector.dist(this.position, singleBoid.position);

      if (dist > desiredspace && dist < neighborDistance) {
        sum.add(singleBoid.position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.ScalarDivide(count);

      let desired = Vector.sub(sum, this.position); // A vector pointing from the location to the target
      desired.mult(this.maxspeed);

      let steer = Vector.sub(desired, this.velocity);
      // steer.limit(this.maxforce); // Limit to maximum steering force

      // Steering = Desired minus Velocity
      return steer;
      // return desired;
    } else {
      return new Vector(0, 0);
    }
  }

  // Wraparound
  private borders(ctx: CanvasRenderingContext2D) {
    if (this.position.x < -this.r) this.position.x = ctx.canvas.width + this.r;
    if (this.position.y < -this.r) this.position.y = ctx.canvas.height + this.r;
    if (this.position.x > ctx.canvas.width + this.r) this.position.x = -this.r;
    if (this.position.y > ctx.canvas.height + this.r) this.position.y = -this.r;
  }

  // Method checks for nearby boids and steers away
  private update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    // console.log(this.velocity);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }
}

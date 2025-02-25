import { random } from "../../utils/ramdom";
import Boid from "./Boid";

type FrameRate = number | 24 | 30 | 60 | 114 | 120 | 144 | 240 | 360;

export default class BoidSimulation {
  public static SizeOfBoid = 10;

  public Context?: CanvasRenderingContext2D;

  private boids: Array<Boid> = [];
  private _pixelRatio: number = 1;

  public separationMagnitude: number = 1;
  public alignmentMagnitude: number = 0.5;
  public cohesionMagnitude: number = 0.5;

  private _simulationFrameRateValue: FrameRate = 24;
  private _renderFrameRateValue: FrameRate = 30;

  private simulationLoopId: number | null = null;
  private renderLoopId: number | null = null;

  private lastSimulationTime: number = 0;
  private lastRenderTime: number = 0;

  private generateBoids(context: CanvasRenderingContext2D): void {
    let totalBoids = Math.round(
      Math.sqrt(context.canvas.width * context.canvas.height) * 0.35
    );

    this.boids.splice(0, this.boids.length);

    for (let i = 0; i < totalBoids; i++) {
      this.boids[i] = new Boid(
        random(0, context.canvas.width),
        random(0, context.canvas.height),
        PickRandomColor()
      );
    }
  }

  public initWindow(canvas: HTMLCanvasElement, sizeOfCell: number = 0.25) {
    this._pixelRatio = Math.min(window.devicePixelRatio || 1, 2.0);

    canvas.width = canvas.clientWidth * sizeOfCell;
    canvas.height = canvas.clientHeight * sizeOfCell;

    const Context = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!Context) return;

    this.Context = Context;

    this.Context.font = `${BoidSimulation.SizeOfBoid * 1} em Verdana`;

    const updateSize = ([entry]: ResizeObserverEntry[]) => {
      if (!(entry && canvas)) return;

      let width, height;

      if (entry.devicePixelContentBoxSize) {
        width = entry.devicePixelContentBoxSize[0].inlineSize * sizeOfCell;
        height = entry.devicePixelContentBoxSize[0].blockSize * sizeOfCell;
      } else {
        // These values not correct but they're as close as you can get in Safari
        width =
          entry.contentBoxSize[0].inlineSize * this._pixelRatio * sizeOfCell;
        height =
          entry.contentBoxSize[0].blockSize * this._pixelRatio * sizeOfCell;
      }

      BoidSimulation.SizeOfBoid = Math.min(width, height) * 0.01;

      canvas.width = width;
      canvas.height = height;
    };
    const resizeObserver = new ResizeObserver((e) => updateSize(e));

    resizeObserver.observe(canvas);
    this.generateBoids(Context);
  }

  public setMagnitudes(
    separation: number,
    alignment: number,
    cohesion: number
  ) {
    this.separationMagnitude = separation;
    this.alignmentMagnitude = alignment;
    this.cohesionMagnitude = cohesion;
  }
  public start(): void {
    this.lastSimulationTime = 0;
    this.lastRenderTime = 0;

    this.simulationLoopId = requestAnimationFrame((time: number) =>
      this.simulateLoop(time)
    );
    this.renderLoopId = requestAnimationFrame((time: number) =>
      this.renderLoop(time)
    );
  }

  public stop() {
    if (this.simulationLoopId !== null) {
      cancelAnimationFrame(this.simulationLoopId);
      this.simulationLoopId = null;
    }
    if (this.renderLoopId !== null) {
      cancelAnimationFrame(this.renderLoopId);
      this.renderLoopId = null;
    }
  }

  private simulateLoop(now: number) {
    const elapsed = now - this.lastSimulationTime;
    const targetInterval = 1000 / this._simulationFrameRateValue;

    if (elapsed >= targetInterval) {
      this.updateSimulation();
      this.lastSimulationTime = now - (elapsed % targetInterval);
    }
    if (this.simulationLoopId !== null) {
      this.simulationLoopId = requestAnimationFrame((time: number) =>
        this.simulateLoop(time)
      );
    } else {
      return;
    }
  }

  private renderLoop(now: number) {
    const elapsed = now - this.lastRenderTime;
    const targetInterval = 1000 / this._renderFrameRateValue;

    if (elapsed >= targetInterval) {
      this.render();
      this.lastRenderTime = now - (elapsed % targetInterval);
    }
    if (this.renderLoopId !== null) {
      this.renderLoopId = requestAnimationFrame((time: number) =>
        this.renderLoop(time)
      );
    } else {
      return;
    }
  }
  private updateSimulation() {
    if (!this.Context) return;
    for (const boid of this.boids) {
      boid.update(
        this.boids,
        this.Context.canvas.width,
        this.Context.canvas.height,
        this.separationMagnitude,
        this.alignmentMagnitude,
        this.cohesionMagnitude
      );
    }
  }

  private render() {
    if (!this.Context) return;

    this.Context.clearRect(
      0,
      0,
      this.Context.canvas.width,
      this.Context.canvas.height
    );
    for (const boid of this.boids) {
      boid.draw(this.Context);
    }
  }
}

let listOfColors = [
  "#8be9fd",
  "#50fa7b",
  "#ffb86c",
  "#ff79c6",
  "#bd93f9",
  "#ff5555",
  "#f1fa8c",
];

function PickRandomColor(Color = listOfColors): string {
  const random = Math.floor(Math.random() * Color.length);
  return Color[random];
}

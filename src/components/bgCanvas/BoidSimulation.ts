// import Cell from "./Cell";
// import Simulation from "./Simulation";

import { random } from "../../utils/ramdom";
import Boid from "./Boid";

export default class BoidSimulation {
  private _pixelRatio: number = 1;
  private _frameRateValue: number = 0;
  private _frameTimeCount: number = 0;
  private _deltaTime: number = 0;
  private _time: number = 0;
  private _requestAnimationFrameID: number = -1;
  public Context?: CanvasRenderingContext2D;

  public static SizeOfBoid = 10;

  public initWindow(canvas: HTMLCanvasElement, sizeOfCell: number = 0.25) {
    this._pixelRatio = Math.min(window.devicePixelRatio || 1, 2.0);

    canvas.width = canvas.clientWidth * sizeOfCell;
    canvas.height = canvas.clientHeight * sizeOfCell;

    const Context = canvas.getContext("2d", {
      willReadFrequently: true,
    });
    if (!Context) return;

    this.Context = Context;

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
  }

  public set frameRate(
    value: number | 24 | 30 | 60 | 114 | 120 | 144 | 240 | 360
  ) {
    this._frameRateValue = 1.0 / value;
    if (value >= 360) {
      this._frameRateValue = 0;
    }
  }

  public pause() {
    if (this._requestAnimationFrameID != 0) {
      cancelAnimationFrame(this._requestAnimationFrameID);
      this._requestAnimationFrameID = 0;
    }
  }
  public resume() {
    this._requestAnimationFrameID = requestAnimationFrame((t: number) =>
      this.render(t)
    );
  }

  private render(time: number) {
    this._deltaTime = time - this._time;
    this._time = time;

    if (this._frameRateValue > 0) {
      this._frameTimeCount += this._deltaTime * 0.001;
      if (this._frameTimeCount >= this._frameRateValue * 0.95) {
        this._frameTimeCount = 0;
        this.updateFrame(time);
      }
    } else {
      this.updateFrame(time);
    }
    this.resume();
  }

  updateFrame(_time: number) {
    if (!this.Context) return;

    let size = 0.15;
    this.Context.font = `${BoidSimulation.SizeOfBoid * size}em Verdana`;

    this.nextState(this.Context);
  }

  public getRenderLoop(Context: CanvasRenderingContext2D) {
    BoidSimulation.generateBoids(Context);
  }

  public setContextVariables(CtxInit: (ctx: CanvasRenderingContext2D) => void) {
    if (!this.Context) return;
    CtxInit(this.Context);
  }

  private nextState(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    BoidSimulation.boids.forEach((CaBoid) => {
      CaBoid.run(BoidSimulation.boids, ctx);
    });
  }

  private static boids: Array<Boid> = [];

  public static generateBoids(Context: CanvasRenderingContext2D) {
    for (let index = 0; index < 100; index++) {
      BoidSimulation.boids[index] = new Boid(
        random(0, Context.canvas.width),
        random(0, Context.canvas.height),
        PickRandomColor()
      );
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

import { useRef, useEffect } from "react";
import BoidSimulation from "./BoidSimulation";

import styles from "./BgCanvas.module.css";

export default function Bgcanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let Simulation = new BoidSimulation();
    Simulation.initWindow(canvasRef.current, 0.6);

    Simulation.frameRate = 60;

    Simulation.setContextVariables((ctx) => {
      BoidSimulation.generateBoids(ctx);
    });

    Simulation.resume();
    return () => {
      Simulation.pause();
    };
  }, []);

  return (
    <>
      <div className={styles.hideBtn}>
        <div className={styles.tooltip}>⇐</div>
        <span className={styles.tooltiptext}>
          Move the pointer out of corner to go back
        </span>
      </div>

      <canvas id="canvas" className={styles.CAN} ref={canvasRef} />
    </>
  );
}

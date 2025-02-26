import { useCallback } from "react";
import styles from "./BgCanvas.module.css";

import BoidSimulation from "./BoidSimulation";

export default function Bgcanvas() {
  const RefCallback = useCallback((canvas: HTMLCanvasElement) => {
    if (canvas) {
      let Simulation = new BoidSimulation();
      Simulation.initWindow(canvas, 0.6);
      Simulation.start();
    }
  }, []);

  return (
    <>
      <div className={styles.hideBtn}>
        <div className={styles.tooltip}>⇐</div>
        <span className={styles.tooltiptext}>
          Move the pointer out of corner to go back
        </span>
      </div>
      <canvas id="canvas" className={styles.CAN} ref={RefCallback} />
    </>
  );
}

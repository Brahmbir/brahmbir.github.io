import { PickRandomColor } from "../../utils/ramdom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={styles.hint} data-color="cyan">
        {
          "<pgup>/<pgdown>: Scroll, <left>/<right>: Switch section, <1-4>: Jump to section, <up>/<down>: Switch item"
        }
        <span data-color="pink"> (or just use the mouse)</span>
      </div>
      <div className={styles.links}>
        <a
          data-color={PickRandomColor()}
          target="_blank"
          href="https://brahmbir.vercel.app/Brahmbir's%20resume.pdf"
        >
          Resume
        </a>
        <a
          data-color={PickRandomColor()}
          target="_blank"
          href="https://github.com/Brahmbir"
        >
          GitHub
        </a>
        <a
          target="_blank"
          data-color={PickRandomColor()}
          href="https://www.linkedin.com/in/brahm-bir-singh-6a9115245/"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

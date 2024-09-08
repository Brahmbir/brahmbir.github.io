import { ReactNode } from "react";
import styles from "./BorderBox.module.css";

export interface IBorderProps {
  Tittle?: string;
  children: ReactNode;
  SubText?: string;
  className?: string;
  NoScroll?: boolean;
  selected?: boolean;
}

export default function Border(props: IBorderProps) {
  return (
    <div
      data-border
      data-selected-group={props.selected}
      className={`${styles.section} ${props.className}`}
    >
      {props.Tittle && <span>{props.Tittle}</span>}

      <div data-no-scroll={props.NoScroll} className={styles.group}>
        <div>{props.children}</div>
      </div>
      {props.SubText && <span>{props.SubText}</span>}
    </div>
  );
}

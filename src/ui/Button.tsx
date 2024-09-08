import { ReactNode } from "react";
import styles from "./Button.module.css";

export interface IButtonProps {
  children?: ReactNode;
  click: Function;
  data: any;
  index: number;
  selected: boolean;
}

export default function Button(props: IButtonProps) {
  const clickEvent = () => {
    props.click(props.index);
  };
  return (
    <button
      data-selected={props.selected}
      onClick={clickEvent}
      className={styles.btn}
    >
      {props.children}
    </button>
  );
}

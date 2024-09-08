import { useRef } from "react";
import Border from "../../ui/BorderBox";
import styles from "./Aside.module.css";
import ProjectsGroup from "./ProjectGroup/ProjectGroup";
import SkillGroup from "./SkillGroup/SkillGroup";
import { ILocState, SectionType } from "../../App";

interface IAsideProps {
  setdata: (state: ILocState) => void;
  current: ILocState;
}

export default function Aside({ setdata, current }: IAsideProps) {
  const Aside = useRef<HTMLElement | null>(null);
  const menuToggle = () => {
    if (!Aside.current) return;

    Aside.current.dataset["menuHidden"] =
      Aside.current.dataset["menuHidden"] == "true" ? "false" : "true";
  };

  const menuHide = () => {
    if (!Aside.current) return;

    Aside.current.dataset["menuHidden"] = "true";
  };

  const setMenuAndData = (data: any) => {
    menuHide();
    setdata(data);
  };
  const showHome = () => {
    setMenuAndData({
      sectionIndex: SectionType.Home,
      itemIndex: 0,
    } as ILocState);
  };
  return (
    <>
      <aside ref={Aside} className={styles.sideArea} data-menu-hidden={true}>
        <Border
          selected={SectionType.Home == current.sectionIndex}
          Tittle={"Home"}
          NoScroll
          className={styles.home}
        >
          <button className={styles.homebtn} onClick={showHome}>
            <p>
              {"Hello! I'm "} <span data-color="pink">Brahmbir Singh</span>
              {", a passionate software developer from India :)"}
            </p>
          </button>
        </Border>
        <div className={styles.info}>
          <ProjectsGroup current={current} setdata={setMenuAndData} />
          <SkillGroup current={current} setdata={setMenuAndData} />
        </div>
      </aside>
      <div className={styles.menu}>
        <span className={styles.logo}>Brahmbir</span>
        <button className={styles.menuBtn} onClick={menuToggle}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <text
              fontSize="180%"
              x="50%"
              y="50%"
              alignmentBaseline="middle"
              textAnchor="middle"
            >
              🍔
            </text>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg">
            <text
              fontSize="180%"
              x="50%"
              y="50%"
              alignmentBaseline="middle"
              textAnchor="middle"
            >
              ❌
            </text>
          </svg>
        </button>
      </div>
    </>
  );
}

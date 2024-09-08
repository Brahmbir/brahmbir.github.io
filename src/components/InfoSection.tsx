import { MutableRefObject, ReactNode } from "react";
import { ILocState, SectionType } from "../App";

import styles from "./InfoSection.module.css";

import "../styles/page.css";
import RenderHome from "./Render/renderHome";
import RenderProject from "./Render/renderProject";
import RenderSkill from "./Render/RenderSkill";

export default function InfoSection({
  location,
  SectRef,
  children,
}: {
  children: ReactNode;
  location: ILocState;
  SectRef: MutableRefObject<null | HTMLElement>;
}) {
  let result: ReactNode = <></>;

  switch (location.sectionIndex) {
    case SectionType.Home:
      result = <RenderHome />;
      break;
    case SectionType.Project:
      result = <RenderProject index={location.itemIndex} />;
      break;

    case SectionType.Skill:
      result = <RenderSkill index={location.itemIndex} />;

      break;
    default:
      break;
  }

  return (
    <div className={styles.INfoContainer}>
      {children}
      <section ref={SectRef} data-border className={styles.sectOfMain}>
        <div className={styles.PAGE} data-info id="info">
          {result}
        </div>
      </section>
    </div>
  );
}

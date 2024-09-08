import styles from "../Aside.module.css";
import Border from "../../../ui/BorderBox";
import Button from "../../../ui/Button";

import { Dispatch, SetStateAction } from "react";
import { ILocState, SectionType } from "../../../App";

import PROJECT from "../../../assets/data/Project.json";

export interface IProjectsGroupProps {
  setdata: Dispatch<SetStateAction<ILocState>>;
  current: ILocState;
}

export default function ProjectsGroup({
  setdata,
  current,
}: IProjectsGroupProps) {
  let data = PROJECT.data;

  const showProject = () => {
    return (index: number) => {
      setdata({ sectionIndex: SectionType.Project, itemIndex: index });
    };
  };

  let event = showProject();

  const isSelected = (current: ILocState, i: number) => {
    if (current.sectionIndex == SectionType.Project && current.itemIndex == i) {
      return true;
    }
    return false;
  };
  const getSubValue = () => {
    if (current.sectionIndex == SectionType.Project) {
      return current.itemIndex + 1;
    }
    return 0;
  };
  return (
    <Border
      selected={SectionType.Project == current.sectionIndex}
      Tittle={"Projects"}
      SubText={`${getSubValue()} of ${data.length}`}
      className={styles.part1}
    >
      {data.map((ele, i) => (
        <Button
          selected={isSelected(current, i)}
          key={i}
          click={event}
          index={i}
          data={ele}
        >
          {ele.name}
        </Button>
      ))}
    </Border>
  );
}

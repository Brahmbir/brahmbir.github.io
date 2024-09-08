import styles from "../Aside.module.css";
import Button from "../../../ui/Button";
import Border from "../../../ui/BorderBox";

import SKILL from "../../../assets/data/Skills.json";
import { ILocState, SectionType } from "../../../App";
import { Dispatch, SetStateAction } from "react";

export interface ISkillGroupProps {
  setdata: Dispatch<SetStateAction<ILocState>>;
  current: ILocState;
}

export default function SkillGroup({ setdata, current }: ISkillGroupProps) {
  let data = SKILL.data;

  const showSkill = () => {
    return (index: number) => {
      setdata({ sectionIndex: SectionType.Skill, itemIndex: index });
    };
  };

  let event = showSkill();

  const isSelected = (current: ILocState, i: number) => {
    if (current.sectionIndex == SectionType.Skill && current.itemIndex == i) {
      return true;
    }
    return false;
  };

  const getSubValue = () => {
    if (current.sectionIndex == SectionType.Skill) {
      return current.itemIndex + 1;
    }
    return 0;
  };

  return (
    <Border
      selected={SectionType.Skill == current.sectionIndex}
      Tittle={"Skills"}
      SubText={`${getSubValue()} of ${data.length}`}
      className={styles.part1}
    >
      {data.map((ele, i) => (
        <Button
          selected={isSelected(current, i)}
          click={event}
          data={ele}
          index={i}
          key={i}
        >
          <img id="img" src={`/icons/${ele.name}.svg`} />
          {ele.name}
        </Button>
      ))}
    </Border>
  );
}

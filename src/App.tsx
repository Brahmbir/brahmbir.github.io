import Footer from "./components/Footer/Footer";
import Aside from "./components/Aside/Aside";
import InfoSection from "./components/InfoSection";

import PROJECTS from "./assets/data/Project.json";
import SKILLS from "./assets/data/Skills.json";

import { useEffect, useRef, useState } from "react";
import BgCanvas from "./components/bgCanvas/BgCanvas";

export enum SectionType {
  Home,
  Project,
  Skill,
}

export type ILocState = { sectionIndex: SectionType; itemIndex: number };

function App() {
  const MAIN = useRef<null | HTMLElement>(null);

  const [loc, setLoc] = useState<ILocState>({
    sectionIndex: SectionType.Home,
    itemIndex: 0,
  });

  const SetLocFunction = (state: ILocState) => {
    if (
      state.sectionIndex == loc.sectionIndex &&
      state.itemIndex == loc.itemIndex
    ) {
      return;
    }

    setLoc(() => state);
  };

  let sectLimit = Object.keys(SectionType).length / 2 - 1;

  const GoToNextSection = () => {
    setLoc((prevLoc) => {
      if (prevLoc.sectionIndex == sectLimit) return prevLoc;

      if (prevLoc.sectionIndex >= sectLimit) {
        return {
          itemIndex: 0,
          sectionIndex: sectLimit,
        };
      } else {
        return {
          itemIndex: 0,
          sectionIndex: prevLoc.sectionIndex + 1,
        };
      }
    });
  };
  const GoToPrevSection = () => {
    setLoc((prevLoc) => {
      if (prevLoc.sectionIndex == SectionType.Home) return prevLoc;

      if (prevLoc.sectionIndex <= 0) {
        return {
          itemIndex: 0,
          sectionIndex: 0,
        };
      } else {
        return {
          itemIndex: 0,
          sectionIndex: prevLoc.sectionIndex - 1,
        };
      }
    });
  };
  const GoToNumberSection = (num: number) => {
    setLoc((prevLoc) => {
      if (num > -1 && num < sectLimit) {
        return {
          itemIndex: 0,
          sectionIndex: num,
        };
      }
      return prevLoc;
    });
  };

  const GoToPrevItem = () => {
    setLoc((prevLoc) => {
      if (prevLoc.sectionIndex == SectionType.Home) return prevLoc;

      if (prevLoc.itemIndex == 0) return prevLoc;

      if (prevLoc.itemIndex <= 0) {
        return {
          itemIndex: 0,
          sectionIndex: prevLoc.sectionIndex,
        };
      } else {
        return {
          itemIndex: prevLoc.itemIndex - 1,
          sectionIndex: prevLoc.sectionIndex,
        };
      }
    });
  };
  const GoToNextItem = () => {
    setLoc((prevLoc) => {
      if (prevLoc.sectionIndex == SectionType.Home) return prevLoc;

      let limit =
        prevLoc.sectionIndex == SectionType.Project
          ? PROJECTS.data.length
          : SKILLS.data.length;

      if (prevLoc.itemIndex == limit - 1) return prevLoc;

      if (prevLoc.itemIndex >= limit - 1) {
        return {
          itemIndex: limit - 1,
          sectionIndex: prevLoc.sectionIndex,
        };
      } else {
        return {
          itemIndex: prevLoc.itemIndex + 1,
          sectionIndex: prevLoc.sectionIndex,
        };
      }
    });
  };

  useEffect(() => {
    const Listener = async (event: KeyboardEvent) => {
      const { key, code, ctrlKey } = event;

      if (key.includes("Arrow") || key.includes("Page")) event.preventDefault();

      if (key === "PageDown" || (ctrlKey && key === "d"))
        MAIN.current?.scrollBy({ top: MAIN.current.clientHeight / 2 });
      else if (key === "PageUp" || (ctrlKey && key === "u"))
        MAIN.current?.scrollBy({ top: -(MAIN.current.clientHeight / 2) });
      else if (key === "ArrowUp" || key === "k") GoToPrevItem();
      else if (key === "ArrowDown" || key === "j") GoToNextItem();
      else if (key === "ArrowLeft" || key === "h") GoToPrevSection();
      else if (key === "ArrowRight" || key === "l") GoToNextSection();
      else if (code.includes("Digit")) GoToNumberSection(parseInt(key) - 1);
    };
    window.addEventListener("keydown", Listener);
    return () => {
      window.removeEventListener("keydown", Listener);
    };
  }, []);

  return (
    <>
      <main>
        <Aside current={loc} setdata={SetLocFunction} />
        <InfoSection SectRef={MAIN} key={loc.sectionIndex} location={loc}>
          <BgCanvas />
        </InfoSection>
      </main>
    </>
  );
}
function WholeApp() {
  return (
    <>
      <App />
      <Footer />
    </>
  );
}

export default WholeApp;

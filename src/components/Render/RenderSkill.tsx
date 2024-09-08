import useSWR from "swr";
import { getHtmlFromString, uid } from "../../utils/ramdom";

import Skills from "../../assets/data/Skills.json";
import { Fragment, ReactNode } from "react";

interface ISkillProps {
  index: number;
}

const fetcher = (url: any) => fetch(url).then((res) => res.text());

export default function RenderSkill({ index }: ISkillProps) {
  let info = Skills.data[index];

  let url = info.snippet && `/Snippet/snippet.${info.snippet}`;
  const { data } = useSWR(url, fetcher);

  return (
    <Fragment key={info.name + uid()}>
      {info.content.map((ele, i) => {
        return (
          <>
            <div key={uid() + i}>{getHtmlFromString(ele)}</div>
          </>
        );
      })}

      {data && (
        <pre data-border>
          <code>{getHighlightedString(data, info.keywords!)}</code>
        </pre>
      )}
    </Fragment>
  );
}

type Color = "cyan" | "green" | "orange" | "pink" | "purple" | "red" | "yellow";

type TKeywords = {
  [K in Color]?: Array<string>;
};
undefined;

function getHighlightedString(str: String, keywords: TKeywords): ReactNode {
  if (!keywords) return <>{str}</>;

  for (const color in keywords) {
    for (const word of keywords[color as Color]!) {
      let RegExForWords = str.match(new RegExp(word, "g"));

      let allWords = [...new Set(RegExForWords)];

      allWords.map(
        (ele) =>
          (str = str.replace(new RegExp(ele, "g"), `{{${color}=>${ele}}}`))
      );
    }
  }

  return <>{getHtmlFromString(str)}</>;
}

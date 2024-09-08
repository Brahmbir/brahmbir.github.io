import { getHtmlFromString } from "../../utils/ramdom";

import { data } from "../../assets/data/Home.json";

export default function RenderHome() {
  return (
    <>
      {data.map((element, i) => {
        return (
          <div key={"Home" + i}>
            {element["content"].map((e, i) => {
              return <p key={i}> {getHtmlFromString(e)}</p>;
            })}
          </div>
        );
      })}
    </>
  );
}

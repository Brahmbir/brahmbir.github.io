import { ReactNode } from "react";

export const random = (min: number, max: number) => {
  let rand = Math.random();

  return rand * (max - min) + min;
};

let listOfColors = [
  "cyan",
  "green",
  "orange",
  "pink",
  "purple",
  "red",
  "yellow",
];

function PickRandomColor(Color = listOfColors): String {
  const random = Math.floor(Math.random() * Color.length);
  return Color[random];
}

export const uid = () =>
  String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ""
  );

function getHtmlFromString(str: String, spanToAll: boolean = false): ReactNode {
  let [firstSplit, ...restSpit] = str.replace("\n", "<-⛓️‍💥->").split("{{");

  const id2 = uid();

  let Result = () => (
    <>
      {addBreakLine(firstSplit)}
      {restSpit.map((ele, i) => {
        let [ctext, text] = ele.split("}}");

        const id = uid();

        let code = ctext.split("=>");

        if (code.length == 1) {
          let [addtext, address] = code[0].split("🔗");
          return (
            <>
              <Rspan Link={address} key={`${id}-${i}`}>
                {addtext}
              </Rspan>
              {addBreakLine(text)}
            </>
          );
        }

        let [addtext, address] = code[1].split("🔗");

        return (
          <>
            <Rspan Link={address} key={`${id}-${i}`} Color={code[0]}>
              {addtext}
            </Rspan>
            {addBreakLine(text)}
          </>
        );
      })}
    </>
  );

  return spanToAll ? (
    <span>
      <Result key={id2} />
    </span>
  ) : (
    <Result key={id2} />
  );
}

function addBreakLine(text: string, spanToAll: boolean = false) {
  let len = text.split("<-⛓️‍💥->");

  return len.length == 1 ? (
    spanToAll ? (
      <span> {text}</span>
    ) : (
      text
    )
  ) : (
    <>
      {spanToAll ? <span> {len[0]}</span> : len[0]}
      <br />
      {spanToAll ? <span> {len[1]}</span> : len[1]}
    </>
  );
}

export default function Rspan({
  children,
  Color,
  Link,
}: {
  children: ReactNode;
  Color?: string;
  Link?: string;
}) {
  let color = Color || PickRandomColor();

  if (Link)
    return (
      <a href={Link} target="_blank" data-color={color}>
        {children}
      </a>
    );

  return <span data-color={color}>{children}</span>;
}

export { PickRandomColor, getHtmlFromString };

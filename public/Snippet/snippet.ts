let listOfColors = [
  "cyan",
  "green",
  "orange",
  "pink",
  "purple",
  "red",
  "yellow",
];

function pickRandomColor(Color = listOfColors): String {
  const random = Math.floor(Math.random() * Color.length);
  return Color[random];
}

const randomBetween = (min: number, max: number) => {
  let rand = Math.random();
  return rand * (max - min) + min;
};

import { useTransform, useSpring } from "framer-motion";

export function useSpeed(x, y, len) {
  const sx = useSpring(x);
  const sy = useSpring(y);
  return {
    x: useTransform(sx, [0, 100], [-len, len]),
    y: useTransform(sy, [0, 100], [-len, len]),
  };
}

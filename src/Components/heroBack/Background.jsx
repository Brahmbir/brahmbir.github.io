// import Spline from '@splinetool/react-spline';
// import { AiOutlineGithub } from "react-icons/ai"
// import { BiLogoLinkedin } from "react-icons/bi"
// import { MdOutlineWebAsset } from "react-icons/md";
// import { IoMailOutline } from "react-icons/io5";

import styles from "./Background.module.css";

import { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useTransform, useSpring } from "framer-motion";

export function useSpringXY(x, y, len) {
  return {
    x: useSpring(x),
    y: useSpring(y),
  };
}
function usePosition(spring, len) {
  return {
    x: useTransform(spring.x, [-50, 50], [-len, len]),
    y: useTransform(spring.y, [-50, 50], [-len, len]),
  };
}
// useTransform(sx, [0, 100], [-len, len]),
const HeroSection = ({ children }) => {
  const MouseX = useMotionValue(0);
  const MouseY = useMotionValue(0);

  const Spring = useSpringXY(MouseX, MouseY);

  const Position11 = usePosition(Spring, 15);
  const Position12 = usePosition(Spring, 20);
  const Position13 = usePosition(Spring, 30);
  const Position14 = usePosition(Spring, 40);
  const Position15 = usePosition(Spring, 60);
  // const Position1 = usePosition(Spring, 40);
  // const Position2 = usePosition(Spring, 50);
  // const Position3 = usePosition(Spring, 60);
  // const Position4 = usePosition(Spring, 70);
  // const Position5 = usePosition(Spring, 80);

  useEffect(() => {
    const mouseMoveHandler = (event) => {
      const Y = (event.clientY / window.innerHeight) * 100 - 50;
      const X = (event.clientX / window.innerWidth) * 100 - 50;

      MouseY.set(Y);
      MouseX.set(X);
    };
    const mouseLeaveHandler = () => {
      MouseY.set(0);
      MouseX.set(0);
    };
    document.body.addEventListener("mousemove", mouseMoveHandler);
    document.body.addEventListener("mouseleave", mouseLeaveHandler);

    return () => {
      document.body.removeEventListener("mousemove", mouseMoveHandler);
      document.body.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, []);

  return (
    <section className={styles.contain}>
      <div className={styles.co}>
        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "10%",
            right: "max(30%,300px)",
            width: "300px",
            zIndex: 11,

            x: Position11.x,
            y: Position11.y,
          }}
        />
        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "47.5%",
            right: "max(25.7%,250px)",
            width: "120px",
            zIndex: 12,

            x: Position12.x,
            y: Position12.y,
          }}
          className={`${styles.blue}`}
        />
        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "11.5%",
            right: "min(-5.5%,-10px)",
            width: "250px",
            zIndex: 13,

            x: Position13.x,
            y: Position13.y,
          }}
          className={`${styles.blue}`}
        />

        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "-10.5%",
            right: "min(-12.5%,-50px)",
            width: "350px",
            zIndex: 15,

            x: Position15.x,
            y: Position15.y,
          }}
          className={`${styles.transparent}`}
        />
        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "45%",
            right: "max(12%,150px)",
            width: "140px",
            zIndex: 15,

            x: Position14.x,
            y: Position14.y,
          }}
          className={`${styles.transparent}`}
        />

        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "50%",
            right: "min(-7.5%,-50px)",
            width: "200px",
            zIndex: 13,

            x: Position13.x,
            y: Position13.y,
          }}
        />

        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "65%",
            right: "max(35%,220px)",
            width: "180px",
            zIndex: 12,

            x: Position12.x,
            y: Position12.y,
          }}
        />
        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "77.5%",
            right: "max(20%,150px)",
            width: "120px",
            zIndex: 13,

            x: Position13.x,
            y: Position13.y,
          }}
          className={`${styles.purple}`}
        />

        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "70.5%",
            right: "max(25.5%,110px)",
            width: "140px",
            zIndex: 17,
            x: Position14.x,
            y: Position14.y,
          }}
          className={`${styles.transparent}`}
        />
        {/*
         */}

        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "67.5%",
            right: "max(65.5%,410px)",
            width: "140px",
            zIndex: 17,
            x: Position11.x,
            y: Position11.y,
          }}
          className={`${styles.transparent}`}
        />
        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "67.5%",
            right: "min(-65.5%,-410px)",
            width: "120px",
            zIndex: 17,
            x: Position11.x,
            y: Position11.y,
          }}
          className={`${styles.purple} `}
        />
        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "10%",
            right: "min(-75.5%,-450px)",
            width: "240px",
            zIndex: 12,
            x: Position11.x,
            y: Position11.y,
          }}
        />
        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "20%",
            right: "min(-130%,-600px)",
            width: "340px",
            zIndex: 12,
            x: Position13.x,
            y: Position13.y,
          }}
          className={`${styles.blue}`}
        />
        <motion.div
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            top: "50%",
            // x: Position5.x,
            // y: Position5.y,
          }}
          className={`${styles.transparent} ${styles.FF}`}
        />
      </div>
      {children}
    </section>
  );
};

export default HeroSection;

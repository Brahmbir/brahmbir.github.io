import React from "react";
import { AiOutlineGithub } from "react-icons/ai";
import { BiLogoLinkedin } from "react-icons/bi";
import { MdOutlineWebAsset } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";

import styles from "./heroDetails.module.css";

const HeroDetails = () => {
  return (
    <div data-role="intro" className={styles.side}>
      <h3>Welcome to My Coding Odyssey!</h3>
      <p>
        🌐 Hi there! I'm Brahmbir Singh, a relentless software developer on a
        journey to innovate and create. Proficient in the artistry of React.js
        and Next.js, I dance seamlessly between the front and back-end realms of
        web development.
      </p>
      <div className={styles.links}>
        <a href="mailto:brahmbir68@gmail.com">
          <IoMailOutline />
        </a>

        <a
          href="https://brahmbir.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdOutlineWebAsset />
        </a>
        <a
          href="https://linkedin.com/in/brahm-bir-singh-6a9115245"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BiLogoLinkedin />
        </a>
        <a
          href="https://github.com/Brahmbir"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineGithub />
        </a>
      </div>
    </div>
  );
};

export default HeroDetails;

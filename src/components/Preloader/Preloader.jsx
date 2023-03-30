import React from "react";
import "./Styles.scss";
import { motion } from "framer-motion";
import preloader from "../../assets/images/preloader.png";
import {
  leftAnimation,
  middleAnimation,
  rightAnimation,
} from "../../utils/LoaderAnimation";
const Preloader = () => {
  return (
    <div className="preloader">
      <motion.div
        variants={leftAnimation}
        animate="visible"
        initial="hidden"
        className="sect1"
      >
        <img src={preloader} alt="" />
      </motion.div>
      <motion.div
        variants={middleAnimation}
        animate="visible"
        initial="hidden"
        className="sect2"
      />
      <motion.div
        className="sect3"
        variants={rightAnimation}
        animate="visible"
        initial="hidden"
      />
    </div>
  );
};

export default Preloader;

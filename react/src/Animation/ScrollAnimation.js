import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScrollAnimation = ({ children }) => {
  /* const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [50, 0]); */

  const { ref, inView } = useInView({ threshold: 0.9 });
  const variants = {
    fadeUp: { opacity: 0, y: 50, transition: { duration: 1.5 } },
    fadeDown: { opacity: 0, y: -50, transition: { duration: 1.5 } },
    fadeLeft: { opacity: 0, x: -50, transition: { duration: 2.5 } },
    fadeRight: { opacity: 0, x: 50, transition: { duration: 2.5 } },
  };

  return (
    <dov ref={ref}>
      <motion.div
        // style={{ opacity, y }}
        // initial={{ opacity: 0, y: 50 }}
        //animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.5 }}

        ref={ref}
        animate={{ opacity: inView ? 1 : 0,   y: inView ? 0 : 50 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </dov>
  );
};

export default ScrollAnimation;

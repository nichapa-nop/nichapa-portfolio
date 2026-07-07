"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Desktop from "./Desktop";

export default function Shell({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);

  // lock page scroll while the desktop overlay is up
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  function open() {
    setOpened(true);
  }

  return (
    <>
      {children}

      <AnimatePresence>
        {!opened && (
          <motion.div
            key="desktop"
            className="fixed inset-0 z-[80]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Desktop onOpen={open} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

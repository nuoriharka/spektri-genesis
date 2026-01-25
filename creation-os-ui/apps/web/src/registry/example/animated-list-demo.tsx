"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedListDemo({ className }: { className?: string }) {
  const [items, setItems] = React.useState(() => Array.from({ length: 6 }).map((_, i) => ({ id: i, t: Date.now() + i })));

  React.useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) => {
        const [first, ...rest] = prev;
        return [...rest, { id: (first?.id ?? 0) + prev.length, t: Date.now() }];
      });
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={(className ?? "") + " grid grid-cols-2 gap-3"}>
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="h-16 rounded-lg border border-white/10 bg-white/5 shadow-sm"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

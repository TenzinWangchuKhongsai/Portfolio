import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[120] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #F8B1C6 0%, #FBC086 50%, #F8B1C6 100%)',
        boxShadow: '0 0 12px rgba(251, 192, 134, 0.7), 0 0 24px rgba(248, 177, 198, 0.4)',
      }}
    />
  );
}


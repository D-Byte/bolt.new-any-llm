import { AnimatePresence, motion, cubicBezier } from 'framer-motion';

const customEasingFn = cubicBezier(0.4, 0, 0.2, 1);

interface ScrollDownButtonProps {
  show: boolean;
  onClick?: ((instance: HTMLDivElement | null) => void) | (() => void);

}

export const ScrollDownButton = ({ show, onClick }: ScrollDownButtonProps) => {
  const handleClick = () => {
    if (typeof onClick === 'function') {
      (onClick as () => void)();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          title="Scroll to end"
          onClick={handleClick}
          className="absolute flex justify-center items-center top-[18px] right-[22px] p-1 bg-accent-500 hover:brightness-94 color-white rounded-md w-[34px] h-[34px] transition-theme disabled:opacity-50 disabled:cursor-not-allowed"
          transition={{ ease: customEasingFn, duration: 0.17 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="text-lg i-ph:arrow-down"></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

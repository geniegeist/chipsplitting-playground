import { AnimatePresence, motion } from 'framer-motion';
import { MouseEventHandler } from 'react';

type Props = {
  value: number;
  onClick: MouseEventHandler<HTMLDivElement>;
  key: string;
};

export default function Cell(props: Props) {
  return (
    <motion.div
      key={props.key}
      className={`${
        props.value === 0
          ? 'bg-gray-200'
          : props.value > 0
          ? 'bg-green-200'
          : 'bg-red-200'
      } rounded-md h-20 w-20 flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors`}
      onClick={props.onClick}
      animate={{ y: 0, x: 0, opacity: 1 }}
      initial={{ opacity: 0, y: 50, x: -50 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      <p className="text-2xl font-bold text-gray-700 select-none">
        {props.value}
      </p>
    </motion.div>
  );
}

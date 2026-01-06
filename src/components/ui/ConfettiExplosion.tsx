import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  rotation: number;
  scale: number;
}

interface ConfettiExplosionProps {
  isActive: boolean;
  onComplete?: () => void;
}

const colors = [
  "hsl(250, 85%, 60%)", // primary
  "hsl(340, 85%, 60%)", // accent
  "hsl(38, 95%, 55%)",  // reward
  "hsl(160, 70%, 42%)", // success
  "hsl(280, 85%, 55%)", // purple
];

export function ConfettiExplosion({ isActive, onComplete }: ConfettiExplosionProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 720 - 360,
        scale: Math.random() * 0.5 + 0.5,
      }));
      setPieces(newPieces);

      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute left-1/2 top-1/2"
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0 }}
              animate={{
                x: piece.x * 10,
                y: [0, -200, 400],
                opacity: [1, 1, 0],
                rotate: piece.rotation,
                scale: piece.scale,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: piece.color }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
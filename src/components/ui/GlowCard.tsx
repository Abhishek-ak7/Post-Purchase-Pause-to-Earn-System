import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "accent" | "success" | "reward";
  variant?: "default" | "premium" | "highlight";
}

const glowColors = {
  primary: "from-primary/20 via-transparent to-transparent",
  accent: "from-accent/20 via-transparent to-transparent",
  success: "from-success/20 via-transparent to-transparent",
  reward: "from-reward/20 via-transparent to-transparent",
};

export function GlowCard({
  children,
  className,
  glowColor = "primary",
  variant = "default",
}: GlowCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card border border-border shadow-card transition-all duration-500",
        variant === "premium" && "border-primary/20",
        variant === "highlight" && "border-accent/20",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -4,
        boxShadow: "var(--shadow-card-hover)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect that follows mouse */}
      {isHovered && (
        <motion.div
          className={cn(
            "absolute w-64 h-64 rounded-full pointer-events-none bg-gradient-radial",
            glowColors[glowColor]
          )}
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Shimmer border effect for premium */}
      {variant === "premium" && (
        <div className="absolute inset-0 rounded-2xl opacity-50">
          <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
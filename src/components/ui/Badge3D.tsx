import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Badge3DProps {
  children: ReactNode;
  variant?: "default" | "success" | "reward" | "premium" | "new";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  pulse?: boolean;
  className?: string;
}

const variants = {
  default: "bg-secondary text-secondary-foreground border-secondary",
  success: "bg-success/10 text-success border-success/20",
  reward: "bg-reward/10 text-reward border-reward/20",
  premium: "bg-gradient-to-r from-primary to-accent text-primary-foreground border-transparent",
  new: "bg-accent/10 text-accent border-accent/20",
};

const sizes = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-1.5",
};

export function Badge3D({
  children,
  variant = "default",
  size = "md",
  icon,
  pulse = false,
  className,
}: Badge3DProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border shadow-sm",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon && <span className={pulse ? "animate-pulse-soft" : ""}>{icon}</span>}
      {children}
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
    </motion.span>
  );
}
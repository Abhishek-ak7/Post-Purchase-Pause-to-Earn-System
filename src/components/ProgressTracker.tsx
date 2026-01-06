import { motion } from "framer-motion";
import { Check, Truck, Package, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stage {
  label: string;
  status: "completed" | "active" | "upcoming";
  icon?: React.ReactNode;
}

interface ProgressTrackerProps {
  stages: Stage[];
  className?: string;
}

const defaultIcons = [
  <Check className="w-4 h-4" key="check" />,
  <Truck className="w-4 h-4" key="truck" />,
  <MapPin className="w-4 h-4" key="pin" />,
];

export function ProgressTracker({ stages, className }: ProgressTrackerProps) {
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {stages.map((stage, index) => (
        <div key={stage.label} className="flex items-center flex-1 last:flex-none">
          {/* Stage Dot */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
          >
            <motion.div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 relative",
                stage.status === "completed" && "bg-gradient-to-br from-success to-success/80 text-success-foreground shadow-md",
                stage.status === "active" && "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-glow",
                stage.status === "upcoming" && "border-2 border-muted bg-background text-muted-foreground"
              )}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Pulse ring for active */}
              {stage.status === "active" && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/30"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              {stage.status === "completed" ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              ) : (
                stage.icon || defaultIcons[index] || <div className="w-2 h-2 rounded-full bg-current" />
              )}
            </motion.div>
            
            <motion.span
              className={cn(
                "mt-2.5 text-xs font-semibold text-center tracking-wide",
                stage.status === "completed" && "text-success",
                stage.status === "active" && "text-primary",
                stage.status === "upcoming" && "text-muted-foreground"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.2 }}
            >
              {stage.label}
            </motion.span>
          </motion.div>

          {/* Connector Line */}
          {index < stages.length - 1 && (
            <div className="flex-1 h-1 mx-4 mt-[-1.25rem] rounded-full overflow-hidden bg-muted/50">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  stage.status === "completed" 
                    ? "bg-gradient-to-r from-success to-success/70" 
                    : "bg-muted"
                )}
                initial={{ width: "0%" }}
                animate={{ width: stage.status === "completed" ? "100%" : "0%" }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
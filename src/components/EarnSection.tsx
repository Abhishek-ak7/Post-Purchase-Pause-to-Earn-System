import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Gift, HelpCircle, X, Clock, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProgressRing } from "./ui/ProgressRing";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { Badge3D } from "./ui/Badge3D";

interface EarnSectionProps {
  children: React.ReactNode;
  onSkipAll?: () => void;
  onRemindLater?: () => void;
  className?: string;
}

export function EarnSection({
  children,
  onSkipAll,
  onRemindLater,
  className,
}: EarnSectionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showReminder, setShowReminder] = useState(false);

  const handleSkipAll = () => {
    setIsVisible(false);
    onSkipAll?.();
  };

  const handleRemindLater = () => {
    setShowReminder(true);
    setTimeout(() => setShowReminder(false), 3000);
    onRemindLater?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <motion.section
      className={cn("relative", className)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Reward Stats Banner */}
      <motion.div
        className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-reward/5 border border-primary/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <ProgressRing progress={75} size={56} strokeWidth={5}>
              <span className="text-sm font-bold text-primary">75%</span>
            </ProgressRing>
            <div>
              <p className="text-sm text-muted-foreground">Your Reward Progress</p>
              <p className="font-bold text-foreground">
                <AnimatedCounter value={375} suffix=" points" /> earned
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                <AnimatedCounter value={127} prefix="$" />
              </p>
              <p className="text-xs text-muted-foreground">Potential Savings</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-success">
                <AnimatedCounter value={4} />
              </p>
              <p className="text-xs text-muted-foreground">Rewards Available</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Header */}
      <motion.div
        className="flex items-start justify-between gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start gap-4">
          <motion.div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-reward to-reward/80 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            animate={{ 
              boxShadow: [
                "0 0 20px hsl(38, 95%, 55%, 0.3)",
                "0 0 40px hsl(38, 95%, 55%, 0.5)",
                "0 0 20px hsl(38, 95%, 55%, 0.3)",
              ]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity },
              scale: { type: "spring" }
            }}
          >
            <Gift className="w-7 h-7 text-reward-foreground" />
          </motion.div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-foreground">
                You've Unlocked Rewards
              </h2>
              <Badge3D variant="new" size="sm">
                New
              </Badge3D>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs p-4">
                  <p className="text-sm leading-relaxed">
                    We show personalized offers after checkout to help you get more value
                    from your purchase. You're always in control—skip anytime.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-muted-foreground">
              Thanks for your order! Here are a few optional ways to earn perks for your next visit.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {children}
      </div>

      {/* Footer Actions */}
      <motion.div
        className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemindLater}
          className="text-muted-foreground hover:text-foreground"
        >
          <Clock className="w-4 h-4 mr-2" />
          Remind me later
        </Button>
        <span className="text-muted-foreground/30">|</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkipAll}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4 mr-2" />
          Skip all
        </Button>
      </motion.div>

      {/* Reminder Toast */}
      <AnimatePresence>
        {showReminder && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-5 py-3 rounded-xl shadow-xl z-50 flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-reward" />
            <p className="text-sm font-medium">
              We'll remind you about these rewards later!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
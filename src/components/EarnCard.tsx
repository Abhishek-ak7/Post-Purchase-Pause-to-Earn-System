import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Sparkles, Zap, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "./ui/GlowCard";
import { Badge3D } from "./ui/Badge3D";
import { ConfettiExplosion } from "./ui/ConfettiExplosion";

interface EarnCardProps {
  icon: ReactNode;
  reward: string;
  action: string;
  details: string[];
  ctaPrimary: string;
  ctaSecondary?: string;
  trustSignal?: string;
  price?: string;
  onAccept?: () => void;
  onSkip?: () => void;
  className?: string;
  variant?: "default" | "premium" | "limited";
  expandedContent?: ReactNode;
  badge?: string;
  savings?: string;
  popularityCount?: number;
}

export function EarnCard({
  icon,
  reward,
  action,
  details,
  ctaPrimary,
  ctaSecondary = "Skip",
  trustSignal,
  price,
  onAccept,
  onSkip,
  className,
  variant = "default",
  expandedContent,
  badge,
  savings,
  popularityCount,
}: EarnCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAccept = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setIsAccepted(true);
      onAccept?.();
    }, 300);
  };

  const handleSkip = () => {
    setIsSkipped(true);
    onSkip?.();
  };

  if (isSkipped) {
    return null;
  }

  if (isAccepted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20 p-6",
          className
        )}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center text-success-foreground shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <div>
            <motion.p
              className="font-bold text-lg text-success"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Successfully Added! 🎉
            </motion.p>
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Check your email for confirmation details
            </motion.p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <ConfettiExplosion isActive={showConfetti} />
      
      <GlowCard
        className={className}
        variant={variant === "premium" ? "premium" : variant === "limited" ? "highlight" : "default"}
        glowColor={variant === "premium" ? "primary" : variant === "limited" ? "accent" : "primary"}
      >
        <div className="p-6">
          {/* Badges Row */}
          {(badge || variant === "limited" || savings) && (
            <div className="flex items-center gap-2 mb-4">
              {badge && (
                <Badge3D variant="premium" size="sm" icon={<Zap className="w-3 h-3" />}>
                  {badge}
                </Badge3D>
              )}
              {variant === "limited" && (
                <Badge3D variant="new" size="sm" pulse>
                  Limited Time
                </Badge3D>
              )}
              {savings && (
                <Badge3D variant="success" size="sm" icon={<TrendingUp className="w-3 h-3" />}>
                  Save {savings}
                </Badge3D>
              )}
            </div>
          )}

          {/* Icon & Reward Header */}
          <div className="flex items-start gap-4 mb-5">
            <motion.div
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md",
                variant === "premium" 
                  ? "bg-gradient-to-br from-primary to-accent text-primary-foreground" 
                  : variant === "limited"
                  ? "bg-gradient-to-br from-accent to-accent/80"
                  : "bg-gradient-to-br from-secondary to-muted"
              )}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {icon}
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg leading-tight text-foreground">{reward}</h3>
              <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">{action}</p>
            </div>
          </div>

          {/* Social Proof */}
          {popularityCount && (
            <motion.div
              className="flex items-center gap-2 mb-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-card flex items-center justify-center text-xs"
                  >
                    {["👤", "👩", "👨"][i - 1]}
                  </div>
                ))}
              </div>
              <span>{popularityCount.toLocaleString()}+ people chose this today</span>
            </motion.div>
          )}

          {/* Details List */}
          <ul className="space-y-2.5 mb-5">
            {details.map((detail, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-foreground/80">{detail}</span>
              </motion.li>
            ))}
          </ul>

          {/* Expanded Content */}
          {expandedContent && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 mb-4 transition-colors"
            >
              Learn more
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          )}

          <AnimatePresence>
            {isExpanded && expandedContent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mb-5 p-4 bg-secondary/50 rounded-xl text-sm text-secondary-foreground border border-border/50">
                  {expandedContent}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleAccept}
              className={cn(
                "flex-1 h-12 font-semibold text-base shadow-lg transition-all",
                variant === "premium" && "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-glow",
                variant === "limited" && "bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent"
              )}
            >
              {ctaPrimary}
              {price && <span className="ml-1.5 opacity-90">– {price}</span>}
            </Button>
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground h-12 px-5"
            >
              {ctaSecondary}
            </Button>
          </div>

          {/* Trust Signal */}
          {trustSignal && (
            <motion.p
              className="mt-4 text-xs text-muted-foreground flex items-center gap-2 bg-secondary/30 rounded-lg px-3 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-base">🔒</span>
              {trustSignal}
            </motion.p>
          )}
        </div>
      </GlowCard>
    </>
  );
}
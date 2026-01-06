import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Package, BookOpen, RefreshCw, ArrowRight, MessageCircle, Star, ThumbsUp, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "./ui/GlowCard";
import { Badge3D } from "./ui/Badge3D";
import { ConfettiExplosion } from "./ui/ConfettiExplosion";

type FeedbackType = "great" | "okay" | "issue" | null;

interface PostDeliveryCheckInProps {
  onFeedback?: (feedback: FeedbackType) => void;
  className?: string;
}

export function PostDeliveryCheckIn({ onFeedback, className }: PostDeliveryCheckInProps) {
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null);

  const handleFeedback = (type: FeedbackType) => {
    if (type === "great") {
      setShowConfetti(true);
    }
    setFeedback(type);
    onFeedback?.(type);
  };

  const emojis = [
    { type: "great" as const, emoji: "😊", label: "Great", color: "from-success to-success/80" },
    { type: "okay" as const, emoji: "😐", label: "Okay", color: "from-reward to-reward/80" },
    { type: "issue" as const, emoji: "☹️", label: "Issue", color: "from-destructive to-destructive/80" },
  ];

  // Great feedback flow
  if (feedback === "great") {
    return (
      <>
        <ConfettiExplosion isActive={showConfetti} onComplete={() => setShowConfetti(false)} />
        
        <motion.div
          className={cn("", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-success to-success/80 mb-5 shadow-xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-4xl">🎉</span>
            </motion.div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Awesome!</h2>
            <p className="text-muted-foreground text-lg">We're so glad you're happy. Here's what's next:</p>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlowCard className="cursor-pointer" glowColor="primary">
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <BookOpen className="w-7 h-7 text-primary-foreground" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground">Setup Guide</h3>
                        <Badge3D variant="premium" size="sm">Popular</Badge3D>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get the most out of your headphones with expert tips
                      </p>
                    </div>
                    <motion.div whileHover={{ x: 5 }}>
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlowCard className="cursor-pointer" glowColor="reward">
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-reward to-reward/80 flex items-center justify-center shadow-md"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <RefreshCw className="w-7 h-7 text-reward-foreground" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground">Set Up Auto-Refill</h3>
                        <Badge3D variant="success" size="sm">Save 15%</Badge3D>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Never run out + earn double loyalty points
                      </p>
                    </div>
                    <motion.div whileHover={{ x: 5 }}>
                      <ArrowRight className="w-5 h-5 text-reward" />
                    </motion.div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlowCard className="cursor-pointer" glowColor="accent">
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-md"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <Star className="w-7 h-7 text-accent-foreground" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground">Leave a Review</h3>
                        <Badge3D variant="reward" size="sm">+50 pts</Badge3D>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Share your experience and earn bonus points
                      </p>
                    </div>
                    <motion.div whileHover={{ x: 5 }}>
                      <ArrowRight className="w-5 h-5 text-accent" />
                    </motion.div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button variant="ghost" className="w-full text-muted-foreground">
                Not interested right now
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </>
    );
  }

  // Issue feedback flow - route to support
  if (feedback === "issue") {
    return (
      <motion.div
        className={cn("", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-destructive/20 to-destructive/10 mb-5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <MessageCircle className="w-10 h-10 text-destructive" />
          </motion.div>
          <h2 className="text-3xl font-bold text-foreground mb-2">We're Here to Help</h2>
          <p className="text-muted-foreground text-lg">
            Sorry to hear there's an issue. Let's get it sorted right away.
          </p>
        </motion.div>

        <GlowCard>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>Support Online</span>
              </div>
              <span>•</span>
              <span>Average response: 2 min</span>
            </div>
            
            <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90" size="lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with Support Now
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              98% of issues resolved in first contact
            </p>
          </div>
        </GlowCard>
      </motion.div>
    );
  }

  // Okay feedback flow - survey
  if (feedback === "okay") {
    if (surveyStarted) {
      return (
        <motion.div
          className={cn("", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <GlowCard>
            <div className="p-6">
              <h3 className="font-bold text-lg text-foreground mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Quick Survey
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    What could have been better?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Packaging", "Delivery Speed", "Product Quality", "Communication", "Other"].map((option, i) => (
                      <motion.div
                        key={option}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Button variant="outline" size="sm" className="rounded-full">
                          {option}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <Button className="w-full h-12 font-semibold bg-gradient-to-r from-success to-success/90">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Submit & Get $5 Credit
                  </Button>
                </div>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      );
    }

    return (
      <motion.div
        className={cn("", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <GlowCard>
          <div className="p-6 text-center">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-reward/10 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <span className="text-3xl">💬</span>
            </motion.div>
            <h3 className="font-bold text-lg text-foreground mb-2">
              Want to tell us more?
            </h3>
            <p className="text-muted-foreground mb-5">
              Complete a quick survey and get $5 credit.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => setSurveyStarted(true)}
                className="bg-gradient-to-r from-primary to-primary/90"
              >
                Quick survey – 30 sec
              </Button>
              <Button variant="ghost" className="text-muted-foreground">
                No thanks
              </Button>
            </div>
          </div>
        </GlowCard>
      </motion.div>
    );
  }

  // Initial state - ask for feedback
  return (
    <motion.div
      className={cn("", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <GlowCard>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-md"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <Package className="w-7 h-7 text-success-foreground" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold text-xl text-foreground">Your order has arrived!</h2>
                <Badge3D variant="success" size="sm">Delivered</Badge3D>
              </div>
              <p className="text-muted-foreground">How's everything with your purchase?</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            {emojis.map((item, index) => (
              <motion.button
                key={item.type}
                onClick={() => handleFeedback(item.type)}
                onMouseEnter={() => setHoveredEmoji(item.type)}
                onMouseLeave={() => setHoveredEmoji(null)}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl hover:bg-secondary/50 transition-all flex-1 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="text-5xl"
                  animate={{
                    scale: hoveredEmoji === item.type ? 1.2 : 1,
                    rotate: hoveredEmoji === item.type ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.emoji}
                </motion.span>
                <span className={cn(
                  "text-sm font-semibold transition-colors",
                  hoveredEmoji === item.type ? "text-foreground" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
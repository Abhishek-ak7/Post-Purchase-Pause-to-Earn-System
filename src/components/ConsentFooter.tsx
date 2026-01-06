import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Settings, Shield, MessageCircle, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConsentFooterProps {
  onTurnOffOffers?: () => void;
  onManageSettings?: () => void;
  onChat?: () => void;
  className?: string;
}

export function ConsentFooter({
  onTurnOffOffers,
  onManageSettings,
  onChat,
  className,
}: ConsentFooterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-border/50",
        "glass-strong",
        className
      )}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container max-w-4xl mx-auto">
        {/* Collapsed View */}
        <div className="flex items-center justify-between px-6 py-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Manage Preferences</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp className="w-4 h-4" />
            </motion.div>
          </button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onChat}
            className="text-muted-foreground hover:text-foreground"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Questions? Chat with us
          </Button>
        </div>

        {/* Expanded View */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-border/50"
            >
              <div className="px-6 py-4 space-y-3">
                <button
                  onClick={onTurnOffOffers}
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-secondary/50 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Turn off post-purchase offers</p>
                    <p className="text-xs text-muted-foreground">Stop seeing reward recommendations</p>
                  </div>
                </button>

                <button
                  onClick={onManageSettings}
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-secondary/50 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Adjust notification settings</p>
                    <p className="text-xs text-muted-foreground">Control how we contact you</p>
                  </div>
                </button>

                <a
                  href="#"
                  className="block text-xs text-muted-foreground hover:text-foreground transition-colors pt-2"
                >
                  View privacy policy →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.footer>
  );
}
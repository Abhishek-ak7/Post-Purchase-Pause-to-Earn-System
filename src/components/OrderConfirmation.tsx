import { ProgressTracker } from "./ProgressTracker";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, FileText, MapPin, Sparkles, Copy, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GlowCard } from "./ui/GlowCard";
import { Badge3D } from "./ui/Badge3D";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { useState } from "react";
import { toast } from "sonner";

interface OrderItem {
  name: string;
  price: number;
  quantity?: number;
  image?: string;
}

interface OrderConfirmationProps {
  orderNumber: string;
  deliveryDate: string;
  items: OrderItem[];
  shippingCost: number | "Free";
  total: number;
  onTrackPackage?: () => void;
  onViewReceipt?: () => void;
  className?: string;
}

export function OrderConfirmation({
  orderNumber,
  deliveryDate,
  items,
  shippingCost,
  total,
  onTrackPackage,
  onViewReceipt,
  className,
}: OrderConfirmationProps) {
  const [copied, setCopied] = useState(false);

  const stages = [
    { label: "Confirmed", status: "completed" as const },
    { label: "In Transit", status: "upcoming" as const },
    { label: "Delivered", status: "upcoming" as const },
  ];

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    toast.success("Order number copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className={cn("", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Success Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-success to-success/80 mb-5 shadow-xl relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        >
          {/* Animated rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-success/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-success/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <CheckCircle className="w-10 h-10 text-success-foreground" />
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-foreground mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Order Confirmed! 🎉
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-muted-foreground">
            Order <span className="font-semibold text-foreground">#{orderNumber}</span>
          </p>
          <button
            onClick={copyOrderNumber}
            className="p-1.5 rounded-md hover:bg-secondary transition-colors"
          >
            <Copy className={cn("w-4 h-4", copied ? "text-success" : "text-muted-foreground")} />
          </button>
        </motion.div>
      </motion.div>

      {/* Delivery Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlowCard className="mb-6" glowColor="primary">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.05 }}
                >
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="font-bold text-lg text-foreground">{deliveryDate}</p>
                </div>
              </div>
              <Badge3D variant="success" size="md">
                On Track
              </Badge3D>
            </div>

            <ProgressTracker stages={stages} className="mb-6" />

            <Button
              onClick={onTrackPackage}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
              size="lg"
            >
              <Package className="w-5 h-5 mr-2" />
              Track Package
              <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
            </Button>
          </div>
        </GlowCard>
      </motion.div>

      {/* Order Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlowCard>
          <div className="p-6">
            <h2 className="font-bold text-lg text-foreground mb-5">Order Summary</h2>
            
            <div className="space-y-4 mb-5">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-2xl">
                    🎧
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {item.quantity && item.quantity > 1 ? `${item.quantity}× ` : ""}
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="font-bold text-foreground">
                    $<AnimatedCounter value={item.price} />
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">${items.reduce((a, b) => a + b.price, 0).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className={cn(
                  "font-medium",
                  shippingCost === "Free" ? "text-success" : "text-foreground"
                )}>
                  {shippingCost === "Free" ? (
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Free
                    </span>
                  ) : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
              <span className="font-bold text-lg text-foreground">Total</span>
              <span className="font-bold text-2xl text-foreground">
                $<AnimatedCounter value={total} />
              </span>
            </div>

            <Button
              onClick={onViewReceipt}
              variant="ghost"
              className="w-full mt-5 text-muted-foreground hover:text-foreground"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Full Receipt
            </Button>
          </div>
        </GlowCard>
      </motion.div>
    </motion.div>
  );
}
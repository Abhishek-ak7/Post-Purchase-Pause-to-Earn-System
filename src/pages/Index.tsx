import { useState } from "react";
import { OrderConfirmation } from "@/components/OrderConfirmation";
import { EarnSection } from "@/components/EarnSection";
import { EarnCard } from "@/components/EarnCard";
import { ConsentFooter } from "@/components/ConsentFooter";
import { PostDeliveryCheckIn } from "@/components/PostDeliveryCheckIn";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<"confirmation" | "delivery">("confirmation");

  const orderData = {
    orderNumber: "AX7829",
    deliveryDate: "Thursday, Jan 9",
    items: [{ name: "Sony WH-1000XM5 Wireless Headphones", price: 89.0 }],
    shippingCost: "Free" as const,
    total: 89.0,
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 mesh-bg opacity-60 pointer-events-none" />
      <FloatingParticles />

      {/* Header */}
      <motion.header
        className="border-b border-border/50 glass-strong sticky top-0 z-40"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container max-w-4xl mx-auto py-4 px-6">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg text-foreground">PauseToEarn</span>
                <p className="text-xs text-muted-foreground -mt-0.5">Post-Purchase Experience</p>
              </div>
            </motion.div>
            
            <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as any)}>
              <TabsList className="bg-secondary/50 backdrop-blur-sm">
                <TabsTrigger
                  value="confirmation"
                  className="data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm"
                >
                  Post-Purchase
                </TabsTrigger>
                <TabsTrigger
                  value="delivery"
                  className="data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm"
                >
                  Post-Delivery
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-6 py-10 pb-28 relative z-10">
        {currentView === "confirmation" ? (
          <>
            {/* Phase 1: Order Confirmation */}
            <OrderConfirmation
              {...orderData}
              onTrackPackage={() => console.log("Track package clicked")}
              onViewReceipt={() => console.log("View receipt clicked")}
              className="mb-12"
            />

            {/* Phase 2 & 3: Earn Section with Cards */}
            <EarnSection
              onSkipAll={() => console.log("Skipped all")}
              onRemindLater={() => console.log("Remind later")}
            >
              {/* Card 1: Notification Opt-In */}
              <EarnCard
                icon="📦"
                reward="Get 10% Off Your Next Order"
                action="Enable delivery updates and we'll text you when your package is arriving."
                details={[
                  "Real-time GPS tracking",
                  "Delivery photo alerts",
                  "10% coupon (valid 30 days)",
                ]}
                ctaPrimary="Enable Updates"
                trustSignal="We'll send 2–3 texts max. Unsubscribe anytime."
                onAccept={() => console.log("Notification opt-in accepted")}
                onSkip={() => console.log("Notification opt-in skipped")}
                badge="Most Popular"
                popularityCount={12847}
              />

              {/* Card 2: Protection Plan */}
              <EarnCard
                icon="🛡️"
                reward="Extend Your Return Window"
                action="Add 2-year protection for $12 and get 60-day returns (vs 30)."
                details={[
                  "Accidental damage coverage",
                  "Wear and tear protection",
                  "Free repairs/replacement",
                ]}
                ctaPrimary="Add Protection"
                price="$12"
                trustSignal="Charged separately. Cancel anytime in first 30 days."
                variant="premium"
                savings="$47"
                onAccept={() => console.log("Protection plan accepted")}
                onSkip={() => console.log("Protection plan skipped")}
              />

              {/* Card 3: Subscribe & Save */}
              <EarnCard
                icon="♻️"
                reward="Never Run Out + Earn 500 Points"
                action="Switch to auto-delivery and save 15% on every refill."
                details={[
                  "Delivers every 60 days",
                  "Skip or cancel anytime",
                  "Earn loyalty points 2x faster",
                ]}
                ctaPrimary="Subscribe Now"
                ctaSecondary="Not Now"
                trustSignal="Next delivery: March 9. Adjust frequency or cancel from your account."
                variant="limited"
                onAccept={() => console.log("Subscription accepted")}
                onSkip={() => console.log("Subscription skipped")}
                expandedContent={
                  <div>
                    <p className="mb-2 font-semibold">
                      How it works:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>We'll send your first refill in 60 days</li>
                      <li>Skip, reschedule, or cancel anytime from your account</li>
                      <li>Get reminded 3 days before each delivery</li>
                    </ul>
                  </div>
                }
              />

              {/* Card 4: Educational Video */}
              <EarnCard
                icon="🎬"
                reward="Watch Tips & Get Free Shipping"
                action="2-minute setup guide for your new headphones."
                details={[
                  "Get perfect sound in 5 steps",
                  "Learn hidden features",
                  "Unlock free shipping (next order, no minimum)",
                ]}
                ctaPrimary="Watch Now – 2 min"
                onAccept={() => console.log("Video started")}
                onSkip={() => console.log("Video skipped")}
                popularityCount={8429}
              />
            </EarnSection>
          </>
        ) : (
          /* Post-Delivery Check-In */
          <PostDeliveryCheckIn
            onFeedback={(feedback) => console.log("Feedback:", feedback)}
          />
        )}
      </main>

      {/* Consent Footer */}
      <ConsentFooter
        onTurnOffOffers={() => console.log("Turn off offers")}
        onManageSettings={() => console.log("Manage settings")}
        onChat={() => console.log("Chat clicked")}
      />
    </div>
  );
};

export default Index;
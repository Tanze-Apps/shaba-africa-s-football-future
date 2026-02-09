import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const Waitlist = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus("success");
    setEmail("");
  };

  return (
    <section
      id="waitlist"
      ref={ref}
      className="hero-section py-24 md:py-32 px-6 relative"
    >
      {/* Background Effects */}
      <div className="hero-glow" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-sm font-medium">Early Access</span>
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hero-foreground tracking-tight mb-6">
            Be among the first to{" "}
            <span className="gradient-text">shape the future</span>
          </h2>

          <p className="text-xl text-hero-muted max-w-xl mx-auto mb-10">
            Join the waitlist and get early access when we launch. Help us build
            the platform grassroots football deserves.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-hero-foreground">
                  You're on the list!
                </h3>
                <p className="text-hero-muted">
                  We'll notify you when Shaba.cm launches. Get ready to play.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-primary hover:text-primary/80 text-sm font-medium mt-4"
                >
                  Add another email
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex w-full max-w-xl flex-col sm:flex-row items-stretch gap-3 sm:gap-4 mx-auto p-2 sm:p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full flex-1 px-5 py-4 sm:py-4.5 rounded-xl bg-white/5 border border-white/10 text-hero-foreground placeholder:text-hero-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full sm:w-auto px-7 sm:px-8 py-4 sm:py-4.5 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Get Early Access
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-hero-muted/60 text-sm mt-6">
            No spam, ever. We respect your inbox.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Waitlist;

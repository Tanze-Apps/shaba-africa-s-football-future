import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { joinWaitlist, WaitlistError } from "../../lib/waitlist";

const Waitlist = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    setStatus("loading");
    setFeedback(null);

    try {
      const response = await joinWaitlist(trimmedEmail);
      setStatus("success");
      setFeedback(response.message);
      setEmail("");
    } catch (error) {
      const message =
        error instanceof WaitlistError
          ? error.message
          : "Something went wrong. Please try again.";
      setStatus("error");
      setFeedback(message);
    }
  };

  return (
    <section
      id="waitlist"
      ref={ref}
      className="py-20 md:py-32 px-6 bg-[#f7f7f7] relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge mx-auto">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Early Access
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-none mb-6 md:mb-8">
            Be among the first to <br />
            <span className="pill-highlight">shape the future</span>
          </h2>

          <p className="text-base md:text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-8 md:mb-10 px-2 md:px-0">
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
                className="flex flex-col items-center gap-4 bg-white p-12 rounded-[2rem] border border-black/[0.03] shadow-xl"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                  You're on the list!
                </h3>
                <p className="text-gray-500 font-medium text-lg">
                  {feedback ??
                    "We'll notify you when Shabas launches. Get ready to play."}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-primary hover:text-primary/70 font-bold mt-6 transition-colors"
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
                className="flex w-full max-w-2xl flex-col sm:flex-row items-stretch gap-4 mx-auto p-2 sm:p-4 rounded-2xl sm:rounded-[2rem] bg-white border border-black/[0.04] shadow-2xl shadow-black/5"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full flex-1 px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-gray-50 border border-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-primary/20 transition-all font-medium text-base md:text-lg"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-primary text-white font-black px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight size={20} className="stroke-[3px]" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {status === "error" && (
            <p className="text-destructive font-bold text-sm mt-6">{feedback}</p>
          )}

          <p className="text-gray-400 font-medium text-sm mt-8">
            No spam, ever. We respect your inbox privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Waitlist;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, ChevronRight } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#who-its-for", label: "Who It's For" },
    { href: "#waitlist", label: "Waitlist" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-2 md:py-4" : "py-4 md:py-8"
      } px-4 md:px-6`}
    >
      <nav 
        className={`max-w-7xl mx-auto flex items-center justify-between rounded-full px-5 py-2.5 md:px-10 md:py-4 transition-all duration-500 border ${
          isScrolled 
            ? "border-black/5 bg-white/80 backdrop-blur-2xl shadow-2xl shadow-black/5 ring-1 ring-black/5" 
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-all duration-300 group-hover:rotate-[10deg] group-hover:scale-110 shadow-lg shadow-primary/20">
            <Zap className="text-primary-foreground fill-current" size={20} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-gray-900 group-hover:text-primary transition-colors duration-300">
            Shaba<span className="text-primary group-hover:text-gray-900 transition-colors duration-300">.cm</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="px-5 py-2 text-sm font-black text-gray-500 hover:text-primary rounded-full hover:bg-primary/5 transition-all duration-300"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:block">
          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            href="#waitlist" 
            className={`px-8 py-3 rounded-full font-black text-sm transition-all duration-300 flex items-center gap-2 group ${
              isScrolled 
                ? "bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1" 
                : "bg-gray-900 text-white hover:bg-primary hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1"
            }`}
          >
            Join Waitlist
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden rounded-full p-3 transition-all duration-300 shadow-sm ${
            isScrolled 
              ? "bg-primary/5 text-primary" 
              : "bg-white text-gray-900 border border-gray-100"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden mt-4 rounded-[3rem] p-10 border border-gray-100 bg-white shadow-2xl overflow-hidden relative"
          >
            {/* Background patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="flex flex-col gap-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.href}
                  href={link.href}
                  className="text-3xl font-black text-gray-900 hover:text-primary transition-all flex items-center justify-between group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="opacity-0 group-hover:opacity-100 transition-all text-primary"
                  >
                    <ChevronRight size={32} />
                  </motion.div>
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href="#waitlist" 
                className="btn-primary text-center mt-6 py-5 text-xl rounded-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Waitlist
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

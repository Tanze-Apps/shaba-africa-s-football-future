import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Twitter, Instagram, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  return (
    <footer ref={ref} className="bg-white border-t border-black/[0.04] py-20 md:py-24 px-6 relative overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <a href="#" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                <span className="text-white font-black text-xl">S</span>
              </div>
              <span className="text-gray-900 font-black text-2xl tracking-tighter">Shaba.cm</span>
            </a>
            <p className="text-gray-500 font-medium text-center md:text-left max-w-sm leading-relaxed">
              Building the digital infrastructure for grassroots football across Africa. Connecting talent to opportunity.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end gap-6">
             <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-primary hover:border-primary group transition-all duration-300 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-8">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-primary transition-colors font-bold text-sm tracking-tight"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-black/[0.04] to-transparent my-12 md:my-16" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-bold tracking-tight">
          <p className="text-gray-400 flex items-center gap-2">
            © {currentYear} Shaba.cm. Crafted for the future of 
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md">African Football</span>
          </p>
          <div className="flex items-center gap-2 text-gray-400">
            <Globe className="w-4 h-4" />
            <span>Built with passion in Cameroon</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;

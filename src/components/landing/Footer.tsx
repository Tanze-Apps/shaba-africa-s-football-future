import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Twitter, Instagram, Linkedin, Globe } from "lucide-react";
import { Link } from "react-router-dom";

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
    { label: "Privacy Policy", href: "/privacy-policy" },
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
            <Link to="/" className="group flex items-center gap-3">
              <img
                src="/logo/shaba-logo.png"
                alt="Shaba Logo"
                className="h-16 w-auto object-contain transition-transform group-hover:scale-110"
              />
            </Link>
            <p className="text-gray-500 font-medium text-center md:text-left max-w-sm leading-relaxed">
              Building the digital infrastructure for grassroots football across Africa.
            </p>
            <div className="flex flex-col items-center md:items-start gap-2 text-sm font-bold text-gray-600">
              <a href="mailto:shabasfootball@gmail.com" className="hover:text-primary transition-colors">shabasfootball@gmail.com</a>
              <a href="tel:+237673015993" className="hover:text-primary transition-colors">+237 673 015 993</a>
            </div>
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
                link.href.startsWith("/") ? (
                  <Link
                    key={index}
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors font-bold text-sm tracking-tight"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors font-bold text-sm tracking-tight"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-black/[0.04] to-transparent my-12 md:my-16" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-bold tracking-tight">
          <p className="text-gray-400 flex items-center gap-2">
            © {currentYear} Shabas. Crafted for the future of
            <span className="pill-highlight">African Football</span>
          </p>
          {/* <div className="flex items-center gap-2 text-gray-400">
            <Globe className="w-4 h-4" />
            <span>Built with passion in Cameroon</span>
          </div> */}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;

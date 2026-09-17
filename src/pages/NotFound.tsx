import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-5">
      <div className="u-grid-lines absolute inset-0 opacity-60" />

      <div className="relative text-center">
        <span className="font-display block text-[clamp(90px,22vw,240px)] leading-none text-bone/90">
          404
        </span>
        <p className="mt-4 text-[15px] text-bone-dim md:text-[17px]">
          This page is off the pitch.
        </p>
        <Link
          to="/"
          className="mt-9 inline-flex items-center gap-3 bg-brand px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-brand-bright"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

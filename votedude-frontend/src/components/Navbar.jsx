import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Candidates", path: "/candidates" },
  { name: "Issues", path: "/issues" },
  { name: "Laws", path: "/laws" },
  { name: "Petitions", path: "/petitions" },
  { name: "Vote", path: "/vote" },
  { name: "News", path: "/news" },
  { name: "Discuss", path: "/discuss" },
  { name: "Events", path: "/events" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-black text-lg tracking-tight"
        >
          <img src="/logo-white.png" alt="Logo" className="w-[25vh]" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-vd-black/80">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-vd-green transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <button className="text-sm font-semibold">Log In</button>
          <button className="bg-vd-green hover:bg-vd-green-dark transition-colors text-white text-sm font-bold px-5 py-2.5 rounded-md">
            JOIN NOW
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-vd-black mb-1.5" />
          <span className="block w-6 h-0.5 bg-vd-black mb-1.5" />
          <span className="block w-6 h-0.5 bg-vd-black" />
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="lg:hidden px-6 pb-4 flex flex-col gap-3 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setOpen(false)}>
              {link.name}
            </Link>
          ))}
          <button className="bg-vd-green text-white font-bold px-5 py-2.5 rounded-md mt-2">
            JOIN NOW
          </button>
        </nav>
      )}
    </header>
  );
}

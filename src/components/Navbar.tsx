
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: "À propos", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white shadow-md py-2" 
        : "bg-transparent py-4"
    }`}>
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className={`text-2xl font-bold ${
            scrolled || isOpen
              ? "text-supreme-primary"
              : "text-supreme-primary"
          } transition-colors`}>
            SupremEnergies
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-medium transition-colors hover:text-supreme-primary ${
                location.pathname === link.path
                  ? "text-supreme-primary"
                  : scrolled
                    ? "text-gray-800"
                    : "text-supreme-primary font-semibold"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Button 
          asChild 
          className="hidden md:inline-flex bg-supreme-accent hover:bg-supreme-accent/90"
        >
          <Link to="/contact">Demander un devis</Link>
        </Button>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${
            scrolled || isOpen ? "text-gray-800" : "text-supreme-primary"
          } hover:text-supreme-primary`}
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors hover:text-supreme-primary ${
                  location.pathname === link.path
                    ? "text-supreme-primary"
                    : "text-gray-800"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              asChild 
              className="w-full bg-supreme-accent hover:bg-supreme-accent/90"
            >
              <Link to="/contact">Demander un devis</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

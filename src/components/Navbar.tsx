
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceSubLinks = [
  { name: "Isolation Thermique", path: "/services/isolation-thermique" },
  { name: "Pompe à Chaleur", path: "/services/pompe-a-chaleur" },
  { name: "Panneaux Solaires", path: "/services/panneaux-solaires" },
  { name: "Rénovation Globale", path: "/services/renovation-globale" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Simulateur", path: "/simulateur-aides" },
    { name: "Témoignages", path: "/temoignages" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isServicesActive = location.pathname.startsWith("/services");

  // Navbar toujours opaque blanche sur toutes les routes pour garantir la lisibilité
  const isSolid = true;

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 bg-white shadow-md ${
      scrolled ? "py-2" : "py-3"
    }`}>
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-supreme-primary transition-colors">
            SupremEnergies
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) =>
            link.name === "Services" ? (
              <div
                key={link.name}
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  to={link.path}
                  className={`font-medium transition-colors hover:text-supreme-primary inline-flex items-center gap-1 ${
                    isServicesActive
                      ? "text-supreme-primary"
                      : isSolid
                        ? "text-gray-800"
                        : "text-supreme-primary font-semibold"
                  }`}
                >
                  {link.name}
                  <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </Link>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-fade-in">
                    {serviceSubLinks.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`block px-4 py-2.5 text-sm transition-colors hover:bg-supreme-light hover:text-supreme-primary ${
                          location.pathname === sub.path
                            ? "text-supreme-primary bg-supreme-light"
                            : "text-gray-700"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors hover:text-supreme-primary ${
                  location.pathname === link.path
                    ? "text-supreme-primary"
                    : isSolid
                      ? "text-gray-800"
                      : "text-supreme-primary font-semibold"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* CTA Button */}
        <Button 
          asChild 
          className="hidden md:inline-flex bg-supreme-accent hover:bg-supreme-accent/90"
        >
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform?usp=header" target="_blank" rel="noopener noreferrer">Demander un devis</a>
        </Button>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${
            isSolid || isOpen ? "text-gray-800" : "text-supreme-primary"
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
            {navLinks.map((link) =>
              link.name === "Services" ? (
                <div key={link.name}>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={`font-medium transition-colors hover:text-supreme-primary inline-flex items-center gap-1 w-full ${
                      isServicesActive ? "text-supreme-primary" : "text-gray-800"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-4 mt-2 flex flex-col space-y-2">
                      <Link
                        to="/services"
                        className={`text-sm font-medium transition-colors hover:text-supreme-primary ${
                          location.pathname === "/services" ? "text-supreme-primary" : "text-gray-600"
                        }`}
                      >
                        Tous les services
                      </Link>
                      {serviceSubLinks.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={`text-sm transition-colors hover:text-supreme-primary ${
                            location.pathname === sub.path ? "text-supreme-primary" : "text-gray-600"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium transition-colors hover:text-supreme-primary ${
                    location.pathname === link.path ? "text-supreme-primary" : "text-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
            <Button 
              asChild 
              className="w-full bg-supreme-accent hover:bg-supreme-accent/90"
            >
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform?usp=header" target="_blank" rel="noopener noreferrer">Demander un devis</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

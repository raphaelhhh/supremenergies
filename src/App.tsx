
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalNotices from "./pages/LegalNotices";
import IsolationThermique from "./pages/services/IsolationThermique";
import PompeAChaleur from "./pages/services/PompeAChaleur";
import PanneauxSolaires from "./pages/services/PanneauxSolaires";
import RenovationGlobale from "./pages/services/RenovationGlobale";
import ZoneLocale from "./pages/ZoneLocale";
import ServiceCity from "./pages/ServiceCity";
import SimulateurAides from "./pages/SimulateurAides";
import Temoignages from "./pages/Temoignages";
import DevisGratuit from "./pages/DevisGratuit";
import StickyMobileCTA from "./components/StickyMobileCTA";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/isolation-thermique" element={<IsolationThermique />} />
                <Route path="/services/pompe-a-chaleur" element={<PompeAChaleur />} />
                <Route path="/services/panneaux-solaires" element={<PanneauxSolaires />} />
                <Route path="/services/renovation-globale" element={<RenovationGlobale />} />
                {/* SEO local : pages service × ville (longue traîne) */}
                <Route path="/services/:service/:ville" element={<ServiceCity />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/zones/:ville" element={<ZoneLocale />} />
                <Route path="/simulateur-aides" element={<SimulateurAides />} />
                <Route path="/temoignages" element={<Temoignages />} />
                <Route path="/devis-gratuit" element={<DevisGratuit />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/legal" element={<LegalNotices />} />
                <Route path="/mentions-legales" element={<LegalNotices />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <StickyMobileCTA />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

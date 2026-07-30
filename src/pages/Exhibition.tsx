import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Star, Zap, TrendingUp, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { heroBackgroundApi, SERVER_URL } from "@/lib/api";

const boothPackages = [
  { name: "Standard", price: "$3,500", size: "9 sqm", features: ["Shell scheme booth", "Fascia board", "2 spotlights", "1 power socket", "2 exhibitor passes"] },
  { name: "Premium", price: "$6,500", size: "12 sqm", features: ["Shell scheme booth", "Custom fascia", "4 spotlights", "2 power sockets", "4 exhibitor passes", "Featured listing", "Meeting table"], popular: true },
  { name: "Enterprise", price: "$12,000+", size: "18+ sqm", features: ["Raw space", "Custom build", "Premium location", "6+ exhibitor passes", "VIP networking", "Keynote slot", "Marketing package"] },
];

const faqs = [
  { q: "When is the exhibition?", a: "August 21-23, 2026 at Dubai World Trade Centre." },
  { q: "What are the booth setup hours?", a: "Setup begins August 13-14, 8am–8pm." },
  { q: "Is international shipping support available?", a: "Yes, we have partnerships with global logistics providers for exhibitor shipments." },
  { q: "Can I upgrade my booth package?", a: "Absolutely. Contact our team to discuss upgrade options at any time before the event." },
];

interface ExhibitionProps {
}

const Exhibition = () => {
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await heroBackgroundApi.getByPage("General / Exhibition");
        if (data) setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    };
    fetchHero();
  }, []);

  const heroBg = heroData?.backgroundImage
    ? `${SERVER_URL}${heroData.backgroundImage}`
    : "/images/expo-innovation.webp";

  return (
    <div className="bg-white min-h-screen font-inter">
      {/* ── HERO SECTION - Standardized 16:4 Sleek Style ── */}
      <section
        className="hero-background-standard"
        style={{
          backgroundImage: `url(${heroBg})`
        }}
      >

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-white" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
        <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
            {heroData?.title || "Exhibition"}
          </p>
          <h1 className="text-4xl md:text-6xl font-inter font-semibold mb-6 tracking-tight">
            {heroData?.heading || "Exhibit at IHWE 2026"}
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            {heroData?.shortDescription || "The ultimate platform to showcase breakthrough medical solutions."}
          </p>
        </div>
      </section>

      {/* Why Exhibit */}
      <section id="why" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14" data-aos="fade-up">
            <h2 className="text-3xl font-inter font-bold text-foreground mb-4">Why Showcase With Us</h2>
            <p className="text-muted-foreground">Position your brand at the intersection of global healthcare innovation and decision-making.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Star, title: "Brand Visibility", text: "Reach 8,000+ qualified healthcare professionals" },
              { icon: Zap, title: "Live Demos", text: "Showcase products to decision-makers in real-time" },
              { icon: TrendingUp, title: "Business Growth", text: "Generate leads worth millions in potential deals" },
              { icon: CheckCircle, title: "Global Network", text: "Connect with buyers from 25+ countries" },
            ].map((b) => (
              <div key={b.title} data-aos="fade-up" className="p-6 rounded-2xl border border-border/50 bg-muted/20 hover:shadow-md transition-shadow">
                <b.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-inter font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Exhibit */}
      <section id="who" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-inter font-bold text-foreground mb-10">Who You'll Meet</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Hospital Administrators", "Procurement Officers", "Medical Directors", "Healthcare IT Leaders", "Pharma Executives", "Government Officials", "Research Scientists", "Distributors & Importers"].map(w => (
              <span key={w} className="px-5 py-2.5 rounded-full bg-background border border-border/50 text-sm font-medium text-foreground hover:border-primary/30 transition-colors">{w}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Exhibition Zones */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-inter font-bold text-foreground mb-10">Exhibition Zones</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Medical Devices & Equipment", "Pharma & Biotech", "Digital Health & AI", "Hospital Infrastructure", "Diagnostics & Lab", "Wellness & Rehabilitation"].map(z => (
              <div key={z} className="p-6 rounded-2xl gradient-light-blue border border-primary/10 text-center">
                <h3 className="font-inter font-semibold text-foreground">{z}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booth Packages */}
      <section id="reserve" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-inter font-bold text-foreground text-center mb-12" data-aos="fade-up">Booth Packages</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {boothPackages.map((pkg, i) => (
              <div key={pkg.name} data-aos="fade-up" data-aos-delay={i * 100} className={`rounded-2xl p-8 border ${pkg.popular ? "border-primary shadow-lg ring-2 ring-primary/20" : "border-border/50"} bg-background relative`}>
                {pkg.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-semibold">Most Popular</span>}
                <h3 className="font-inter font-bold text-xl text-foreground mb-1">{pkg.name}</h3>
                <div className="text-3xl font-inter font-bold text-primary mb-1">{pkg.price}</div>
                <div className="text-sm text-muted-foreground mb-6">{pkg.size}</div>
                <ul className="flex flex-col gap-2.5 mb-8">
                  {pkg.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-foreground"><CheckCircle className="w-4 h-4 text-primary shrink-0" />{f}</li>)}
                </ul>
                <Link to="/book-a-stand">
                  <Button className={`w-full ${pkg.popular ? "gradient-primary text-primary-foreground" : ""}`} variant={pkg.popular ? "default" : "outline"}>Reserve Now</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-inter font-bold text-foreground text-center mb-10" data-aos="fade-up">
            <HelpCircle className="w-8 h-8 text-primary inline mr-2" />Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/50 rounded-xl px-6">
                <AccordionTrigger className="text-foreground font-medium py-4">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Exhibition;

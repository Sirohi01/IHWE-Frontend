const partnerGroups = [
  {
    title: "Title Partners",
    partners: ["World Health Alliance", "MedTech International", "Global Pharma Group"],
  },
  {
    title: "Strategic Partners",
    partners: ["Dubai Health Authority", "WHO Regional Office", "International Medical Council", "APAC Health Federation"],
  },
  {
    title: "Knowledge Partners",
    partners: ["Harvard Medical School", "Johns Hopkins University", "Imperial College London", "Karolinska Institute", "Mayo Clinic"],
  },
];

const GlobalPartners = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14" data-aos="fade-up">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Our Partners</p>
          <h2 className="text-3xl md:text-4xl font-inter font-bold text-foreground">Global Partners</h2>
        </div>
        {partnerGroups.map((group) => (
          <div key={group.title} className="mb-12 last:mb-0">
            <h3 className="font-inter font-semibold text-lg text-center mb-6" data-aos="fade-up">{group.title}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {group.partners.map((p) => (
                <div
                  key={p}
                  data-aos="zoom-in"
                  className="px-8 py-4 rounded-xl border border-border/50 bg-background hover:border-primary/30 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  <span className="font-inter font-medium text-sm text-muted-foreground hover:text-primary transition-colors">{p}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GlobalPartners;

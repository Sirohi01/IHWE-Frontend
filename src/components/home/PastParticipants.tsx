const participants = [
  "MedTech Global", "PharmaCorp", "HealthBridge", "BioNova", "DiagnoSys",
  "CureWell", "VitalCare", "MediScan", "LifePharma", "NeoHealth",
  "Synapse Med", "CardioTech", "OrthoPlus", "DentaCare", "OptiVision",
  "NeuroCare", "SkinSmart", "RehabTech", "AquaMed", "GreenPharma",
];

const PastParticipants = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14" data-aos="fade-up">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Past Participants</p>
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground">
            Trusted by Industry Leaders
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {participants.map((p, i) => (
            <div
              key={p}
              data-aos="zoom-in"
              data-aos-delay={i * 40}
              className="group aspect-[3/1.5] rounded-xl border border-border/50 bg-muted/30 flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
            >
              <span className="font-poppins font-semibold text-sm text-muted-foreground group-hover:text-primary transition-colors text-center">
                {p}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastParticipants;

import { Button } from "@/components/ui/button";

interface PreFooterCTAProps {
  onBookStand: () => void;
}

const PreFooterCTA = ({ onBookStand }: PreFooterCTAProps) => {
  return (
    <section className="py-20" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="gradient-primary rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-primary-foreground mb-4">
            Ready to Be Part of IHWE 2026?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">
            Secure your exhibition space today and connect with healthcare leaders from around the world.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-10"
            onClick={onBookStand}
          >
            Reserve Your Space
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCTA;

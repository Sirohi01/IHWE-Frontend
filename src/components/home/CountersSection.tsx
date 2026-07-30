import { useEffect, useRef, useState } from "react";

const counters = [
  { value: 8000, suffix: "+", label: "Visitors" },
  { value: 300, suffix: "+", label: "Exhibitors" },
  { value: 25, suffix: "+", label: "Countries" },
  { value: 120, suffix: "+", label: "Speakers" },
  { value: 3, suffix: "", label: "Days Mega Event" },
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const CountersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(counters.map(() => 0));
  const animated = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Mirrors the previous GSAP ScrollTrigger's `start: "top 80%"`: fires once
    // the section's top edge crosses into the bottom 20% of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || animated.current) return;
        animated.current = true;
        observer.disconnect();

        const duration = 2000;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = easeOutCubic(progress);
          setCounts(counters.map((c) => Math.round(c.value * eased)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 gradient-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {counters.map((c, i) => (
            <div key={c.label} className="text-center" data-aos="zoom-in" data-aos-delay={i * 100}>
              <div className="text-4xl md:text-5xl font-inter font-bold text-primary-foreground">
                {counts[i].toLocaleString()}{c.suffix}
              </div>
              <div className="text-primary-foreground/70 text-sm mt-2 font-medium">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountersSection;

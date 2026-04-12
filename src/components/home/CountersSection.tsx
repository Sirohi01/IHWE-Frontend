import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const counters = [
  { value: 8000, suffix: "+", label: "Visitors" },
  { value: 300, suffix: "+", label: "Exhibitors" },
  { value: 25, suffix: "+", label: "Countries" },
  { value: 120, suffix: "+", label: "Speakers" },
  { value: 3, suffix: "", label: "Days Mega Event" },
];

const CountersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(counters.map(() => 0));
  const animated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        if (animated.current) return;
        animated.current = true;
        counters.forEach((c, i) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: c.value,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              setCounts((prev) => {
                const next = [...prev];
                next[i] = Math.round(obj.val);
                return next;
              });
            },
          });
        });
      },
    });

    return () => trigger.kill();
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

"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type HomeSectionProps = {
  setActiveTab: (tab: "shop" | "tickets") => void;
};

export default function HomeSection({ setActiveTab }: HomeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 text-center">
      <div ref={sectionRef} className="scroll-reveal max-w-5xl">
        <span className="inline-block px-3 py-1 mb-4 text-xs md:text-sm font-bold tracking-[0.2em] uppercase border border-primary text-primary rounded-full bg-primary/5">
          Potencia y Rendimiento
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter mb-4 leading-tight text-foreground">
          Hardware de <br className="hidden sm:block" />{" "}
          <span className="text-primary">Alta Gama.</span>
        </h1>
        <p className="max-w-xl mx-auto text-muted-foreground text-sm md:text-lg mb-8 font-light px-4">
          Ensamblaje profesional y soporte técnico avanzado. Pagos en Bolívares a
          tasa oficial BCV.
        </p>
        <div className="flex flex-col xs:flex-row gap-3 justify-center">
          <Button
            onClick={() => setActiveTab("shop")}
            size="lg"
            className="px-6 py-6 rounded-xl font-bold uppercase text-sm tracking-widest active:scale-95 transition-all shadow-xl shadow-primary/30 w-full xs:w-auto"
          >
            Explorar Tienda
          </Button>
          <Button
            onClick={() => setActiveTab("tickets")}
            variant="outline"
            size="lg"
            className="bg-card border-black/5 text-foreground px-6 py-6 rounded-xl font-bold uppercase text-sm tracking-widest hover:bg-white transition-all w-full xs:w-auto"
          >
            Soporte Técnico
          </Button>
        </div>
      </div>
    </section>
  );
}

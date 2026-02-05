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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div id="inicio" className="hero-gradient">
      <section className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center px-6 text-center">
        <div ref={sectionRef} className="scroll-reveal">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-[0.2em] uppercase border border-primary text-primary rounded-full bg-primary/5">
            Potencia y Rendimiento Garantizado
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-tight">
            Hardware de <br /> <span className="text-primary">Alta Gama.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-xl mb-10 font-light px-4">
            Expertos en ensamblaje y soporte técnico. Paga en Bolívares a tasa
            oficial BCV con total transparencia.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button
              onClick={() => setActiveTab("shop")}
              size="lg"
              className="px-8 py-7 rounded-xl font-bold uppercase text-sm tracking-widest active:scale-95 transition-all shadow-xl shadow-primary/30"
            >
              Explorar Tienda
            </Button>
            <Button
              onClick={() => setActiveTab("tickets")}
              variant="outline"
              size="lg"
              className="bg-foreground/5 border-foreground/10 text-foreground px-8 py-7 rounded-xl font-bold uppercase text-sm tracking-widest hover:bg-foreground/10 transition-all"
            >
              Soporte Técnico
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

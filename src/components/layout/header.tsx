"use client";

import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons";
import { ShoppingCart } from "lucide-react";
import { CONTACT_WA } from "@/lib/constants";
import Image from "next/image";

type HeaderProps = {
  setActiveTab: (tab: "inicio" | "shop" | "tickets") => void;
  cartCount: number;
  openCart: () => void;
};

export default function Header({
  setActiveTab,
  cartCount,
  openCart,
}: HeaderProps) {
  return (
    <>
      <header className="fixed top-0 w-full z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveTab("inicio")}
          >
            <Image
              src="https://i.postimg.cc/DyXsXQmg/logo.png"
              alt="Logo de AlexPC"
              width={56}
              height={56}
              className="h-10 md:h-14 w-auto object-contain"
            />
            <div className="hidden xs:block text-lg md:text-2xl font-extrabold tracking-tighter uppercase text-foreground ml-1">
              AlexPC<span className="text-primary">.</span>
            </div>
          </div>

          <div className="hidden sm:flex space-x-4 md:space-x-8 text-xs md:text-sm font-bold tracking-widest uppercase text-foreground">
            <Button variant="ghost" onClick={() => setActiveTab("inicio")} className="hover:text-primary">
              Inicio
            </Button>
            <Button variant="ghost" onClick={() => setActiveTab("shop")} className="hover:text-primary">
              Tienda
            </Button>
            <Button variant="ghost" onClick={() => setActiveTab("tickets")} className="hover:text-primary">
              Tickets
            </Button>
          </div>

          <div className="flex items-center">
             <a
              href={`https://wa.me/${CONTACT_WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-whatsapp text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl md:text-2xl hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-brand-whatsapp/20 animate-pulse-green"
            >
              <WhatsappIcon className="w-6 h-6 md:w-7 md:h-7" />
            </a>
          </div>
        </div>
        <div className="flex sm:hidden w-full border-t bg-background/50 backdrop-blur justify-around py-2 text-xs font-bold uppercase tracking-widest">
            <button onClick={() => setActiveTab('inicio')} className="px-2 py-1">Inicio</button>
            <button onClick={() => setActiveTab('shop')} className="px-2 py-1">Tienda</button>
            <button onClick={() => setActiveTab('tickets')} className="px-2 py-1">Tickets</button>
        </div>
      </header>
      <div className="fixed top-1/2 right-0 -translate-y-1/2 z-40 pr-2 md:pr-4">
        <Button
          onClick={openCart}
          className="relative bg-primary text-white w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary/40 border-2 border-white/20 transition-all active:scale-90 hover:scale-105"
        >
          <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
          <span id="cart-count" className="absolute -top-2 -left-2 bg-red-500 text-white text-xs md:text-sm font-black min-w-[24px] h-6 rounded-full border-2 border-background flex items-center justify-center animate-bounce px-1">
            {cartCount}
          </span>
        </Button>
      </div>
    </>
  );
}

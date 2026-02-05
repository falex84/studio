"use client";

import { Button } from "@/components/ui/button";
import { AlexPcLogo } from "@/components/icons";
import { ShoppingCart } from "lucide-react";

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
    <header className="fixed top-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setActiveTab("inicio")}
        >
          <AlexPcLogo className="h-11 w-11" />
          <div className="text-xl md:text-2xl font-extrabold tracking-tighter uppercase hidden sm:block">
            AlexPC<span className="text-primary">.</span>
          </div>
        </div>

        <div className="hidden md:flex space-x-8 text-sm font-bold tracking-widest uppercase">
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

        <div className="flex items-center space-x-3 md:space-x-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={openCart}
            className="relative text-foreground hover:text-primary"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
            <span className="sr-only">Ver carrito</span>
          </Button>
          <Button
            asChild
            className="rounded-full text-xs font-extrabold uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_WA}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

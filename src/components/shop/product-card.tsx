"use client";

import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  product: Product;
  addToCart: (id: number) => void;
};

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const Icon = product.icon;
  return (
    <div className="product-card p-5 md:p-7 rounded-[25px] flex flex-col group h-full bg-gradient-to-br from-card to-background border border-foreground/5 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50">
      <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl bg-black/50 flex items-center justify-center">
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${product.color} to-transparent opacity-40 group-hover:opacity-60 transition-opacity`}
        ></div>
        <Icon className="w-12 h-12 md:w-16 md:h-16 text-white/80 relative z-10 group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-sm md:text-base uppercase tracking-tight max-w-[75%]">
            {product.name}
          </h3>
          <span className="text-primary font-black text-sm md:text-base">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-muted-foreground text-xs md:text-sm mb-6 uppercase tracking-widest font-light">
          {product.description}
        </p>
      </div>
      <Button
        onClick={() => addToCart(product.id)}
        className="w-full py-5 bg-primary/10 border border-primary/20 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all shadow-lg text-primary"
      >
        Agregar al Carrito
      </Button>
    </div>
  );
}

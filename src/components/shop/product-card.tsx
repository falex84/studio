"use client";

import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

type ProductCardProps = {
  product: Product;
  addToCart: (id: number) => void;
};

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div className="product-card p-6 rounded-[24px] flex flex-col h-full border transition-all duration-300 hover:border-primary/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5">
       <div className="relative aspect-video mb-5 overflow-hidden rounded-xl bg-card">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={product.imageHint}
            />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-bold text-sm uppercase tracking-tight text-foreground">
            {product.name}
          </h3>
          <span className="text-primary font-black text-base">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-muted-foreground text-xs mb-5 uppercase tracking-widest font-light">
          {product.description}
        </p>
      </div>
      <Button
        onClick={() => addToCart(product.id)}
        className="w-full py-5 rounded-xl text-sm font-black uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Añadir al Carrito
      </Button>
    </div>
  );
}

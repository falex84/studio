"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/shop/product-card";

type ShopSectionProps = {
  addToCart: (id: number) => void;
};

export default function ShopSection({ addToCart }: ShopSectionProps) {
  return (
    <div id="shop">
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-l-4 border-primary pl-6 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-2 uppercase italic">
              Catálogo <span className="text-primary">Stock Real</span>
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm font-light uppercase tracking-[0.2em]">
              Envíos seguros a nivel nacional • Precios en USD
            </p>
          </div>
        </div>
        <div
          id="product-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

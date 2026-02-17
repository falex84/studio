"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/shop/product-card";

type ShopSectionProps = {
  addToCart: (id: number) => void;
};

export default function ShopSection({ addToCart }: ShopSectionProps) {
  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="mb-8 md:mb-12 border-l-4 border-primary pl-4 md:pl-6">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tighter mb-1 uppercase italic text-foreground">
          Catálogo <span className="text-primary">Stock Real</span>
        </h2>
        <p className="text-muted-foreground text-xs md:text-sm font-medium uppercase tracking-widest">
          Envíos a nivel nacional • Precios en USD
        </p>
      </div>
      <div
        id="product-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
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
  );
}

"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/lib/types";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HomeSection from "@/components/sections/home-section";
import ShopSection from "@/components/sections/shop-section";
import TicketsSection from "@/components/sections/tickets-section";
import CheckoutModal from "@/components/checkout/checkout-modal";
import { useToast } from "@/hooks/use-toast";
import { products as productData } from "@/lib/products";

type Tab = "inicio" | "shop" | "tickets";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("inicio");
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const addToCart = (productId: number) => {
    const productToAdd = productData.find((p) => p.id === productId);
    if (productToAdd) {
      setCart((prevCart) => [...prevCart, productToAdd]);
      toast({
        title: "Agregado al Carrito",
      });
    }
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };
  
  const clearCart = () => {
    setCart([]);
  }

  // Effect to prevent scrolling when modal is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCartOpen]);

  const renderContent = () => {
    switch (activeTab) {
      case "inicio":
        return <HomeSection setActiveTab={setActiveTab} />;
      case "shop":
        return <ShopSection addToCart={addToCart} />;
      case "tickets":
        return <TicketsSection />;
      default:
        return <HomeSection setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        setActiveTab={setActiveTab}
        cartCount={cart.length}
        openCart={() => setIsCartOpen(true)}
      />
       <main className="flex-grow pt-24 sm:pt-20">
        <div key={activeTab} className="tab-content active">
          {renderContent()}
        </div>
      </main>
      <Footer />
      <CheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
}

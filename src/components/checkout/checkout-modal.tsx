"use client";

import { useState, useMemo, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BCV_RATE, CONTACT_WA, PAGO_MOVIL_INFO } from "@/lib/constants";
import type { Product } from "@/lib/types";
import {
  X,
  Trash2,
  Smartphone,
  Banknote,
  Coins,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  removeFromCart: (index: number) => void;
  clearCart: () => void;
};

type PaymentMethod = "Pago Móvil" | "Efectivo" | "Binance Pay";

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  clearCart,
}: CheckoutModalProps) {
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null
  );
  const [pmData, setPmData] = useState({
    banco: "",
    referencia: "",
    cedula: "",
    telefono: "",
  });

  const totalUSD = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price, 0),
    [cartItems]
  );
  const totalBs = totalUSD * BCV_RATE;

  const isCheckoutValid = useMemo(() => {
    if (cartItems.length === 0 || !selectedPayment) {
      return false;
    }
    if (selectedPayment === "Pago Móvil") {
      return (
        pmData.banco && pmData.referencia && pmData.cedula && pmData.telefono
      );
    }
    return true;
  }, [cartItems, selectedPayment, pmData]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedPayment(null);
      setPmData({ banco: "", referencia: "", cedula: "", telefono: "" });
    }
  }, [isOpen]);
  
  const handlePMChange = (field: keyof typeof pmData, value: string) => {
    setPmData((prev) => ({ ...prev, [field]: value }));
  };
  
  const processCheckout = () => {
    if (!isCheckoutValid) return;

    const items = cartItems.map(p => `• ${p.name}`).join('%0A');
    
    let message = `🛒 *NUEVA ORDEN ALEXPC*%0A%0A`;
    message += `📦 *PRODUCTOS:*%0A${items}%0A%0A`;
    message += `💵 *TOTAL USD:* $${totalUSD.toFixed(2)}%0A`;
    message += `💸 *TOTAL BS:* Bs. ${totalBs.toLocaleString('de-DE', {minimumFractionDigits: 2})}%0A`;
    message += `📈 *TASA BCV:* Bs. ${BCV_RATE.toFixed(2)}%0A`;
    message += `💳 *MÉTODO:* ${selectedPayment}%0A%0A`;

    if (selectedPayment === 'Pago Móvil') {
        message += `📝 *DATOS DE PAGO REPORTADOS:*%0A`;
        message += `🏦 Banco: ${pmData.banco}%0A`;
        message += `🔢 Ref: ${pmData.referencia}%0A`;
        message += `🆔 Cédula: ${pmData.cedula}%0A`;
        message += `📱 Telf: ${pmData.telefono}%0A%0A`;
    }

    message += `✅ _Por favor, verifique disponibilidad para proceder._`;
    window.open(`https://wa.me/${CONTACT_WA}?text=${message}`, '_blank');
    
    toast({ title: "Orden enviada a WhatsApp", description: "Completa tu compra con nuestro equipo." });
    clearCart();
    onClose();
  };

  const paymentOptions = [
    {
      id: "Pago Móvil",
      icon: Smartphone,
      color: "text-primary",
      label: "Pago Móvil",
    },
    { id: "Efectivo", icon: Banknote, color: "text-green-500", label: "Efectivo" },
    { id: "Binance Pay", icon: Coins, color: "text-yellow-500", label: "Binance" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-primary/20 bg-background/95 backdrop-blur-xl max-w-6xl w-full h-full max-h-[92vh] flex flex-col md:flex-row rounded-[2.5rem] md:rounded-[40px] gap-0">
        <div className="w-full md:w-5/12 p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/5 flex flex-col shrink-0">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h3 className="text-xl md:text-3xl font-extrabold uppercase tracking-tighter">Tu Compra</h3>
          </div>
          <div id="cart-items" className="flex-grow space-y-3 mb-4 md:mb-6 overflow-y-auto pr-2 custom-scroll">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex justify-between items-center bg-foreground/5 p-3 rounded-xl border border-white/5">
                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold uppercase truncate max-w-[150px] sm:max-w-[200px]">{item.name}</h4>
                    <span className="text-primary font-black text-base">${item.price.toFixed(2)}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-500/50 hover:text-red-500" onClick={() => removeFromCart(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-foreground/20 py-10 text-sm font-black uppercase">
                Carrito Vacío
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-white/10 mt-auto">
             <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground uppercase font-bold text-xs tracking-widest">Tasa BCV Oficial</span>
                <span className="text-primary text-sm font-mono font-bold tracking-tighter">Bs. {BCV_RATE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-end mb-2">
                <span className="text-muted-foreground uppercase font-bold text-xs tracking-widest">Subtotal USD</span>
                <span id="cart-total" className="text-foreground text-2xl md:text-3xl font-black">${totalUSD.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-end">
                <span className="text-muted-foreground uppercase font-bold text-xs tracking-widest">Total en Bs.</span>
                <span id="cart-total-bs" className="text-primary text-xl md:text-2xl font-black italic">Bs. {totalBs.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-7/12 p-6 md:p-10 bg-black/50 flex flex-col overflow-y-auto custom-scroll">
          <div className="flex-grow">
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-white">
                <X className="w-8 h-8"/>
              </Button>
            </div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Selecciona Pago</h4>
            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
              {paymentOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedPayment(opt.id as PaymentMethod)}
                  className={`border p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${selectedPayment === opt.id ? 'border-primary bg-primary/10' : 'border-white/10 hover:bg-white/5'}`}
                >
                  <opt.icon className={`w-6 h-6 ${opt.color}`} />
                  <span className="text-xs md:text-sm font-bold uppercase text-center">{opt.label}</span>
                </button>
              ))}
            </div>
            <div id="payment-details" className={`mb-6 p-5 md:p-8 bg-card rounded-2xl border border-primary/10 min-h-[140px] flex-col justify-center ${selectedPayment ? 'flex' : 'hidden'}`}>
                {selectedPayment === "Pago Móvil" && (
                     <div className="space-y-4">
                        <div className="bg-black/20 p-3 rounded-lg border border-white/5 text-center">
                            <p className="text-primary text-xs font-black uppercase tracking-widest mb-1">Datos Destino</p>
                            <p className="text-xs text-muted-foreground uppercase">Banco: <span className="text-white font-bold">{PAGO_MOVIL_INFO.banco}</span></p>
                            <p className="text-xs text-muted-foreground uppercase">Cédula: <span className="text-white font-bold">{PAGO_MOVIL_INFO.cedula}</span></p>
                            <p className="text-xs text-muted-foreground uppercase">Teléfono: <span className="text-white font-bold">{PAGO_MOVIL_INFO.telefono}</span></p>
                        </div>
                        
                        <div className="space-y-2 border-t border-white/5 pt-2">
                            <p className="text-xs font-bold uppercase text-primary ml-1">Registrar Datos del Pago:</p>
                            <Input type="text" placeholder="Banco Emisor" onInput={(e) => handlePMChange('banco', e.currentTarget.value)} value={pmData.banco} className="bg-foreground/5 border-white/10 h-10"/>
                            <div className="grid grid-cols-2 gap-2">
                                <Input type="text" placeholder="Ref. (Ult 4-6 dígitos)" onInput={(e) => handlePMChange('referencia', e.currentTarget.value)} value={pmData.referencia} className="bg-foreground/5 border-white/10 h-10"/>
                                <Input type="text" placeholder="Cédula Titular" onInput={(e) => handlePMChange('cedula', e.currentTarget.value)} value={pmData.cedula} className="bg-foreground/5 border-white/10 h-10"/>
                            </div>
                            <Input type="tel" placeholder="Teléfono del Pago" onInput={(e) => handlePMChange('telefono', e.currentTarget.value)} value={pmData.telefono} className="bg-foreground/5 border-white/10 h-10"/>
                        </div>
                    </div>
                )}
                {selectedPayment === "Efectivo" && <p className="text-center text-sm uppercase font-bold text-muted-foreground">Acordaremos entrega y pago físico por WhatsApp</p>}
                {selectedPayment === "Binance Pay" && <p className="text-center text-sm uppercase font-bold text-muted-foreground">Solicita el correo de Binance Pay por WhatsApp</p>}
            </div>
          </div>
          <Button onClick={processCheckout} disabled={!isCheckoutValid} className="w-full py-6 rounded-xl font-black uppercase text-sm tracking-widest transition-all disabled:bg-primary/50 disabled:text-white/50">
            Confirmar Orden
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

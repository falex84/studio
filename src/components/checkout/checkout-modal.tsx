"use client";

import { useState, useMemo, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BCV_RATE, CONTACT_WA, BANCOS_VENEZUELA, PAGO_MOVIL_INFO } from "@/lib/constants";
import type { Product } from "@/lib/types";
import Image from "next/image";
import {

  Trash2,
  Smartphone,
  Banknote,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getBcvRate } from "@/app/actions";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  removeFromCart: (index: number) => void;
  clearCart: () => void;
};

type PaymentMethod = "Pago Movil" | "Efectivo";

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  clearCart,
}: CheckoutModalProps) {
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [buyerInfo, setBuyerInfo] = useState({ name: "", lastname: "" });
  const [pmData, setPmData] = useState({
    bancoEmisor: "",
    referencia: "",
    telefonoPago: "",
    cedulaTitular: "",
  });

  const [bcvRate, setBcvRate] = useState<number>(BCV_RATE);
  const [isLoadingRate, setIsLoadingRate] = useState(true);

  const totalUSD = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price, 0),
    [cartItems]
  );
  const totalBs = totalUSD * bcvRate;

  const isCheckoutValid = useMemo(() => {
    if (cartItems.length === 0 || !selectedPayment || !buyerInfo.name || !buyerInfo.lastname) {
      return false;
    }
    if (selectedPayment === "Pago Movil") {
      return (
        pmData.bancoEmisor && pmData.referencia && pmData.telefonoPago && pmData.cedulaTitular
      );
    }
    return true;
  }, [cartItems, selectedPayment, pmData, buyerInfo]);

  const fetchBcvRate = async () => {
    setIsLoadingRate(true);
    const rate = await getBcvRate();
    if (rate) {
      setBcvRate(rate);
    } else {
      setBcvRate(BCV_RATE); // Fallback
      toast({
        title: "Error al cargar tasa de cambio",
        description: "Usando tasa de respaldo. Intente de nuevo.",
        variant: "destructive",
      });
    }
    setIsLoadingRate(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchBcvRate();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedPayment(null);
      setPmData({ bancoEmisor: "", referencia: "", telefonoPago: "", cedulaTitular: "" });
      setBuyerInfo({ name: "", lastname: "" });
    }
  }, [isOpen]);
  const handlePMChange = (field: keyof typeof pmData, value: string) => {
    setPmData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBuyerInfoChange = (field: keyof typeof buyerInfo, value: string) => {
    setBuyerInfo((prev) => ({ ...prev, [field]: value }));
  };
  const processCheckout = () => {
    if (!isCheckoutValid) return;

    const items = cartItems.map(p => `- ${p.name}`).join('%0A');

    let message = `🛒 *NUEVA ORDEN ALEXPC*%0A%0A*CLIENTE:* ${buyerInfo.name} ${buyerInfo.lastname}%0A%0A*PRODUCTOS:*%0A${items}%0A%0A*TOTALES:*%0AUSD: $${totalUSD.toFixed(2)}%0ATasa: ${bcvRate.toFixed(2)}%0ABs: ${totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%0A%0A*PAGO:* ${selectedPayment}`;

    if (selectedPayment === 'Pago Movil') {
      message += `%0ABanco: ${pmData.bancoEmisor}%0ARef: ${pmData.referencia}%0ATel: ${pmData.telefonoPago}`;
    }

    window.open(`https://wa.me/${CONTACT_WA}?text=${message}`, '_blank');
    toast({ title: "Orden enviada a WhatsApp", description: "Completa tu compra con nuestro equipo." });
    clearCart();
    onClose();
  };

  const paymentOptions = [
    {
      id: "Pago Movil",
      icon: Smartphone,
      color: "text-primary",
      label: "Pago Móvil",
    },
    { id: "Efectivo", icon: Banknote, color: "text-green-600", label: "Efectivo" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-background max-w-5xl w-full h-full sm:h-auto sm:max-h-[90vh] flex flex-col md:flex-row sm:rounded-[30px] gap-0 shadow-2xl">
        <div className="w-full md:w-5/12 p-5 md:p-8 bg-card md:border-r flex flex-col overflow-hidden">
          <DialogHeader className="flex flex-row justify-between items-center mb-6">
            <DialogTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter">Resumen</DialogTitle>
            <DialogDescription className="sr-only">Modal de checkout para revisar los artículos del carrito y procesar el pago.</DialogDescription>

          </DialogHeader>
          <div id="cart-items" className="flex-grow overflow-y-auto space-y-3 mb-6 pr-2 custom-scroll max-h-[30vh] md:max-h-none">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center gap-3 bg-background p-3 rounded-xl border">
                  <Image src={item.image} alt={item.name} width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold uppercase leading-none truncate max-w-[150px] sm:max-w-[200px]">{item.name}</h4>
                    <span className="text-primary font-black text-xs">${item.price.toFixed(2)}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-500/50 hover:text-red-500" onClick={() => removeFromCart(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-sm font-black uppercase text-foreground/20">
                Vacio
              </div>
            )}
          </div>
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-3 px-2 py-1.5 bg-primary/5 rounded-lg border border-primary/10">
              <span className="text-xs font-black uppercase text-primary tracking-widest">Tasa BCV Oficial</span>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isLoadingRate ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
                <span className="text-sm font-bold text-foreground italic">
                  {isLoadingRate ? 'Cargando...' : `Bs. ${bcvRate.toFixed(2)}`}
                </span>
              </div>
            </div>
            <div className="flex justify-between text-sm font-bold text-muted-foreground uppercase mb-2">
              <span>Subtotal USD</span>
              <span className="text-foreground">${totalUSD.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-primary uppercase">Total en Bs.</span>
              <span className="text-primary text-xl md:text-2xl font-black italic">Bs. {totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-5 md:p-8 bg-background flex flex-col overflow-y-auto custom-scroll">
          <div className="mb-6 space-y-3">
            <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Datos del Comprador</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                type="text"
                placeholder="Nombre"
                className="w-full px-4 py-5 rounded-xl bg-input text-sm"
                onInput={(e) => handleBuyerInfoChange('name', e.currentTarget.value)}
                value={buyerInfo.name}
              />
              <Input
                type="text"
                placeholder="Apellido"
                className="w-full px-4 py-5 rounded-xl bg-input text-sm"
                onInput={(e) => handleBuyerInfoChange('lastname', e.currentTarget.value)}
                value={buyerInfo.lastname}
              />
            </div>
          </div>
          <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">Método de Pago</h4>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {paymentOptions.map(opt => (
              <button key={opt.id} onClick={() => setSelectedPayment(opt.id as PaymentMethod)} className={`p-3 rounded-xl flex flex-col items-center gap-1 border transition-all ${selectedPayment === opt.id ? 'border-primary bg-primary/5' : 'hover:bg-card'}`}>
                <opt.icon className={`w-4 h-4 ${opt.color}`} />
                <span className="text-xs font-bold uppercase">{opt.label}</span>
              </button>
            ))}
          </div>
          <div id="payment-details" className="mb-6">
            {selectedPayment === "Pago Movil" && (
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 text-sm">
                  <p className="font-black text-primary uppercase mb-1">Pagar a:</p>
                  <p>{PAGO_MOVIL_INFO.banco} | V-{PAGO_MOVIL_INFO.cedula} | {PAGO_MOVIL_INFO.telefono}</p>
                </div>
                <div className="grid gap-3 p-4 bg-card rounded-xl border">
                  <Select onValueChange={(value) => handlePMChange('bancoEmisor', value)}>
                    <SelectTrigger className="w-full px-3 py-2 rounded-lg border text-sm h-auto">
                      <SelectValue placeholder="Banco Emisor" />
                    </SelectTrigger>
                    <SelectContent>
                      {BANCOS_VENEZUELA.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input type="text" placeholder="Referencia" value={pmData.referencia} onInput={(e) => handlePMChange('referencia', e.currentTarget.value)} className="w-full px-3 py-2 rounded-lg border text-sm h-auto" />
                  <Input type="text" placeholder="Teléfono Pagador" value={pmData.telefonoPago} onInput={(e) => handlePMChange('telefonoPago', e.currentTarget.value)} className="w-full px-3 py-2 rounded-lg border text-sm h-auto" />
                  <Input type="text" placeholder="Cédula Titular" value={pmData.cedulaTitular} onInput={(e) => handlePMChange('cedulaTitular', e.currentTarget.value)} className="w-full px-3 py-2 rounded-lg border text-sm h-auto" />
                </div>
              </div>
            )}
            {selectedPayment === "Efectivo" && <p className="text-sm text-muted-foreground text-center italic">Pagos en efectivo/divisas se coordinan por WhatsApp.</p>}
          </div>
          <Button onClick={processCheckout} disabled={!isCheckoutValid} className="w-full py-6 rounded-xl font-black uppercase text-sm mt-auto disabled:bg-primary/30 disabled:text-white disabled:cursor-not-allowed transition-all">
            Confirmar Orden vía WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

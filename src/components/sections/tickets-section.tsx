"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HelpCircle,
  User,
  Mail,
  Settings,
  MessageSquare,
  Bot,
  BrainCircuit,
  FileText,
  ArrowRight,
} from "lucide-react";
import { getAiDiagnosis, getTicketSummary } from "@/app/actions";
import { CONTACT_WA } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const ticketSchema = z.object({
  name: z.string().min(2, "El nombre es requerido."),
  email: z.string().email("Correo electrónico inválido."),
  issueType: z.string(),
  issueDescription: z
    .string()
    .min(10, "Por favor, describe el problema con más detalle."),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

export default function TicketsSection() {
  const { toast } = useToast();
  const [aiDiagnosis, setAiDiagnosis] = useState("");
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      name: "",
      email: "",
      issueType: "Falla de Hardware",
      issueDescription: "",
    },
  });

  const diagnoseIssue = async () => {
    const isValid = await form.trigger(["issueDescription", "name", "issueType"]);
    if (!isValid) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, completa los campos requeridos para el diagnóstico.",
        variant: "destructive"
      })
      return;
    }

    setIsDiagnosing(true);
    setAiDiagnosis("");
    
    const newTicketNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketNumber(newTicketNumber);

    const values = form.getValues();
    const diagnosis = await getAiDiagnosis({
      problemDescription: values.issueDescription,
      ticketType: values.issueType,
      userName: values.name,
    });
    setAiDiagnosis(diagnosis);
    setIsDiagnosing(false);
  };
  
  const generatePDF = () => {
      if (!aiDiagnosis) {
        toast({ title: "Error", description: "Primero debes generar un diagnóstico.", variant: "destructive" });
        return;
      }
      const { name, issueType, issueDescription } = form.getValues();
      const doc = new jsPDF();
      
      doc.setFillColor(0, 56, 168);
      doc.rect(0, 0, 210, 35, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text("ALEXPC | SOPORTE TÉCNICO", 15, 22);
      doc.setFontSize(9);
      doc.text(`N° TICKET: ${ticketNumber}`, 165, 22);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12)
      doc.text("RESUMEN DE SOLICITUD", 15, 50);
      doc.line(15, 52, 195, 52);
      doc.text(`Cliente: ${name}`, 15, 62);
      doc.text(`Servicio: ${issueType}`, 15, 68);

      doc.text("PROBLEMA:", 15, 80);
      const splitMsg = doc.splitTextToSize(issueDescription, 180);
      doc.text(splitMsg, 15, 86); 

      doc.setFillColor(245, 245, 250);
      doc.rect(15, 110, 180, 80, 'F');
      doc.setTextColor(0, 56, 168);
      doc.text("DIAGNÓSTICO IA", 20, 120);
      doc.setTextColor(40, 40, 40);
      const splitDiag = doc.splitTextToSize(aiDiagnosis, 170);
      doc.text(splitDiag, 20, 130);

      doc.save(`Reporte_AlexPC_${ticketNumber}.pdf`);
      toast({ title: "Reporte descargado", description: "Adjunta el PDF manualmente en WhatsApp." });
  }

  const submitTicket = async (data: TicketFormValues) => {
    let summary = aiDiagnosis;
    if (!summary) {
        summary = await getTicketSummary(data);
    }
    
    const waMessage = `🛠️ *TICKET DE SOPORTE #${ticketNumber || 'N/A'}*%0A%0A` +
        `👤 *Cliente:* ${data.name}%0A` +
        `✉️ *Email:* ${data.email}%0A` +
        `🔧 *Tipo:* ${data.issueType}%0A` +
        `📝 *Falla:* ${data.issueDescription}%0A%0A` +
        (summary ? `✨ *RESUMEN IA:* ${summary.substring(0, 300)}...%0A` : '');

    window.open(`https://wa.me/${CONTACT_WA}?text=${encodeURIComponent(waMessage)}`, '_blank');
    form.reset();
    setAiDiagnosis("");
    setTicketNumber("");
    toast({ title: "Ticket enviado a WhatsApp", description: "Nuestro equipo te atenderá pronto." });
  };

  return (
    <div id="tickets" className="relative overflow-hidden">
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-flex items-center gap-2 text-primary text-sm font-black uppercase tracking-[0.3em] mb-4">
            <HelpCircle className="w-4 h-4" /> Canal de Ayuda
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 uppercase italic">
            Ticket de <span className="text-primary">Servicio</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto font-light">
            ¿Problemas con tu equipo? Completa los datos y nuestra IA te dará un
            diagnóstico preliminar.
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-14 border border-white/5 shadow-2xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitTicket)}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        <User className="w-4 h-4" /> Tu Nombre
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: Alejandro Pérez"
                          {...field}
                          className="px-5 py-6 rounded-2xl bg-input border-white/10 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        <Mail className="w-4 h-4" /> Correo Electrónico
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="correo@ejemplo.com"
                          {...field}
                          className="px-5 py-6 rounded-2xl bg-input border-white/10 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="issueType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      <Settings className="w-4 h-4" /> Tipo de Falla
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="px-5 py-6 rounded-2xl bg-input border-white/10 text-base">
                          <SelectValue placeholder="Selecciona un tipo de falla" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-input border-white/10 text-foreground">
                        <SelectItem value="Falla de Hardware">Falla de Hardware</SelectItem>
                        <SelectItem value="Mantenimiento / Software">Mantenimiento / Software</SelectItem>
                        <SelectItem value="Presupuesto Ensamblaje">Presupuesto Ensamblaje</SelectItem>
                        <SelectItem value="Otro Motivo">Otro Motivo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issueDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      <MessageSquare className="w-4 h-4" /> Descripción del problema
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Cuéntanos qué sucede..."
                        {...field}
                        className="px-5 py-4 rounded-2xl bg-input border-white/10 text-base resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(isDiagnosing || aiDiagnosis) && (
                <div id="aiDiagnosticBox">
                  <div className="p-6 rounded-2xl bg-primary/10 border border-primary/30 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2 text-primary text-sm font-black uppercase">
                        <Bot className="w-4 h-4" /> Diagnóstico IA AlexPC ✨
                      </div>
                      <div className="text-primary font-mono text-sm font-bold">#{ticketNumber}</div>
                    </div>
                    {isDiagnosing ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-primary/20" />
                        <Skeleton className="h-4 w-2/3 bg-primary/20" />
                      </div>
                    ) : (
                      <div className="text-sm text-foreground leading-relaxed font-light mb-4"
                        dangerouslySetInnerHTML={{ __html: aiDiagnosis.replace(/\n/g, '<br />') }}
                      />
                    )}
                    <div className="flex items-center gap-3 mt-4">
                      <Button
                        type="button"
                        onClick={generatePDF}
                        disabled={isDiagnosing}
                        className="bg-primary/20 hover:bg-primary text-primary hover:text-white border border-primary/30 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        <FileText className="w-3 h-3 mr-2" /> Descargar PDF
                      </Button>
                      <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest italic">Adjunta el PDF en WA</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="button"
                  onClick={diagnoseIssue}
                  disabled={isDiagnosing}
                  variant="outline"
                  className="flex-1 bg-foreground/5 border-foreground/10 text-foreground py-7 rounded-2xl font-black uppercase text-sm tracking-[0.2em] transition-all hover:bg-foreground/10"
                >
                  <BrainCircuit className="w-4 h-4 mr-3" />
                  {isDiagnosing ? "Analizando..." : "Consulta de falla ✨"}
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-7 rounded-2xl font-black uppercase text-sm tracking-[0.2em] transition-all hover:brightness-110 active:scale-[0.98] shadow-2xl shadow-primary/30"
                >
                  Enviar a Soporte (WA)
                  <ArrowRight className="w-4 h-4 ml-3" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}

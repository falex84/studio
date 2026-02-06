"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Bot, FileText } from "lucide-react";
import { getAiDiagnosis } from "@/app/actions";
import { CONTACT_WA } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const ticketSchema = z.object({
  name: z.string().min(2, "El nombre es requerido."),
  email: z.string().email("Correo electrónico inválido."),
  issueDescription: z
    .string()
    .min(10, "Por favor, describe el problema con más detalle."),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

export default function TicketsSection() {
  const { toast } = useToast();
  const [aiDiagnosis, setAiDiagnosis] = useState("");
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      name: "",
      email: "",
      issueDescription: "",
    },
  });

  const diagnoseIssue = async () => {
    const isValid = await form.trigger(["issueDescription", "name"]);
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

    const values = form.getValues();
    const diagnosis = await getAiDiagnosis({
      problemDescription: values.issueDescription,
      ticketType: 'Falla de Hardware', // This is now fixed as per the new design
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
      const { name } = form.getValues();
      const doc = new jsPDF();
      
      doc.setFillColor(0, 56, 168); 
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255); 
      doc.setFontSize(22); 
      doc.text("ALEXPC HARDWARE", 15, 25);
      doc.setTextColor(29, 29, 31); 
      doc.setFontSize(12); 
      doc.text(`Cliente: ${name}`, 15, 60);
      doc.text("ANALISIS TECNICO IA:", 15, 85);
      doc.setFontSize(10); 
      const splitText = doc.splitTextToSize(aiDiagnosis, 180); 
      doc.text(splitText, 15, 95);

      doc.save(`Diagnostico_${name}.pdf`);
      toast({ title: "Reporte descargado", description: "Adjunta el PDF manualmente en WhatsApp." });
  }

  const submitTicket = async (data: TicketFormValues) => {
    const waMessage = `Soporte: ${encodeURIComponent(data.issueDescription)}`;
    window.open(`https://wa.me/${CONTACT_WA}?text=${waMessage}`, '_blank');
    form.reset();
    setAiDiagnosis("");
    toast({ title: "Ticket enviado a WhatsApp", description: "Nuestro equipo te atenderá pronto." });
  };

  return (
    <div id="tickets" className="bg-card">
      <section className="py-10 md:py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-2 uppercase italic text-foreground">
            Ticket de <span className="text-primary">Servicio</span>
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm font-light px-4">
            Diagnóstico inteligente para tus problemas de hardware.
          </p>
        </div>

        <div className="bg-background rounded-[2rem] p-6 md:p-12 border shadow-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitTicket)}
              className="space-y-6 md:space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Tu Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: Alejandro Pérez"
                          {...field}
                          className="w-full px-4 py-5 rounded-xl bg-input text-sm"
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
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Correo</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="correo@ejemplo.com"
                          {...field}
                           className="w-full px-4 py-5 rounded-xl bg-input text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="issueDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Falla</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Describe el problema detalladamente..."
                        {...field}
                        className="w-full px-4 py-3.5 rounded-xl bg-input text-sm resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(isDiagnosing || aiDiagnosis) && (
                <div id="aiDiagnosticBox">
                  <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-primary text-sm font-black uppercase">
                            <Bot className="w-4 h-4" /> Resumen Técnico AlexPC ✨
                        </div>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Optimizado: 1 Hoja</span>
                    </div>
                    {isDiagnosing ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full shimmer" />
                        <Skeleton className="h-4 w-2/3 shimmer" />
                      </div>
                    ) : (
                      <>
                        <div className="text-sm text-foreground leading-relaxed font-normal mb-4"
                          dangerouslySetInnerHTML={{ __html: aiDiagnosis.replace(/\n/g, '<br />') }}
                        />
                         <Button
                            type="button"
                            onClick={generatePDF}
                            disabled={isDiagnosing}
                            variant="outline"
                            className="bg-background text-primary border-primary/30 px-3 py-1.5 h-auto rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:text-white transition-all"
                          >
                            <FileText className="w-3 h-3" /> Exportar PDF (Resumen)
                          </Button>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  onClick={diagnoseIssue}
                  disabled={isDiagnosing}
                  variant="outline"
                  className="flex-1 bg-card text-foreground py-6 rounded-xl font-bold uppercase text-sm tracking-widest border hover:bg-white transition-all"
                >
                  {isDiagnosing ? "Generando..." : "Generar Diagnóstico ✨"}
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-6 rounded-xl font-black uppercase text-sm tracking-widest shadow-lg shadow-primary/20"
                >
                  Enviar Soporte (WA)
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}

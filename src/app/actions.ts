"use server";

import {
  diagnoseHardwareIssue,
  type HardwareDiagnosticInput,
} from "@/ai/flows/ai-hardware-diagnostic";
import {
  summarizeTicketForSupport,
  type SummarizeTicketInput,
} from "@/ai/flows/summarize-ticket-for-support";

export async function getAiDiagnosis(
  input: HardwareDiagnosticInput
): Promise<string> {
  try {
    const { diagnosis } = await diagnoseHardwareIssue(input);
    return diagnosis;
  } catch (error) {
    console.error("Error in getAiDiagnosis:", error);
    return "Error: No se pudo conectar con el asistente de IA. Por favor, inténtelo de nuevo más tarde.";
  }
}

export async function getTicketSummary(
  input: SummarizeTicketInput
): Promise<string> {
  try {
    const { summary } = await summarizeTicketForSupport(input);
    return summary;
  } catch (error) {
    console.error("Error in getTicketSummary:", error);
    return "Error al generar el resumen.";
  }
}

export async function getBcvRate(): Promise<number | null> {
  try {
    // Revalidate every hour
    const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', { next: { revalidate: 3600 } });
    if (!response.ok) {
        console.error('Failed to fetch BCV rate, API offline');
        return null;
    }
    
    const data = await response.json();
    if(data && data.promedio) {
        return parseFloat(data.promedio);
    }
    return null;
  } catch (e) {
    console.error("Error fetching BCV rate:", e);
    return null;
  }
}

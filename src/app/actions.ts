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

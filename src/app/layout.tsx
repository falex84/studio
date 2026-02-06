import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AlexPC | Hardware & Soporte Técnico Inteligente',
  description: 'Venta de hardware premium y soporte técnico especializado con IA AlexPC.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-headline antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

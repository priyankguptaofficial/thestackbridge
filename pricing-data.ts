// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ChatbotWidget from "@/components/chatbot-widget";
import FloatingContactWidget from "@/components/floating-contact-widget";

export const metadata: Metadata = {
  title: "TheStackBridge \u2014 Managed IT Support",
  description:
    "Helpdesk, hardware, and IT strategy bundled into plans built for teams from 10 to 10,000 seats. 7-day free trial on every plan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-ink antialiased">
        <Navbar />
        {children}
        <Footer />
        <ChatbotWidget />
        <FloatingContactWidget />
      </body>
    </html>
  );
}

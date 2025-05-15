import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SynBot | Turkcell Eğitim Asistanı",
  description: "Turkcell Syneris platformunun eğitim asistanı SynBot ile sohbet edin ve öğrenin.",
};

export default function SynbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 
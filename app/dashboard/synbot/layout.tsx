import React from "react";

export const metadata = {
  title: "SynBot - Eğitim Asistanı | Turkcell",
  description: "Turkcell Akademi eğitim asistanı"
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
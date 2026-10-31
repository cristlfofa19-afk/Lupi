import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "LUPITA SHOPEE — Loja virtual premium",
  description: "Produtos únicos, presentes com personalidade e atendimento humano.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

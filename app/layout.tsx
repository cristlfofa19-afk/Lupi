import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lupita Shopee — Seu próximo presente",
  description: "Escolha seu presente, finalize com Pix e acompanhe seu pedido.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

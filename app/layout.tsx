import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lupi — Seu próximo começo",
  description: "Projeto Lupi pronto para publicar na Vercel.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          AchaServiços
        </Link>
        <div className="flex gap-4">
          <Link
            href="/"
            className="hover:opacity-80 transition"
          >
            Buscar
          </Link>
          <Link
            href="/cadastro"
            className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Anunciar
          </Link>
        </div>
      </nav>
    </header>
  )
}

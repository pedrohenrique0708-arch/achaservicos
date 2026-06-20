'use client'

import { Prestador } from '@/types'
import PrestadorCard from './PrestadorCard'

interface PrestadorGridProps {
  prestadores: Prestador[]
  isLoading?: boolean
}

export default function PrestadorGrid({
  prestadores,
  isLoading = false,
}: PrestadorGridProps) {
  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  if (prestadores.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 text-lg">Nenhum prestador encontrado</p>
      </section>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Prestadores em Destaque
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {prestadores.map((prestador) => (
          <PrestadorCard key={prestador.id} prestador={prestador} />
        ))}
      </div>
    </section>
  )
}

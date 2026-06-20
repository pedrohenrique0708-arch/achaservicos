'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Prestador } from '@/types'

interface PrestadorCardProps {
  prestador: Prestador
}

export default function PrestadorCard({ prestador }: PrestadorCardProps) {
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      size={16}
      className={`${
        i < Math.floor(prestador.nota)
          ? 'fill-yellow-400 text-yellow-400'
          : 'text-gray-300'
      }`}
    />
  ))

  return (
    <Link href={`/servico/${prestador.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer h-full">
        <div className="relative w-full h-48 bg-gray-200">
          {prestador.foto_url ? (
            <Image
              src={prestador.foto_url}
              alt={prestador.nome}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
              Sem imagem
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {prestador.nome}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {prestador.descricao}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1">{stars}</div>
            <span className="text-sm text-gray-700 font-semibold">
              {prestador.nota.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-primary font-semibold">
            {prestador.categoria}
          </p>
        </div>
      </div>
    </Link>
  )
}

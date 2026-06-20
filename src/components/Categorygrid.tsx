'use client'

import { Wrench, Paintbrush, Zap, Sparkles, Hammer, Leaf, Palette, Laptop } from 'lucide-react'

const icones: Record<string, any> = {
  Wrench, Paintbrush, Zap, Sparkles, Hammer, Leaf, Palette, Laptop
}

interface Categoria {
  id: string
  nome: string
  icone: string
}

interface CategoryGridProps {
  categorias: Categoria[]
  onCategoriaClick: (id: string) => void
}

export default function CategoryGrid({ categorias, onCategoriaClick }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {categorias.map((cat) => {
        const Icone = icones[cat.icone] || Wrench
        return (
          <button
            key={cat.id}
            onClick={() => onCategoriaClick(cat.id)}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition active:scale-95"
          >
            <Icone className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">{cat.nome}</span>
          </button>
        )
      })}
    </div>
  )
}

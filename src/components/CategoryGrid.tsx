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
  categoriaSelecionada: string | null
  onSelectCategory: (id: string) => void
}

export default function CategoryGrid({ categorias, categoriaSelecionada, onSelectCategory }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {categorias.map((cat) => {
        const Icone = icones[cat.icone] || Wrench
        const ativo = categoriaSelecionada === cat.id
        
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl shadow-sm hover:shadow-md transition active:scale-95 ${
              ativo ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <Icone className={`w-8 h-8 ${ativo ? 'text-white' : 'text-blue-600'}`} />
            <span className="text-sm font-medium">{cat.nome}</span>
          </button>
        )
      })}
    </div>
  )
}

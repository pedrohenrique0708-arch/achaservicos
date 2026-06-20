'use client'

import { useCallback } from 'react'
import {
  Wrench,
  Home,
  Zap,
  Droplets,
  Wind,
  Hammer,
  DollarSign,
  BookOpen,
  Smartphone,
  Palette,
  TreePine,
  Utensils,
} from 'lucide-react'

interface CategoryGridProps {
  selectedCategory: string | null
  onSelectCategory: (category: string) => void
}

const categories = [
  { id: 'encanador', name: 'Encanador', icon: Wrench },
  { id: 'eletricista', name: 'Eletricista', icon: Zap },
  { id: 'pintor', name: 'Pintor', icon: Palette },
  { id: 'carpinteiro', name: 'Carpinteiro', icon: Hammer },
  { id: 'limpeza', name: 'Limpeza', icon: Droplets },
  { id: 'climatizacao', name: 'Climatização', icon: Wind },
  { id: 'jardinagem', name: 'Jardinagem', icon: TreePine },
  { id: 'culinaria', name: 'Culinária', icon: Utensils },
  { id: 'tech', name: 'Tech/Informática', icon: Smartphone },
  { id: 'educacao', name: 'Educação', icon: BookOpen },
  { id: 'consultoria', name: 'Consultoria', icon: DollarSign },
  { id: 'outro', name: 'Outro', icon: Home },
]

export default function CategoryGrid({
  selectedCategory,
  onSelectCategory,
}: CategoryGridProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Categorias</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() =>
              onSelectCategory(selectedCategory === id ? '' : id)
            }
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition shadow-md ${
              selectedCategory === id
                ? 'bg-primary text-white'
                : 'bg-white text-gray-800 hover:shadow-lg'
            }`}
          >
            <Icon size={28} />
            <span className="text-xs font-semibold text-center">{name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

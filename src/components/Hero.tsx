'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface HeroProps {
  onSearch: (query: string) => void
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <section className="bg-gradient-to-b from-primary to-primary-dark text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Encontre o Serviço Certo
        </h1>
        <p className="text-lg text-center mb-8 opacity-90">
          Conectamos você aos melhores prestadores de serviços da região
        </p>

        <form
          onSubmit={handleSearch}
          className="flex gap-2 max-w-2xl mx-auto mb-8"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar serviço ou prestador..."
            className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
          >
            <Search size={20} />
            Buscar
          </button>
        </form>
      </div>
    </section>
  )
}

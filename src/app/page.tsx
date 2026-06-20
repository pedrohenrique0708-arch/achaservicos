'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Prestador } from '@/types'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CategoryGrid from '@/components/CategoryGrid'
import PrestadorGrid from '@/components/PrestadorGrid'

export default function Home() {
  const [prestadores, setPrestadores] = useState<Prestador[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPrestadores()
  }, [selectedCategory, searchQuery])

  const fetchPrestadores = async () => {
    setIsLoading(true)
    try {
      let query = supabase.from('prestadores').select('*').limit(12)

      if (selectedCategory) {
        query = query.eq('categoria', selectedCategory)
      }

      if (searchQuery) {
        query = query.or(
          `nome.ilike.%${searchQuery}%,descricao.ilike.%${searchQuery}%`
        )
      }

      const { data, error } = await query

      if (error) throw error

      setPrestadores(data || [])
    } catch (error) {
      console.error('Erro ao buscar prestadores:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div>
      <Header />
      <Hero onSearch={handleSearch} />
      <CategoryGrid
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <PrestadorGrid prestadores={prestadores} isLoading={isLoading} />
    </div>
  )
}

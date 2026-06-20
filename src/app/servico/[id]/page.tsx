'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Prestador } from '@/types'
import Header from '@/components/Header'
import { Star, MessageCircle } from 'lucide-react'

export default function ServicoPage() {
  const params = useParams()
  const id = params.id as string
  const [prestador, setPrestador] = useState<Prestador | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPrestador()
  }, [id])

  const fetchPrestador = async () => {
    try {
      const { data, error } = await supabase
        .from('prestadores')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      setPrestador(data)
    } catch (error) {
      console.error('Erro ao buscar prestador:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gray-200 rounded-lg h-96 animate-pulse mb-6" />
          <div className="bg-gray-200 rounded-lg h-12 animate-pulse mb-4" />
          <div className="bg-gray-200 rounded-lg h-20 animate-pulse" />
        </div>
      </div>
    )
  }

  if (!prestador) {
    return (
      <div>
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 text-lg">Prestador não encontrado</p>
        </div>
      </div>
    )
  }

  const stars = Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      size={20}
      className={`${
        i < Math.floor(prestador.nota)
          ? 'fill-yellow-400 text-yellow-400'
          : 'text-gray-300'
      }`}
    />
  ))

  const whatsappLink = `https://wa.me/55${prestador.whatsapp.replace(
    /\D/g,
    ''
  )}?text=Olá, vi seu perfil no AchaServiços`

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Foto grande */}
        <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-8">
          {prestador.foto_url ? (
            <Image
              src={prestador.foto_url}
              alt={prestador.nome}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xl">
              Sem imagem
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {prestador.nome}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex gap-1">{stars}</div>
            <span className="text-2xl font-semibold text-gray-700">
              {prestador.nota.toFixed(1)}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Categoria
            </h2>
            <p className="text-primary font-semibold text-lg">
              {prestador.categoria}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Descrição
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {prestador.descricao}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Contato
            </h2>
            <p className="text-gray-700">
              Telefone:{' '}
              <a
                href={`tel:${prestador.telefone}`}
                className="text-primary font-semibold hover:underline"
              >
                {prestador.telefone}
              </a>
            </p>
          </div>

          {/* Botão WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition w-full sm:w-auto text-lg"
          >
            <MessageCircle size={24} />
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

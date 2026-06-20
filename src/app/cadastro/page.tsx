'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import { Upload, AlertCircle, CheckCircle } from 'lucide-react'

const categories = [
  { value: 'encanador', label: 'Encanador' },
  { value: 'eletricista', label: 'Eletricista' },
  { value: 'pintor', label: 'Pintor' },
  { value: 'carpinteiro', label: 'Carpinteiro' },
  { value: 'limpeza', label: 'Limpeza' },
  { value: 'climatizacao', label: 'Climatização' },
  { value: 'jardinagem', label: 'Jardinagem' },
  { value: 'culinaria', label: 'Culinária' },
  { value: 'tech', label: 'Tech/Informática' },
  { value: 'educacao', label: 'Educação' },
  { value: 'consultoria', label: 'Consultoria' },
  { value: 'outro', label: 'Outro' },
]

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    whatsapp: '',
    categoria: '',
    descricao: '',
  })
  const [foto, setFoto] = useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadFoto = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { error } = await supabase.storage
        .from('prestadores-fotos')
        .upload(fileName, file)

      if (error) throw error

      const { data } = supabase.storage
        .from('prestadores-fotos')
        .getPublicUrl(fileName)

      return data.publicUrl
    } catch (error) {
      console.error('Erro ao fazer upload da foto:', error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      // Validação
      if (
        !formData.nome ||
        !formData.telefone ||
        !formData.whatsapp ||
        !formData.categoria ||
        !formData.descricao
      ) {
        setMessage({ type: 'error', text: 'Preencha todos os campos' })
        setIsLoading(false)
        return
      }

      let fotoUrl: string | null = null

      // Upload da foto
      if (foto) {
        fotoUrl = await uploadFoto(foto)
      }

      // Inserir no banco de dados
      const { error } = await supabase.from('prestadores').insert([
        {
          nome: formData.nome,
          telefone: formData.telefone,
          whatsapp: formData.whatsapp,
          categoria: formData.categoria,
          descricao: formData.descricao,
          foto_url: fotoUrl,
          nota: 5,
        },
      ])

      if (error) throw error

      setMessage({
        type: 'success',
        text: 'Prestador cadastrado com sucesso!',
      })
      setFormData({
        nome: '',
        telefone: '',
        whatsapp: '',
        categoria: '',
        descricao: '',
      })
      setFoto(null)
      setFotoPreview('')
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
      setMessage({
        type: 'error',
        text: 'Erro ao cadastrar prestador. Tente novamente.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Anuncie seu serviço</h1>
        <p className="text-gray-600 mb-8">
          Cadastre-se na AchaServiços e alcance mais clientes
        </p>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-semibold mb-2">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Seu nome completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="telefone" className="block text-sm font-semibold mb-2">
              Telefone
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-semibold mb-2">
              WhatsApp
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Categoria */}
          <div>
            <label htmlFor="categoria" className="block text-sm font-semibold mb-2">
              Categoria
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="descricao" className="block text-sm font-semibold mb-2">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              placeholder="Descreva seu serviço, experiência e diferenciais"
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Foto */}
          <div>
            <label htmlFor="foto" className="block text-sm font-semibold mb-2">
              Foto de Perfil
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {fotoPreview ? (
                <div className="mb-4">
                  <img
                    src={fotoPreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                  />
                </div>
              ) : (
                <Upload size={32} className="mx-auto mb-2 text-gray-400" />
              )}
              <input
                type="file"
                id="foto"
                onChange={handleFotoChange}
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="foto"
                className="cursor-pointer text-primary font-semibold hover:underline"
              >
                Clique para fazer upload
              </label>
              <p className="text-gray-500 text-sm mt-2">
                ou arraste uma imagem
              </p>
            </div>
          </div>

          {/* Botão Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar Prestador'}
          </button>
        </form>
      </div>
    </div>
  )
}

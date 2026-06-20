export interface Prestador {
  id: string
  nome: string
  telefone: string
  whatsapp: string
  categoria: string
  descricao: string
  foto_url: string | null
  nota: number
  criado_em: string
}

export interface Categoria {
  id: string
  nome: string
  icone: string
}

interface CategoryGridProps {
  categorias: any[]
  selectedCategory: string | null  // <-- adiciona essa linha
  onSelectCategory: (id: string) => void
}

export default function CategoryGrid({ categorias, selectedCategory, onSelectCategory }: CategoryGridProps) {
  // ... resto do código
}

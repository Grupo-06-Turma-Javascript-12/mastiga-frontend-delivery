const imagensPorCategoria: Record<string, string> = {
  "SALADAS": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  "MASSAS": "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80",
  "SOPAS": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
  "SOBREMESAS": "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&q=80",
  "BEBIDAS": "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80",
  "PIZZAS INTEGRAIS": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
}

export function getImagemCategoria(descricao: string): string {
  const chave = descricao.toUpperCase()
  return (
    imagensPorCategoria[chave] ??
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80"
  )
}
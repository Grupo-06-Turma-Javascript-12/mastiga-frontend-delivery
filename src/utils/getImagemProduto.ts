const imagensPorTipo: Record<string, string> = {
  PIZZA: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
  LANCHE: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  BEBIDA: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80",
  SOBREMESA: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&q=80",
}

export function getImagemProduto(tipo: string): string {
  const chave = tipo.toUpperCase()
  return (
    imagensPorTipo[chave] ??
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80"
  )
}
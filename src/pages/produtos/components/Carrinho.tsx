import type { Produto } from "../../../models/Produto"

interface ItemCarrinho {
  produto: Produto
  quantidade: number
}

interface CarrinhoProps {
  itens: ItemCarrinho[]
  aberto: boolean
  onFechar: () => void
  onRemover: (id: number) => void
  onAumentar: (produto: Produto) => void
  onDiminuir: (id: number) => void
}

export default function Carrinho({
  itens,
  aberto,
  onFechar,
  onRemover,
  onAumentar,
  onDiminuir,
}: CarrinhoProps) {
  const total = itens.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  )

  return (
    <>
        {aberto && (
            <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity"
            onClick={onFechar}
        />
        )}

      
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ${
          aberto ? "translate-x-0" : "translate-x-full"
        }`}
      >
      
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            🛒 Meu Carrinho
          </h2>
          <button
            onClick={onFechar}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Fechar carrinho"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {itens.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 gap-2">
              <span className="text-5xl">🥗</span>
              <p className="text-sm">Seu carrinho está vazio.</p>
              <p className="text-xs">Adicione produtos para continuar!</p>
            </div>
          ) : (
            itens.map((item) => (
              <div
                key={item.produto.id}
                className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {item.produto.nome}
                  </p>
                  <p className="text-xs text-gray-400">
                    R$ {item.produto.preco.toFixed(2)} cada
                  </p>
                </div>

              
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDiminuir(item.produto.id)}
                    className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-bold flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">
                    {item.quantidade}
                  </span>
                  <button
                    onClick={() => onAumentar(item.produto)}
                    className="w-6 h-6 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

               
                <div className="text-right min-w-15">
                  <p className="text-sm font-bold text-gray-800">
                    R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                  </p>
                  <button
                    onClick={() => onRemover(item.produto.id)}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      
        {itens.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-base font-bold text-gray-800">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors">
              Finalizar Pedido
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
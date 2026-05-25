import { useEffect, useRef, useState } from "react";

interface Mensagem {
  role: "user" | "assistant";
  content: string;
}

export function Chatbot() {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { role: "assistant", content: "Olá! 🍔 Sou o Mastiga, seu assistente de delivery. Como posso te ajudar hoje?" }
  ]);
  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  async function enviar() {
    if (!input.trim() || carregando) return;

    const novaMensagem: Mensagem = { role: "user", content: input };
    const historico = [...mensagens, novaMensagem];
    setMensagens(historico);
    setInput("");
    setCarregando(true);

    try {
      const response = await fetch(
    `${import.meta.env.VITE_API_URL}/chatbot/mensagem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensagem: input,
          historico: mensagens.slice(1).map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      setMensagens([...historico, { role: "assistant", content: data.resposta }]);
    } catch {
      setMensagens([...historico, { role: "assistant", content: "Erro ao conectar. Tente novamente!" }]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setAberto(!aberto)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white text-2xl shadow-lg transition-all duration-200 flex items-center justify-center"
      >
        {aberto ? "✕" : "🍽️"}
      </button>

      {/* Janela do chat */}
      {aberto && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="bg-red-500 px-4 py-3 text-white">
            <p className="font-bold text-base">🍔 Mastiga Assistant</p>
            <p className="text-xs opacity-80">Sempre online para te ajudar</p>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            {mensagens.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  msg.role === "user"
                    ? "self-end bg-red-500 text-white"
                    : "self-start bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {carregando && (
              <div className="self-start bg-gray-100 text-gray-500 px-3 py-2 rounded-xl text-sm">
                digitando...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && enviar()}
              placeholder="Pergunte algo..."
              className="flex-1 px-3 py-2 rounded-full border border-gray-300 text-sm outline-none focus:border-red-400"
            />
            <button
              onClick={enviar}
              className="w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
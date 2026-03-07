import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import ListaCategoria from "./components/categoria/listacategoria/ListaCategorias";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto";
import FormProduto from "./components/produto/formproduto/FormProduto";
import ListaProdutos from "./components/produto/listaprodutos/ListaProdutos";
import Carrinho from "./pages/produtos/components/Carrinho";
import { AuthProvider } from "./contexts/AuthContext";
import { CarrinhoProvider, useCarrinho } from "./contexts/CarrinhoContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SobreNos from "./pages/sobrenos/Sobrenos";
import Perfil from "./pages/perfil/Perfil";

function AppContent() {
  const { itens, aberto, fecharCarrinho, removerItem, aumentarQuantidade, diminuirQuantidade } = useCarrinho()

  return (
    <BrowserRouter>
      <Navbar />
      <Carrinho
        itens={itens}
        aberto={aberto}
        onFechar={fecharCarrinho}
        onRemover={removerItem}
        onAumentar={aumentarQuantidade}
        onDiminuir={diminuirQuantidade}
      />
      <div className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />}></Route>
          <Route path="/sobrenos" element={<SobreNos />} />
          <Route path="/produtos" element={<ListaProdutos />} />
          <Route path="/cadastrarproduto" element={<FormProduto />} />
          <Route path="/editarproduto" element={<FormProduto />} />
          <Route path="/deletarproduto" element={<DeletarProduto />} />
          <Route path="/categorias" element={<ListaCategoria />} />
          <Route path="/cadastrarcategoria" element={<FormCategoria />} />
          <Route path="/editarcategoria" element={<FormCategoria />} />
          <Route path="/deletarcategoria" element={<DeletarCategoria />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

function App() {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <ToastContainer />
        <AppContent />
      </CarrinhoProvider>
    </AuthProvider>
  );
}

export default App;
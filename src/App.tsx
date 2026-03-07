import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import ListaCategoria from "./components/categoria/listacategoria/ListaCategorias";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto";
import DescontoProduto from "./components/produto/descontoproduto/DescontoProduto";
import FormProduto from "./components/produto/formproduto/FormProduto";
import ListaProdutos from "./components/produto/listaprodutos/ListaProdutos";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { CarrinhoProvider, useCarrinho } from "./contexts/CarrinhoContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Perfil from "./pages/perfil/Perfil";
import Carrinho from "./pages/produtos/components/Carrinho";
import SobreNos from "./pages/sobrenos/Sobrenos";

function AppContent() {
  const { itens, aberto, fecharCarrinho, removerItem, aumentarQuantidade, diminuirQuantidade } = useCarrinho()

  return (
    <BrowserRouter>
      <ScrollToTop />
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
          <Route path="/editarproduto/:id" element={<FormProduto />} />
          <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
          <Route path="/categorias" element={<ListaCategoria />} />
          <Route path="/cadastrarcategoria" element={<FormCategoria />} />
          <Route path="/editarcategoria/:id" element={<FormCategoria />} />
          <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
          <Route path="/descontoproduto/:id" element={<DescontoProduto />} />
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
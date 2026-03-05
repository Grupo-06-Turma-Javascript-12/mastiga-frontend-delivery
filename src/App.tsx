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
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SobreNos from "./pages/sobrenos/Sobrenos";


function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/sobrenos" element={<SobreNos />}></Route>
              <Route path="/produtos" element={<ListaProdutos />}></Route>
              <Route path="/cadastrarproduto" element={<FormProduto />}></Route>
              <Route path="/editarproduto" element={<FormProduto />}></Route>
              <Route path="/deletarproduto" element={<DeletarProduto />}></Route>
              <Route path="/categorias" element={<ListaCategoria />}></Route>
              <Route path="/cadastrarcategoria" element={<FormCategoria />}></Route>
              <Route path="/editarcategoria" element={<FormCategoria />}></Route>
              <Route path="/deletarcategoria" element={<DeletarCategoria />}></Route>
              <Route path="/home" element={<Home />}></Route>
              
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
import { BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CardCategoria from "./components/categoria/cardcategoria/CardCategoria";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
            <CardCategoria Categoria={{ 
              id: 1,
              descricao: "qual quer coisaaaaaa"
            }}></CardCategoria>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
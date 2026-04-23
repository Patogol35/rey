import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Carrito from "./pages/Carrito";
import Pedidos from "./pages/Pedidos";
import ProductoDetalle from "./pages/ProductoDetalle";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// =====================
// 🔐 RUTA PÚBLICA (bloquea login si ya hay sesión)
// =====================
function PublicRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <GoogleOAuthProvider clientId="6793546722-ro4pd9ldsdrrl4l9k0jdm0pbl7f5ppu0.apps.googleusercontent.com">
      <BrowserRouter>
        <AuthProvider>
          <CarritoProvider>
            <Routes>
              <Route element={<Layout />}>
                {/* HOME */}
                <Route path="/" element={<Home />} />

                {/* LOGIN */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />

                {/* REGISTER */}
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  }
                />

                {/* CARRITO (PROTEGIDO) */}
                <Route
                  path="/carrito"
                  element={
                    <ProtectedRoute>
                      <Carrito />
                    </ProtectedRoute>
                  }
                />

                {/* PEDIDOS (PROTEGIDO) */}
                <Route
                  path="/pedidos"
                  element={
                    <ProtectedRoute>
                      <Pedidos />
                    </ProtectedRoute>
                  }
                />

                {/* DETALLE PRODUCTO */}
                <Route
                  path="/producto/:id"
                  element={<ProductoDetalle />}
                />
              </Route>
            </Routes>
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;

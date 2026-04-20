import { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  agregarAlCarrito as apiAgregar,
  getCarrito as apiGetCarrito,
  eliminarDelCarrito as apiEliminar,
  setCantidadItem as apiSetCantidad,
} from "../api/api";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const { access } = useAuth();
  const [carrito, setCarrito] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  // 🔄 CARGAR CARRITO
  const cargarCarrito = async () => {
    if (!access) {
      setCarrito({ items: [] });
      return;
    }

    setLoading(true);
    try {
      const data = await apiGetCarrito(access);

      setCarrito({
        items: data?.items || [],
      });
    } catch (e) {
      console.error(e);
      setCarrito({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, [access]);

  // 🔢 SET CANTIDAD
  const setCantidad = async (itemId, cantidad) => {
    if (!access) throw new Error("Debes iniciar sesión.");
    if (cantidad < 1) return;

    try {
      const res = await apiSetCantidad(itemId, cantidad, access);

      setCarrito((prev) => ({
        ...prev,
        items: prev.items.map((it) =>
          it.id === itemId
            ? {
                ...it,
                ...res, // 🔥 sincroniza todo el item
              }
            : it
        ),
      }));
    } catch (e) {
      toast.error(e?.response?.data?.error || "Error al actualizar");
    }
  };

  // 🛒 AGREGAR AL CARRITO (CON VARIANTES)
  const agregarAlCarrito = async (producto_id, variante_id, cantidad = 1) => {
    if (!access) throw new Error("Debes iniciar sesión.");

    try {
      const nuevoItem = await apiAgregar(producto_id, variante_id, cantidad, access);

      setCarrito((prev) => {
        const existente = prev.items.find(
          (it) =>
            it.producto?.id === producto_id &&
            (it.variante?.id || null) === (variante_id || null)
        );

        if (existente) {
          // 🔄 actualizar item existente
          return {
            ...prev,
            items: prev.items.map((it) =>
              it.id === existente.id ? nuevoItem : it
            ),
          };
        }

        // 🆕 nuevo item
        return {
          ...prev,
          items: [...prev.items, nuevoItem],
        };
      });

    } catch (e) {
      throw new Error(
        e?.response?.data?.error || "No se pudo agregar el producto"
      );
    }
  };

  // 🗑 ELIMINAR ITEM
  const eliminarItem = async (itemId) => {
    try {
      await apiEliminar(itemId, access);

      setCarrito((prev) => ({
        ...prev,
        items: prev.items.filter((it) => it.id !== itemId),
      }));
    } catch (e) {
      toast.error("Error al eliminar producto");
    }
  };

  // 🧹 LIMPIAR LOCAL
  const limpiarLocal = () => setCarrito({ items: [] });

  // 📦 VALUE MEMO
  const value = useMemo(
    () => ({
      items: carrito.items || [],
      loading,
      agregarAlCarrito,
      setCantidad,
      eliminarItem,
      limpiarLocal,
      cargarCarrito,
    }),
    [carrito, loading]
  );

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
}

// 🔗 HOOK
export const useCarrito = () => useContext(CarritoContext);

import {
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useState, useEffect, useMemo } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import detalleModalStyles from "./DetalleModal.styles";
import { botonAgregarSx } from "../components/ProductoCard.styles";

export default function DetalleProducto({ setLightbox }) {
  const { agregarAlCarrito } = useCarrito();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const producto = location.state?.producto;
  const modoInicial = location.state?.modo || "compra";

  const [modo, setModo] = useState(modoInicial);
  const [imagenActiva, setImagenActiva] = useState("");
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);

  const prod = producto || {};

  // 🖼 IMÁGENES
  const imagenes = useMemo(() => {
    if (varianteSeleccionada?.imagenes?.length > 0) {
      return varianteSeleccionada.imagenes.map((img) => img.imagen);
    }

    const imgs = [
      prod.imagen,
      ...(prod.imagenes?.map((img) => img.imagen) || []),
    ].filter(Boolean);

    return [...new Set(imgs)];
  }, [prod, varianteSeleccionada]);

  // 📦 STOCK
  const stockTotal = useMemo(() => {
    if (!prod.variantes?.length) return 1;
    return prod.variantes.reduce(
      (acc, v) => acc + (v.stock || 0),
      0
    );
  }, [prod]);

  // 🔥 ESTE ES EL FIX CLAVE (simula open del modal)
  useEffect(() => {
    setVarianteSeleccionada(null);
    setModo(modoInicial);
  }, [producto]);

  // 🔥 IMAGEN ACTIVA (igual que modal)
  useEffect(() => {
    if (varianteSeleccionada?.imagenes?.length > 0) {
      setImagenActiva(varianteSeleccionada.imagenes[0].imagen);
    } else {
      setImagenActiva(imagenes[0] || "");
    }
  }, [varianteSeleccionada, imagenes]);

  const imagenSegura = imagenActiva || imagenes[0] || "/placeholder.png";

  const tieneVariantes = (prod.variantes || []).length > 0;
  const tieneStockVariantes = (prod.variantes || []).some(
    (v) => v.stock > 0
  );

  const precioActual =
    varianteSeleccionada?.precio ?? prod.precio;

  // 🛒 AGREGAR
  const handleAgregar = async () => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión");
      return;
    }

    if (tieneVariantes && !varianteSeleccionada) {
      toast.error("Selecciona una variante");
      return;
    }

    try {
      await agregarAlCarrito(
        prod.id,
        varianteSeleccionada?.id || null,
        1
      );

      toast.success("Producto agregado ✅");
    } catch (e) {
      toast.error(e.message || "Error");
    }
  };

  if (!producto) {
    return (
      <Box p={4} textAlign="center">
        <Typography>Cargando producto...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 900, mx: "auto" }}>

      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>

      <Stack spacing={3} alignItems="center">

        {/* IMAGEN */}
        <Box
          sx={detalleModalStyles.sliderBox}
          onClick={() => setLightbox && setLightbox(imagenSegura)}
        >
          <Box
            component="img"
            src={imagenSegura}
            alt={prod.nombre}
            sx={detalleModalStyles.imagen}
          />
        </Box>

        {/* PRECIO */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <AttachMoneyIcon color="success" />
          <Typography variant="h5" fontWeight="bold" color="success.main">
            {precioActual}
          </Typography>
        </Stack>

        {/* MINIATURAS */}
        {imagenes.length > 1 && (
          <Stack direction="row" spacing={1}>
            {imagenes.map((img, i) => (
              <Box
                key={i}
                component="img"
                src={img}
                onClick={() => setImagenActiva(img)}
                sx={(theme) => ({
                  width: 55,
                  height: 55,
                  objectFit: "cover",
                  borderRadius: 1,
                  cursor: "pointer",
                  border:
                    imagenSegura === img
                      ? `2px solid ${theme.palette.primary.main}`
                      : `1px solid ${theme.palette.divider}`,
                })}
              />
            ))}
          </Stack>
        )}

        {/* INFO */}
        <Box textAlign="center">
          <Typography variant="h5" fontWeight="bold">
            {prod.nombre}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            {prod.descripcion}
          </Typography>
        </Box>

        {/* VARIANTES */}
        {tieneVariantes && modo === "compra" && (
          <Stack spacing={2} alignItems="center">

            <Typography fontWeight="bold">
              Selecciona una opción:
            </Typography>

            {!tieneStockVariantes && (
              <Chip label="Sin stock" color="error" />
            )}

            <Stack direction="row" flexWrap="wrap" gap={1.5}>
              {(prod.variantes || []).map((v) => {
                const isSelected = varianteSeleccionada?.id === v.id;

                const label = [...new Set(
                  [v.talla, v.color, v.modelo, v.capacidad]
                    .filter(Boolean)
                    .map((x) => x.trim())
                )].join(" - ");

                return (
                  <Button
                    key={v.id}
                    onClick={() => setVarianteSeleccionada(v)}
                    disabled={v.stock === 0}
                    sx={{
                      px: 2,
                      borderRadius: "999px",
                      backgroundColor: isSelected ? "#111" : "#fff",
                      color: isSelected ? "#fff" : "#333",
                    }}
                  >
                    {label || "Única"}
                  </Button>
                );
              })}
            </Stack>

            {varianteSeleccionada && (
              <Chip
                label={`Stock: ${varianteSeleccionada.stock}`}
                color="success"
              />
            )}
          </Stack>
        )}

        {/* BOTÓN FINAL */}
        <Box sx={{ width: "100%", mt: 2, display: "flex", justifyContent: "center" }}>
          {modo === "info" ? (
            <Button
              variant="contained"
              fullWidth
              onClick={() => setModo("compra")}
              sx={{ maxWidth: 400 }}
            >
              Seleccionar opciones
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAgregar}
              sx={{
                ...botonAgregarSx(stockTotal),
                maxWidth: 400,
                width: "100%",
              }}
            >
              Agregar al carrito
            </Button>
          )}
        </Box>

      </Stack>
    </Box>
  );
}

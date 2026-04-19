import {
  Box,
  Typography,
  Stack,
  IconButton,
  Dialog,
  Button,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState, useEffect, useMemo } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import detalleModalStyles from "./DetalleModal.styles";

export default function DetalleModal({
  producto,
  open,
  onClose,
  setLightbox,
}) {
  const { agregarAlCarrito } = useCarrito();
  const { isAuthenticated } = useAuth();

  if (!producto) return null;

  const [imagenActiva, setImagenActiva] = useState("");
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);

  // =========================
  // 🖼 IMÁGENES DINÁMICAS
  // =========================
  const imagenes = useMemo(() => {
    if (varianteSeleccionada?.imagenes?.length > 0) {
      return varianteSeleccionada.imagenes.map((img) => img.imagen);
    }

    const imgs = [
      producto.imagen,
      ...(producto.imagenes?.map((img) => img.imagen) || []),
    ].filter(Boolean);

    return [...new Set(imgs)];
  }, [producto, varianteSeleccionada]);

  // Reset al abrir
  useEffect(() => {
    if (open) {
      setVarianteSeleccionada(null);
    }
  }, [open]);

  // Cambiar imagen según variante
  useEffect(() => {
    if (varianteSeleccionada?.imagenes?.length > 0) {
      setImagenActiva(varianteSeleccionada.imagenes[0].imagen);
    } else {
      setImagenActiva(imagenes[0] || "");
    }
  }, [varianteSeleccionada, imagenes]);

  const imagenSegura = imagenActiva || imagenes[0] || "/placeholder.png";

  const tieneVariantes = producto.variantes?.length > 0;

  const tieneStockVariantes = producto.variantes?.some(
    (v) => v.stock > 0
  );

  // =========================
  // 🛒 AGREGAR
  // =========================
  const handleAgregar = async () => {
    if (!isAuthenticated) {
      toast.warn("Debes iniciar sesión");
      return;
    }

    if (tieneVariantes && !varianteSeleccionada) {
      toast.error("Selecciona una variante");
      return;
    }

    try {
      await agregarAlCarrito(
        producto.id,
        varianteSeleccionada?.id || null,
        1
      );

      toast.success("Producto agregado ✅");
      onClose();
    } catch (e) {
      toast.error(e.message || "Error al agregar");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={detalleModalStyles.dialog}
      PaperProps={{ sx: detalleModalStyles.dialogPaper }}
    >
      {/* Cerrar */}
      <IconButton onClick={onClose} sx={detalleModalStyles.botonCerrar}>
        <CloseIcon />
      </IconButton>

      <Stack spacing={3} alignItems="center">
        {/* IMAGEN PRINCIPAL */}
        <Box
          sx={detalleModalStyles.sliderBox}
          onClick={() => setLightbox && setLightbox(imagenSegura)}
        >
          <Box
            component="img"
            src={imagenSegura}
            alt={producto.nombre}
            sx={detalleModalStyles.imagen}
          />
        </Box>

        {/* MINIATURAS */}
        {imagenes.length > 1 && (
          <Stack direction="row" spacing={1}>
            {imagenes.map((img, i) => (
              <Box
                key={i}
                component="img"
                src={img}
                onClick={() => setImagenActiva(img)}
                sx={{
                  width: 55,
                  height: 55,
                  objectFit: "cover",
                  borderRadius: 1,
                  cursor: "pointer",
                  border:
                    imagenSegura === img
                      ? (theme) =>
                          `2px solid ${theme.palette.primary.main}`
                      : (theme) =>
                          `1px solid ${theme.palette.divider}`,
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </Stack>
        )}

        {/* INFO */}
        <Box textAlign="center">
          <Typography variant="h5" fontWeight="bold">
            {producto.nombre}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            {producto.descripcion}
          </Typography>
        </Box>

        {/* VARIANTES */}
        {tieneVariantes && (
          <Stack spacing={2} alignItems="center">
            <Typography fontWeight="bold">
              Selecciona una opción:
            </Typography>

            {!tieneStockVariantes && (
              <Chip label="Sin stock" color="error" />
            )}

            <Stack direction="row" flexWrap="wrap" gap={1}>
              {producto.variantes.map((v) => {
                const label = `${v.talla || ""} ${v.color || ""}`.trim();

                return (
                  <Button
                    key={v.id}
                    variant={
                      varianteSeleccionada?.id === v.id
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => setVarianteSeleccionada(v)}
                    disabled={v.stock === 0}
                    sx={{
                      opacity: v.stock === 0 ? 0.5 : 1,
                      textTransform: "none",
                      borderRadius: 2,
                    }}
                  >
                    {label || "Única"} ({v.stock})
                  </Button>
                );
              })}
            </Stack>

            {/* STOCK DINÁMICO */}
            {varianteSeleccionada && (
              <Chip
                label={`Stock: ${varianteSeleccionada.stock}`}
                color={
                  varianteSeleccionada.stock > 0
                    ? "success"
                    : "default"
                }
              />
            )}
          </Stack>
        )}

        {/* BOTÓN FIJO */}
        <Box
          sx={{
            width: "100%",
            position: "sticky",
            bottom: 0,
            backgroundColor: (theme) =>
              theme.palette.background.paper,
            pt: 2,
          }}
        >
          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingCartIcon />}
            onClick={handleAgregar}
            disabled={
              tieneVariantes
                ? !varianteSeleccionada ||
                  varianteSeleccionada.stock === 0
                : false
            }
            sx={{
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: (theme) =>
                theme.palette.primary.main,
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.primary.dark,
              },
            }}
          >
            Agregar al carrito
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
}

import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Chip,
  Divider,
  Dialog,
  IconButton,
} from "@mui/material";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick";

export default function ProductoDetalle() {
  const { state } = useLocation();
  const producto = state?.producto;
  const { agregarAlCarrito } = useCarrito();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState("");

  // 🔥 NUEVO: variante completa (igual que modal)
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);

  if (!producto) return <Typography>Producto no encontrado</Typography>;

  const tieneVariantes = producto.variantes?.length > 0;

  // 🖼 IMÁGENES DINÁMICAS (igual que modal)
  const imagenes = useMemo(() => {
    if (varianteSeleccionada?.imagenes?.length > 0) {
      return varianteSeleccionada.imagenes.map((img) => img.imagen);
    }

    const imgs = [
      producto.imagen,
      ...(producto.imagenes?.map((i) => i.imagen) || []),
    ].filter(Boolean);

    return [...new Set(imgs)];
  }, [producto, varianteSeleccionada]);

  // 📸 imagen principal
  const [imagenActiva, setImagenActiva] = useState("");

  useEffect(() => {
    if (varianteSeleccionada?.imagenes?.length > 0) {
      setImagenActiva(varianteSeleccionada.imagenes[0].imagen);
    } else {
      setImagenActiva(imagenes[0] || "");
    }
  }, [varianteSeleccionada, imagenes]);

  const imagenSegura = imagenActiva || imagenes[0] || "";

  // 💰 precio dinámico
  const precioActual =
    varianteSeleccionada?.precio ?? producto.precio;

  // 📦 stock
  const stockTotal = useMemo(() => {
    if (!producto.variantes?.length) return producto.stock || 1;
    return producto.variantes.reduce(
      (acc, v) => acc + (v.stock || 0),
      0
    );
  }, [producto]);

  // 🛒 agregar
  const handleAdd = async () => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión");
      return;
    }

    if (tieneVariantes && !varianteSeleccionada) {
      toast.warning("Selecciona una variante");
      return;
    }

    try {
      await agregarAlCarrito(
        producto.id,
        varianteSeleccionada?.id || null,
        1
      );

      toast.success(`"${producto.nombre}" agregado ✅`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleZoom = (img) => {
    setZoomImage(img);
    setZoomOpen(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
      {/* VOLVER */}
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 3, borderRadius: 2 }}
        onClick={() => navigate(-1)}
      >
        Regresar
      </Button>

      <Grid container spacing={5}>
        {/* IMÁGENES */}
        <Grid item xs={12} md={6}>
          <Box sx={{
            bgcolor: "#fafafa",
            borderRadius: 3,
            p: 2,
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          }}>
            <Slider {...settings}>
              {imagenes.map((img, i) => (
                <Box
                  key={i}
                  onClick={() => handleZoom(img)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: { xs: 300, md: 500 },
                    cursor: "pointer",
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    alt=""
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      borderRadius: 2,
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Grid>

        {/* DETALLE */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Typography variant="h4" fontWeight="bold">
              {producto.nombre}
            </Typography>

            <Typography variant="h5" color="primary">
              ${precioActual}
            </Typography>

            {/* 🔥 VARIANTES (igual que modal) */}
            {tieneVariantes && (
              <>
                <Typography fontWeight="bold">
                  Selecciona una opción:
                </Typography>

                <Stack direction="row" flexWrap="wrap" gap={1.5}>
                  {producto.variantes.map((v) => {
                    const isSelected =
                      varianteSeleccionada?.id === v.id;

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
                          borderRadius: "999px",
                          textTransform: "none",
                          border: "1px solid #ddd",
                          backgroundColor: isSelected ? "#111" : "#fff",
                          color: isSelected ? "#fff" : "#333",
                          opacity: v.stock === 0 ? 0.4 : 1,
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
                    color={
                      varianteSeleccionada.stock > 0
                        ? "success"
                        : "default"
                    }
                  />
                )}
              </>
            )}

            <Divider />

            <Typography sx={{ color: "text.secondary" }}>
              {producto.descripcion}
            </Typography>

            {/* BOTÓN */}
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAdd}
              disabled={
                tieneVariantes
                  ? !varianteSeleccionada ||
                    varianteSeleccionada.stock === 0
                  : stockTotal === 0
              }
              sx={{
                borderRadius: 3,
                py: 1.5,
                background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              }}
            >
              {tieneVariantes
                ? varianteSeleccionada
                  ? varianteSeleccionada.stock > 0
                    ? "Agregar al carrito"
                    : "Agotado"
                  : "Seleccionar opción"
                : stockTotal > 0
                ? "Agregar al carrito"
                : "Agotado"}
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* ZOOM */}
      <Dialog open={zoomOpen} onClose={() => setZoomOpen(false)}>
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setZoomOpen(false)}
            sx={{ position: "absolute", top: 10, right: 10, color: "white" }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            component="img"
            src={zoomImage}
            sx={{ maxHeight: "80vh", maxWidth: "100%" }}
          />
        </Box>
      </Dialog>
    </Box>
  );
              }

import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  useTheme,
} from "@mui/material";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick";

import {
  containerSx,
  botonVolverSx,
  imagenContainerSx,
  imagenSlideSx,
  imagenSx,
  tituloSx,
  precioSx,
  varianteBtnSx,
  descripcionSx,
  botonAgregarSx,
  stockSx,
  variantesContainerSx,
} from "./ProductoDetalle.styles";

export default function ProductoDetalle() {
  const { state } = useLocation();
  const location = useLocation();
  const { id } = useParams(); // 🔥 CLAVE
  const navigate = useNavigate();
  const theme = useTheme();

  const { agregarAlCarrito } = useCarrito();
  const { isAuthenticated } = useAuth();

  const [producto, setProducto] = useState(state?.producto || null);
  const [loading, setLoading] = useState(!state?.producto);

  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState("");
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);

  // 🔥 FETCH REAL (SOLUCIÓN)
  useEffect(() => {
    fetch(`/api/productos/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setProducto(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error cargando producto");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const handleMenuOpen = () => setZoomOpen(false);
    window.addEventListener("menuOpen", handleMenuOpen);
    return () => {
      window.removeEventListener("menuOpen", handleMenuOpen);
    };
  }, []);

  if (loading) return <Typography>Cargando...</Typography>;
  if (!producto) return <Typography>Producto no encontrado</Typography>;

  const tieneVariantes = producto.variantes?.length > 0;

  // 🔥 IMÁGENES (YA FUNCIONA CON API REAL)
  const imagenes = useMemo(() => {
    if (varianteSeleccionada?.imagenes?.length > 0) {
      return varianteSeleccionada.imagenes
        .map((img) => img?.imagen)
        .filter(Boolean);
    }

    return [
      producto.imagen,
      ...(producto.imagenes?.map((i) => i.imagen) || []),
    ].filter(Boolean);
  }, [producto, varianteSeleccionada]);

  const precioActual =
    varianteSeleccionada?.precio ?? producto.precio;

  const stockTotal = useMemo(() => {
    if (!producto.variantes?.length) return producto.stock || 1;
    return producto.variantes.reduce(
      (acc, v) => acc + (v.stock || 0),
      0
    );
  }, [producto]);

  const handleAdd = async () => {
    if (!isAuthenticated) {
      toast.info("Inicia sesión para agregar productos al carrito");
      navigate("/login", { state: { from: location } });
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
    <Box sx={containerSx}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={botonVolverSx(theme)}
        onClick={() => navigate(-1)}
      >
        Regresar
      </Button>

      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {/* IMÁGENES */}
        <Grid item xs={12} md={6}>
          <Box sx={imagenContainerSx(theme)}>
            <Slider {...settings}>
              {imagenes.map((img, i) => (
                <Box
                  key={i}
                  onClick={() => handleZoom(img)}
                  sx={imagenSlideSx}
                >
                  <Box component="img" src={img} sx={imagenSx} />
                </Box>
              ))}
            </Slider>
          </Box>
        </Grid>

        {/* DETALLE */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4" sx={tituloSx}>
              {producto.nombre}
            </Typography>

            <Typography variant="h5" sx={precioSx(theme)}>
              ${precioActual}
            </Typography>

            {tieneVariantes && (
              <>
                <Typography fontWeight="bold">
                  Selecciona una opción:
                </Typography>

                <Stack direction="row" sx={variantesContainerSx}>
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
                        sx={varianteBtnSx(isSelected, v.stock, theme)}
                      >
                        {label || "Única"}
                      </Button>
                    );
                  })}
                </Stack>

                {varianteSeleccionada && (
                  <Chip
                    label={`Stock: ${varianteSeleccionada.stock}`}
                    sx={stockSx(varianteSeleccionada.stock)}
                  />
                )}
              </>
            )}

            <Divider sx={{ width: "100%" }} />

            <Typography sx={descripcionSx}>
              {producto.descripcion}
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAdd}
              disabled={
                tieneVariantes
                  ? !varianteSeleccionada ||
                    varianteSeleccionada.stock === 0
                  : stockTotal === 0
              }
              sx={botonAgregarSx(
                tieneVariantes
                  ? varianteSeleccionada?.stock
                  : stockTotal
              )}
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
      <Dialog open={zoomOpen} onClose={() => setZoomOpen(false)} maxWidth="md">
        <Box sx={{ position: "relative", bgcolor: theme.palette.background.default }}>
          <IconButton
            onClick={() => setZoomOpen(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 2,
              bgcolor: "rgba(0,0,0,0.7)",
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            component="img"
            src={zoomImage}
            onClick={() => setZoomOpen(false)}
            sx={{
              maxHeight: "80vh",
              maxWidth: "100%",
              display: "block",
              margin: "0 auto",
              cursor: "zoom-out",
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
}

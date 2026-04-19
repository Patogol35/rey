import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Chip,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { toast } from "react-toastify";
import { calcularSubtotal } from "../utils/carritoUtils";
import carritoItemStyles from "./CarritoItem.styles";

export default function CarritoItem({
  it,
  incrementar,
  decrementar,
  setCantidad,
  eliminarItem,
}) {
  if (!it || !it.producto) return null;

  const producto = it.producto;
  const variante = it.variante || {};

  const stock = variante?.stock ?? producto?.stock ?? 0;

  const imagen =
    variante?.imagenes?.[0]?.imagen ||
    producto?.imagenes?.[0]?.imagen ||
    producto?.imagen ||
    "/placeholder.png";

  // ✅ FIX AQUÍ
  const altTexto = variante
    ? `${producto?.nombre} ${variante.color || ""}`
    : producto?.nombre;

  const varianteLabel = [variante.talla, variante.color, variante.modelo]
    .filter(Boolean)
    .join(" - ");

  const precioUnitario =
    variante?.precio ?? producto?.precio ?? 0;

  const handleEliminar = () => {
    eliminarItem(it.id);
    toast.info("Producto eliminado 🗑️");
  };

  return (
    <Card sx={carritoItemStyles.card}>
      <CardMedia
        component="img"
        image={imagen}
        alt={altTexto}
        sx={(theme) => carritoItemStyles.media(theme)}
      />

      <CardContent sx={carritoItemStyles.content}>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {producto.nombre}
          </Typography>

          {varianteLabel && (
            <Typography variant="body2" color="text.secondary">
              {varianteLabel}
            </Typography>
          )}

          <Stack direction="row" spacing={1} alignItems="center" mt={1}>
            <MonetizationOnIcon fontSize="small" color="primary" />
            <Typography variant="body2" fontWeight="bold">
              ${precioUnitario.toFixed(2)} c/u
            </Typography>
          </Stack>
        </Box>

        {/* 🔥 USAMOS TU FUNCIÓN ORIGINAL */}
        <Stack direction="row" spacing={1}>
          <Chip
            label={`Subtotal: $${calcularSubtotal(it).toFixed(2)}`}
            color="success"
          />

          <Chip
            label={`Stock: ${stock}`}
            color={stock > 0 ? "info" : "default"}
          />
        </Stack>
      </CardContent>

      <Box sx={carritoItemStyles.controlesWrapper}>
        <Box sx={carritoItemStyles.cantidadWrapper}>
          <IconButton
            onClick={() => decrementar(it)}
            disabled={it.cantidad <= 1}
          >
            <RemoveIcon />
          </IconButton>

          <TextField
            type="number"
            size="small"
            value={it.cantidad}
            inputProps={{ min: 1, max: stock }}
            onChange={(e) => {
              const val = Number(e.target.value);

              if (!val || val < 1) {
                setCantidad(it.id, 1);
                return;
              }

              if (val > stock) {
                toast.warning(`Solo hay ${stock}`);
                setCantidad(it.id, stock);
                return;
              }

              setCantidad(it.id, val);
            }}
            sx={carritoItemStyles.cantidadInput}
          />

          <IconButton
            onClick={() => incrementar(it)}
            disabled={it.cantidad >= stock}
          >
            <AddIcon />
          </IconButton>
        </Box>

        {/* 🟥 BOTÓN ELIMINAR */}
        <IconButton
          onClick={handle

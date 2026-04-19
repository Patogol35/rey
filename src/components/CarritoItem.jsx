import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Chip,
  TextField,
  IconButton,
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
  // =========================
  // 🔥 STOCK CORRECTO
  // =========================
  const stock = it.variante
    ? it.variante.stock
    : 999; // producto sin variantes → prácticamente ilimitado

  // =========================
  // 🖼 IMAGEN SEGURA
  // =========================
  const imagen =
    it.producto?.imagen ||
    it.producto?.imagenes?.[0]?.imagen ||
    "/placeholder.png";

  // =========================
  // 🔤 TEXTO VARIANTE
  // =========================
  const varianteTexto = it.variante
    ? `${it.variante.talla || ""} ${it.variante.color || ""}`
    : null;

  return (
    <Card sx={carritoItemStyles.card}>
      {/* Imagen */}
      <CardMedia
        component="img"
        image={imagen}
        alt={it.producto?.nombre}
        sx={(theme) => carritoItemStyles.media(theme)}
      />

      {/* Info */}
      <CardContent sx={carritoItemStyles.content}>
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {it.producto?.nombre}
          </Typography>

          {/* 🔥 VARIANTE */}
          {varianteTexto && (
            <Chip
              label={varianteTexto}
              color="primary"
              size="small"
              sx={{ mb: 1 }}
            />
          )}

          <Typography
            variant="body2"
            color="text.secondary"
            sx={carritoItemStyles.descripcion}
          >
            {it.producto?.descripcion}
          </Typography>
        </Box>

        {/* Precio + Stock */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            icon={<MonetizationOnIcon />}
            label={`$${calcularSubtotal(it).toFixed(2)}`}
            color="success"
            sx={carritoItemStyles.chipSubtotal}
          />

          {/* 🔥 STOCK REAL */}
          {it.variante && (
            <Chip
              label={`Stock: ${stock}`}
              color={stock > 0 ? "info" : "default"}
              sx={carritoItemStyles.chipStock}
            />
          )}
        </Box>
      </CardContent>

      {/* Controles */}
      <Box sx={carritoItemStyles.controlesWrapper}>
        <Box sx={carritoItemStyles.cantidadWrapper}>
          {/* Restar */}
          <IconButton
            onClick={() => decrementar(it)}
            disabled={it.cantidad <= 1}
            sx={carritoItemStyles.botonCantidad}
          >
            <RemoveIcon />
          </IconButton>

          {/* Input */}
          <TextField
            type="number"
            size="small"
            value={it.cantidad}
            inputProps={{
              min: 1,
              max: stock,
            }}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "") {
                setCantidad(it.id, 1);
                return;
              }

              const nuevaCantidad = Number(value);

              if (nuevaCantidad >= 1 && nuevaCantidad <= stock) {
                setCantidad(it.id, nuevaCantidad);
              } else if (nuevaCantidad > stock) {
                toast.warning(`Máximo disponible: ${stock}`);
                setCantidad(it.id, stock);
              } else {
                setCantidad(it.id, 1);
              }
            }}
            sx={carritoItemStyles.cantidadInput}
          />

          {/* Sumar */}
          <IconButton
            onClick={() => incrementar(it)}
            disabled={it.cantidad >= stock}
            sx={carritoItemStyles.botonCantidad}
          >
            <AddIcon />
          </IconButton>
        </Box>

        {/* Eliminar */}
        <IconButton
          onClick={() => eliminarItem(it.id)}
          sx={carritoItemStyles.botonEliminar}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

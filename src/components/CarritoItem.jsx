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
import carritoItemStyles from "./CarritoItem.styles";

export default function CarritoItem({
  it,
  incrementar,
  decrementar,
  setCantidad,
  eliminarItem,
}) {
  // 📦 STOCK
  const stock = it.variante?.stock ?? 0;

  // 💰 PRECIO
  const precioUnitario = it.variante?.precio ?? it.producto?.precio ?? 0;
  const subtotal = precioUnitario * it.cantidad;

  // 🖼 IMAGEN
  const imagen =
    it.variante?.imagenes?.[0]?.imagen ||
    it.producto?.imagenes?.[0]?.imagen ||
    it.producto?.imagen ||
    "/placeholder.png";

  // 🧠 VARIANTE LABEL
  const varianteLabel = it.variante
    ? [it.variante.talla, it.variante.color, it.variante.modelo]
        .filter(Boolean)
        .join(" - ")
    : null;

  return (
    <Card sx={carritoItemStyles.card}>
      {/* IMAGEN */}
      <CardMedia
        component="img"
        image={imagen}
        alt={it.producto?.nombre}
        sx={(theme) => carritoItemStyles.media(theme)}
      />

      {/* INFO */}
      <CardContent sx={carritoItemStyles.content}>
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {it.producto?.nombre}
          </Typography>

          {/* VARIANTE */}
          {varianteLabel && (
            <Typography variant="body2" color="text.secondary">
              {varianteLabel}
            </Typography>
          )}

          {/* PRECIO UNITARIO */}
          <Stack direction="row" spacing={1} alignItems="center" mt={1}>
            <MonetizationOnIcon fontSize="small" color="primary" />
            <Typography variant="body2" fontWeight="bold">
              ${precioUnitario.toFixed(2)} c/u
            </Typography>
          </Stack>
        </Box>

        {/* SUBTOTAL + STOCK */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            label={`Subtotal: $${subtotal.toFixed(2)}`}
            color="success"
            sx={carritoItemStyles.chipSubtotal}
          />

          <Chip
            label={`Stock: ${stock}`}
            color={stock > 0 ? "info" : "default"}
            sx={carritoItemStyles.chipStock}
          />
        </Stack>
      </CardContent>

      {/* CONTROLES */}
      <Box sx={carritoItemStyles.controlesWrapper}>
        <Box sx={carritoItemStyles.cantidadWrapper}>
          <IconButton
            onClick={() => decrementar(it)}
            disabled={it.cantidad <= 1}
            sx={carritoItemStyles.botonCantidad}
          >
            <RemoveIcon />
          </IconButton>

          <TextField
            type="number"
            size="small"
            value={it.cantidad}
            inputProps={{ min: 1, max: stock }}
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
                toast.warning(`Solo hay ${stock} unidades`);
                setCantidad(it.id, stock);
              } else {
                setCantidad(it.id, 1);
              }
            }}
            sx={{
              ...carritoItemStyles.cantidadInput,
              border:
                it.cantidad >= stock ? "1px solid red" : undefined,
            }}
          />

          <IconButton
            onClick={() => incrementar(it)}
            disabled={it.cantidad >= stock}
            sx={carritoItemStyles.botonCantidad}
          >
            <AddIcon />
          </IconButton>
        </Box>

        {/* ELIMINAR */}
        <IconButton
          onClick={() => eliminarItem(it.id)}
          sx={{
            ...carritoItemStyles.botonEliminar,
            "&:hover": {
              color: "red",
              transform: "scale(1.1)",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

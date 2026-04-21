// ================================
// CONTENEDOR PRINCIPAL
// ================================
export const containerSx = {
  maxWidth: 1200,
  mx: "auto",
  p: { xs: 2, md: 4 },
};


// ================================
// BOTÓN VOLVER
// ================================
export const botonVolverSx = (theme) => ({
  mb: 3,
  borderRadius: 2,
  textTransform: "none",
  fontWeight: 500,

  border: "1px solid",
  borderColor:
    theme.palette.mode === "dark" ? "#fff" : "#000",

  color:
    theme.palette.mode === "dark" ? "#fff" : "#000",

  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.05)",
  },
});


// ================================
// CONTENEDOR IMÁGENES
// ================================
export const imagenContainerSx = (theme) => ({
  bgcolor:
    theme.palette.mode === "dark"
      ? "#1f1f1f"
      : "#fafafa",

  borderRadius: 3,
  p: 2,

  border: "1px solid",
  borderColor:
    theme.palette.mode === "dark"
      ? "#ffffff"
      : "#e0e0e0",

  boxShadow:
    theme.palette.mode === "dark"
      ? "0 8px 25px rgba(0,0,0,0.5)"
      : "0 8px 20px rgba(0,0,0,0.1)",
});


// ================================
// IMAGEN SLIDER
// ================================
export const imagenSlideSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: { xs: 300, md: 500 },
  cursor: "pointer",
};


// ================================
// IMAGEN
// ================================
export const imagenSx = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
  borderRadius: 2,
  transition: "transform 0.4s ease",

  "&:hover": {
    transform: "scale(1.05)",
  },
};


// ================================
// TÍTULO
// ================================
export const tituloSx = {
  fontWeight: "bold",
};


// ================================
// PRECIO
// ================================
export const precioSx = (theme) => ({
  fontWeight: 700,
  fontSize: "1.6rem",

  color:
    theme.palette.mode === "dark"
      ? "#4dabf5"
      : "#1976d2",
});


// ================================
// VARIANTES BOTÓN
// ================================
export const varianteBtnSx = (isSelected, stock, theme) => ({
  borderRadius: "999px",
  textTransform: "none",
  fontWeight: 500,
  px: 2.5,
  py: 1,

  border: "1px solid",
  borderColor:
    theme.palette.mode === "dark"
      ? "#ffffff"
      : "#ddd",

  backgroundColor: isSelected
    ? theme.palette.mode === "dark"
      ? "#ffffff"
      : "#111"
    : "transparent",

  color: isSelected
    ? theme.palette.mode === "dark"
      ? "#000"
      : "#fff"
    : theme.palette.mode === "dark"
      ? "#fff"
      : "#333",

  opacity: stock === 0 ? 0.4 : 1,

  transition: "all 0.25s ease",

  "&:hover": {
    transform: "scale(1.05)",
  },
});


// ================================
// DESCRIPCIÓN
// ================================
export const descripcionSx = {
  color: "text.secondary",
  lineHeight: 1.6,
};


// ================================
// BOTÓN AGREGAR
// ================================
export const botonAgregarSx = (stock) => ({
  borderRadius: 3,
  py: 1.5,
  fontWeight: 600,
  fontSize: "1rem",

  background:
    stock > 0
      ? "linear-gradient(135deg, #1976d2, #42a5f5)"
      : "#bdbdbd",

  "&:hover": {
    transform: stock > 0 ? "scale(1.03)" : "none",
    background:
      stock > 0
        ? "linear-gradient(135deg, #1565c0, #1e88e5)"
        : "#bdbdbd",
  },
});

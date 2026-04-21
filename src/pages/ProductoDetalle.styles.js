// ================================
// CONTENEDOR PRINCIPAL
// ================================
export const containerSx = {
  maxWidth: 1100,
  mx: "auto",
  p: { xs: 2, md: 5 },

  display: "flex",
  flexDirection: "column",
  gap: 4,
};


// ================================
// BOTÓN VOLVER
// ================================
export const botonVolverSx = (theme) => ({
  alignSelf: "flex-start",
  borderRadius: "999px",
  textTransform: "none",
  fontWeight: 500,

  px: 2,
  py: 0.6,

  border: "1px solid",
  borderColor: theme.palette.divider,

  color: theme.palette.text.primary,

  backdropFilter: "blur(6px)",

  transition: "all 0.25s ease",

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateX(-4px)",
  },
});


// ================================
// CONTENEDOR PRINCIPAL GRID
// ================================
export const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
  gap: 5,
};


// ================================
// IMAGEN CONTENEDOR
// ================================
export const imagenContainerSx = (theme) => ({
  bgcolor: theme.palette.background.paper,
  borderRadius: 5,
  p: 3,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  border: "1px solid",
  borderColor: theme.palette.divider,

  boxShadow:
    theme.palette.mode === "dark"
      ? "0 20px 50px rgba(0,0,0,0.7)"
      : "0 20px 50px rgba(0,0,0,0.08)",

  overflow: "hidden",

  transition: "all 0.3s ease",

  "&:hover img": {
    transform: "scale(1.08)",
  },
});


// ================================
// IMAGEN
// ================================
export const imagenSx = {
  maxWidth: "100%",
  maxHeight: 500,
  objectFit: "contain",

  transition: "transform 0.5s ease",
};


// ================================
// INFO CONTENEDOR
// ================================
export const infoSx = {
  display: "flex",
  flexDirection: "column",
  gap: 2.5,
};


// ================================
// TÍTULO
// ================================
export const tituloSx = {
  fontWeight: 700,
  fontSize: { xs: "1.5rem", md: "2rem" },
  lineHeight: 1.2,
};


// ================================
// PRECIO
// ================================
export const precioSx = (theme) => ({
  fontWeight: 800,
  fontSize: "2rem",

  color:
    theme.palette.mode === "dark"
      ? "#66b2ff"
      : "#0d47a1",
});


// ================================
// STOCK (CHIP PRO 🔥)
// ================================
export const stockSx = (stock) => ({
  alignSelf: "flex-start",       // 🔥 evita stretch
  display: "inline-flex",

  px: 1.8,
  py: 0.5,

  borderRadius: "999px",
  fontSize: "0.75rem",
  fontWeight: 600,

  backdropFilter: "blur(6px)",

  background:
    stock > 0
      ? "linear-gradient(135deg, #e8f5e9, #c8e6c9)"
      : "linear-gradient(135deg, #ffebee, #ffcdd2)",

  color: stock > 0 ? "#1b5e20" : "#b71c1c",

  border: "1px solid",
  borderColor: stock > 0 ? "#a5d6a7" : "#ef9a9a",
});


// ================================
// VARIANTES
// ================================
export const variantesContainerSx = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
};


export const varianteBtnSx = (isSelected, stock, theme) => ({
  borderRadius: "999px",
  textTransform: "none",
  fontWeight: 500,

  px: 2,
  py: 0.7,

  width: "auto",
  minWidth: "unset",

  border: "1px solid",
  borderColor: isSelected
    ? theme.palette.primary.main
    : theme.palette.divider,

  backgroundColor: isSelected
    ? theme.palette.primary.main
    : "transparent",

  color: isSelected ? "#fff" : theme.palette.text.primary,

  opacity: stock === 0 ? 0.4 : 1,

  transition: "all 0.25s ease",

  "&:hover": {
    transform: stock > 0 ? "scale(1.05)" : "none",
  },
});


// ================================
// DESCRIPCIÓN
// ================================
export const descripcionSx = {
  color: "text.secondary",
  lineHeight: 1.7,
  fontSize: "0.95rem",
};


// ================================
// BOTÓN AGREGAR AL CARRITO 🔥
// ================================
export const botonAgregarSx = (stock) => ({
  alignSelf: "flex-start",

  borderRadius: "999px",
  px: 3,
  py: 1.2,

  display: "flex",
  alignItems: "center",
  gap: 1,

  fontWeight: 700,

  background:
    stock > 0
      ? "linear-gradient(135deg, #1976d2, #42a5f5)"
      : "#9e9e9e",

  color: "#fff",

  boxShadow:
    stock > 0
      ? "0 10px 25px rgba(25,118,210,0.4)"
      : "none",

  transition: "all 0.25s ease",

  "&:hover": {
    transform: stock > 0 ? "scale(1.05)" : "none",
  },
});

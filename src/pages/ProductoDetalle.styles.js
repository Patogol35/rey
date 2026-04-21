// ================================
// CONTENEDOR PRINCIPAL
// ================================
export const containerSx = {
  maxWidth: 1200,
  mx: "auto",
  p: { xs: 2, md: 5 },

  display: "flex",
  flexDirection: "column",
  gap: 3,
};


// ================================
// BOTÓN VOLVER
// ================================
export const botonVolverSx = (theme) => ({
  mb: 2,
  borderRadius: 999,
  textTransform: "none",
  fontWeight: 500,
  px: 2,

  width: "fit-content",
  alignSelf: "flex-start", // 🔥 evita que se estire

  border: "1px solid",
  borderColor: theme.palette.divider,

  color: theme.palette.text.primary,

  transition: "all 0.25s ease",

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateX(-3px)",
  },
});


// ================================
// CONTENEDOR IMÁGENES (CENTRADO REAL)
// ================================
export const imagenContainerSx = (theme) => ({
  bgcolor: theme.palette.background.paper,
  borderRadius: 4,
  p: 2,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: "100%", // 🔥 importante

  border: "1px solid",
  borderColor: theme.palette.divider,

  boxShadow:
    theme.palette.mode === "dark"
      ? "0 10px 30px rgba(0,0,0,0.6)"
      : "0 10px 30px rgba(0,0,0,0.08)",
});


// ================================
// IMAGEN SLIDER
// ================================
export const imagenSlideSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: { xs: 300, md: 500 },
};


// ================================
// IMAGEN (CENTRADA REAL 🔥)
// ================================
export const imagenSx = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",

  display: "block",
  margin: "0 auto", // 🔥 clave real

  borderRadius: 3,

  transition: "transform 0.4s ease",

  "&:hover": {
    transform: "scale(1.05)",
  },
};


// ================================
// TÍTULO
// ================================
export const tituloSx = {
  fontWeight: 700,
  fontSize: { xs: "1.4rem", md: "1.8rem" },
};


// ================================
// PRECIO
// ================================
export const precioSx = (theme) => ({
  fontWeight: 800,
  fontSize: "1.8rem",

  color:
    theme.palette.mode === "dark"
      ? "#66b2ff"
      : "#0d47a1",
});


// ================================
// STOCK (FIX REAL 🔥)
// ================================
export const stockSx = (stock) => ({
  display: "inline-flex",   // 🔥 mejor que inline-block
  alignItems: "center",

  width: "fit-content",
  alignSelf: "flex-start",  // 🔥 evita que crezca

  px: 1.5,
  py: 0.4,

  borderRadius: 999,
  fontSize: "0.75rem",
  fontWeight: 600,

  backgroundColor: stock > 0 ? "#e8f5e9" : "#ffebee",
  color: stock > 0 ? "#2e7d32" : "#c62828",
});


// ================================
// VARIANTES BOTÓN
// ================================
export const varianteBtnSx = (isSelected, stock, theme) => ({
  borderRadius: 999,
  textTransform: "none",
  fontWeight: 500,

  px: 2,
  py: 0.8,

  width: "auto",
  minWidth: "unset",

  border: "1px solid",
  borderColor: isSelected
    ? theme.palette.primary.main
    : theme.palette.divider,

  backgroundColor: isSelected
    ? theme.palette.primary.main
    : "transparent",

  color: isSelected
    ? "#fff"
    : theme.palette.text.primary,

  opacity: stock === 0 ? 0.4 : 1,
});


// ================================
// DESCRIPCIÓN
// ================================
export const descripcionSx = {
  color: "text.secondary",
  lineHeight: 1.8,
};


// ================================
// BOTÓN AGREGAR (FIX REAL 🔥)
// ================================
export const botonAgregarSx = (stock) => ({
  borderRadius: 999,
  py: 1.4,
  px: 3,

  width: "fit-content",
  minWidth: "unset",
  alignSelf: "flex-start", // 🔥 clave

  display: "inline-flex",
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
      ? "0 6px 18px rgba(25, 118, 210, 0.4)"
      : "none",
});

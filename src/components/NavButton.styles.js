// NavButton.styles.js
const navButtonStyles = (theme, isActive, item, alwaysColoredPaths) => ({
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "#fff",
  borderRadius: "12px",
  textTransform: "none",
  width: "100%",
  py: 1.2,
  transition: "all 0.25s ease",
  "& .MuiButton-startIcon": { color: "#fff" },

  // ✅ Fondo dinámico (SIN conflictos)
  backgroundColor: {
    xs: item.color, // móvil siempre con color
    md:
      isActive || alwaysColoredPaths.includes(item.path)
        ? item.color
        : "transparent",
  },

  // ✅ Estado activo
  boxShadow: isActive ? "0 0 20px rgba(255,255,255,0.5)" : "none",
  transform: isActive ? "scale(1.04)" : "scale(1)",

  // ✅ Hover REAL (ahora sí cambia color en desktop)
  "&:hover": {
    backgroundColor: `${item.color} !important`,
    boxShadow: isActive
      ? "0 0 20px rgba(0,0,0,0.4)"
      : "0 4px 12px rgba(0,0,0,0.25)",
  },

  // 🌙 Dark mode (ajuste suave sin romper hover)
  ...(theme.palette.mode === "dark" && {
    color: "#fff",
  }),
});

export default navButtonStyles;

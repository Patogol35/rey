const navButtonStyles = (theme, isActive, item, alwaysColoredPaths) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",

  fontSize: "1.05rem",
  fontWeight: 600,
  color: "#fff",
  borderRadius: "12px",
  textTransform: "none",
  width: "100%",
  py: 1.2,

  transition: "background 0.25s ease, box-shadow 0.25s ease",

  "& .MuiButton-startIcon": { color: "#fff" },

  // 🔥 IMPORTANTE: evita espacios raros
  lineHeight: 1,
  minHeight: "unset",

  // Fondo dinámico
  background: {
    xs: item.color,
    md:
      isActive || alwaysColoredPaths.includes(item.path)
        ? item.color
        : "transparent",
  },

  // Estado activo (SIN transform)
  boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.25)" : "none",

  // 🔥 HOVER LIMPIO (SIN MOVE NI SCALE)
  "&:hover": {
    background: {
      xs: item.color,
      md: item.color,
    },
    boxShadow: isActive
      ? "0 6px 18px rgba(0,0,0,0.35)"
      : "0 4px 12px rgba(0,0,0,0.25)",
  },

  // 🌙 DARK MODE
  ...(theme.palette.mode === "dark" && {
    "&:hover": {
      background: {
        xs: item.color,
        md: item.color,
      },
      boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
    },
  }),
});

export default navButtonStyles;

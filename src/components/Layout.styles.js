import { alpha } from "@mui/material/styles";

export const layoutStyles = (theme) => ({
  footer: {
    mt: "auto",
    py: 3,
    px: 2,

    textAlign: "center",

    // 🎨 fondo más elegante (ligero degradado)
    background: 
      theme.palette.mode === "dark"
        ? `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.9)}, ${theme.palette.background.default})`
        : `linear-gradient(180deg, ${theme.palette.background.paper}, ${alpha(theme.palette.grey[100], 0.6)})`,

    // 🧱 borde superior más fino y moderno
    borderTop: `1px solid ${
      theme.palette.mode === "dark"
        ? alpha("#fff", 0.12)
        : alpha("#000", 0.08)
    }`,

    // ✍️ tipografía mejorada
    fontSize: "0.8rem",
    letterSpacing: "0.4px",
    lineHeight: 1.6,
    color: theme.palette.text.secondary,

    // ✨ efecto suave
    transition: "all 0.3s ease",
    opacity: 0.9,

    "&:hover": {
      opacity: 1,
    },

    // 📱 responsive
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.85rem",
    },
  },
});

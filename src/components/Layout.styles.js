import { alpha } from "@mui/material/styles";

export const layoutStyles = (theme) => ({
footer: {
mt: "auto",
py: 3,
px: 2,

display: "flex",
flexDirection: "column",
alignItems: "center",
gap: 1.4,

textAlign: "center",

// fondo dinámico
background:
  theme.palette.mode === "dark"
    ? `linear-gradient(135deg, #121212, #1e1e1e)`
    : "linear-gradient(135deg, #4facfe, #6ec6ff, #b3e5fc)",

borderTop: `1px solid ${
  theme.palette.mode === "dark"
    ? alpha("#fff", 0.08)
    : alpha("#000", 0.1)
}`,

// 🔥 TEXTO DINÁMICO (FIX)
color:
  theme.palette.mode === "dark"
    ? "#fff"
    : theme.palette.text.primary,

fontSize: "0.85rem",
letterSpacing: "0.4px",
lineHeight: 1.5,

transition: "all 0.3s ease",

},

socialIcons: {
display: "flex",
gap: 1.2,
mt: 0.5,

"& .MuiIconButton-root": {
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha("#fff", 0.06)
      : alpha("#000", 0.06),

  // 🔥 ICONOS DINÁMICOS (FIX)
  color:
    theme.palette.mode === "dark"
      ? "#fff"
      : theme.palette.text.primary,

  transition: "all 0.3s ease",

  "&:hover": {
    transform: "translateY(-3px) scale(1.12)",
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha("#fff", 0.2)
        : alpha("#000", 0.1),
  },
},

"& .MuiIconButton-root:hover": {
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 14px rgba(255,255,255,0.2)"
      : "0 0 14px rgba(0,0,0,0.2)",
},

},
});

import { alpha } from "@mui/material/styles";

const carritoItemStyles = {
  card: (theme) => ({
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    mb: 3,
    mx: { xs: 2, sm: 0 },
    borderRadius: 4,

    border: "1px solid",
    borderColor:
      theme.palette.mode === "dark"
        ? alpha("#fff", 0.3)
        : alpha("#000", 0.2),

    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,

    boxShadow:
      theme.palette.mode === "dark"
        ? "0 4px 14px rgba(0,0,0,0.6)"
        : "0 4px 12px rgba(0,0,0,0.12)",

    transition: "all 0.3s ease",

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 8px 24px rgba(0,0,0,0.8)"
          : "0 8px 24px rgba(0,0,0,0.2)",
    },
  }),

  media: {
  width: { xs: "100%", sm: 180 },
  height: { xs: 200, sm: "100%" }, // 🔥 ahora sí ocupa todo el alto

  objectFit: "cover", // 🔥 llena el contenedor

  borderRadius: { xs: "16px 16px 0 0", sm: "16px 0 0 16px" },

  p: 0, // ❌ quitamos padding
  bgcolor: "transparent", // ❌ quitamos fondo

  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
},

  content: (theme) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    p: 2.5,
    gap: 1,

    borderTop: {
      xs: "1px solid",
      sm: "none",
    },
    borderLeft: {
      xs: "none",
      sm: "1px solid",
    },
    borderColor:
      theme.palette.mode === "dark"
        ? alpha("#fff", 0.2)
        : alpha("#000", 0.15),
  }),

  controlesWrapper: (theme) => ({
    display: "flex",
    flexDirection: { xs: "row", sm: "column" },
    justifyContent: "center",
    alignItems: "center",
    p: 2,
    gap: 1.5,

    // 🔥 simple y limpio (mejor que ::before)
    borderLeft: {
      sm: `1px solid ${
        theme.palette.mode === "dark"
          ? alpha("#fff", 0.2)
          : alpha("#000", 0.15)
      }`,
    },
    borderTop: {
      xs: `1px solid ${
        theme.palette.mode === "dark"
          ? alpha("#fff", 0.2)
          : alpha("#000", 0.15)
      }`,
      sm: "none",
    },
  }),

  titulo: {
    fontWeight: 600,
    fontSize: "1.1rem",
    lineHeight: 1.4,
    mb: 0.5,
  },

  descripcion: {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "text.secondary",
    fontSize: "0.9rem",
    mb: 1.5,
  },

  cantidadWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    bgcolor: "action.hover",
    borderRadius: 2,
    px: 1,
    py: 0.5,
  },

  botonCantidad: {
    minWidth: 32,
    minHeight: 32,
    borderRadius: "50%",
    bgcolor: "background.paper",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    "&:hover": {
      bgcolor: "action.hover",
      transform: "scale(1.1)",
    },
    transition: "all 0.2s ease",
  },

  cantidadInput: {
    width: 50,
    "& input": {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "1rem",
      borderRadius: 2,
    },
  },

  botonEliminar: {
    color: "error.main",
    borderRadius: 2,
    px: 2,
    "&:hover": { bgcolor: "rgba(211,47,47,0.1)" },
  },
};

export default carritoItemStyles;

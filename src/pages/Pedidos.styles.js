import { alpha } from "@mui/material/styles";

const pedidosStyles = {
  container: {
    mt: 4,
    mb: 6,
  },

  titulo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    color: "primary.main",
    mb: 4,
  },

  icono: {
    fontSize: 36,
  },

  card: (theme) => ({
    mb: 3,
    borderRadius: 3,
    boxShadow: 3,
    border: `1px solid ${
      theme.palette.mode === "dark"
        ? alpha("#fff", 0.45)
        : alpha("#000", 0.15)
    }`,
    transition: "all 0.3s",
    "&:hover": {
      boxShadow: 6,
      transform: "scale(1.01)",
    },
  }),

  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 1,
    mb: 2,
  },

  listItem: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", sm: "center" },
    py: 1,
  },

  itemRow: {
    display: "flex",
    gap: 2,
    alignItems: "center",
    width: "100%",
  },

  image: {
    width: { xs: 75, sm: 85 },
    height: { xs: 75, sm: 85 },
    objectFit: "contain",
    borderRadius: 2,
    p: 0,
    backgroundColor: "transparent",
  },

  infoBox: {
    flex: 1,
  },

  chip: {
    mt: { xs: 1, sm: 0 },
  },

  pagination: {
    mt: 3,
  },

  emptyState: {
    mt: 4,
    textAlign: "center",
  },

  emptyTitle: (theme) => ({
    fontWeight: "bold",
    color: theme.palette.text.primary,
  }),

  emptySubtitle: (theme) => ({
    color: theme.palette.mode === "dark" ? "#f5f5f5" : "#666",
  }),
};

export default pedidosStyles;

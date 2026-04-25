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

    background:
      theme.palette.mode === "dark"
        ? `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.9)}, ${theme.palette.background.default})`
        : `linear-gradient(180deg, ${theme.palette.background.paper}, ${alpha(theme.palette.grey[100], 0.6)})`,

    borderTop: `1px solid ${
      theme.palette.mode === "dark"
        ? alpha("#fff", 0.12)
        : alpha("#000", 0.08)
    }`,

    color: theme.palette.text.secondary,

    fontSize: "0.8rem",
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
          ? alpha("#fff", 0.05)
          : alpha("#000", 0.04),

      transition: "all 0.3s ease",

      "&:hover": {
        transform: "translateY(-3px) scale(1.12)",
      },
    },

    // 🔵 Facebook
    "& .facebook:hover": {
      color: "#1877F2",
      boxShadow: "0 0 12px rgba(24,119,242,0.6)",
    },

    // 🟣 Instagram (gradiente glow)
    "& .instagram:hover": {
      color: "#E1306C",
      boxShadow: "0 0 12px rgba(225,48,108,0.6)",
    },

    // 🔷 LinkedIn
    "& .linkedin:hover": {
      color: "#0A66C2",
      boxShadow: "0 0 12px rgba(10,102,194,0.6)",
    },
  },
});

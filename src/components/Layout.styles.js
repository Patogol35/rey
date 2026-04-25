export const layoutStyles = (theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
    transition: "background-color 0.3s ease",
  },

  container: {
    flex: 1,
    pt: `calc(${theme.mixins.toolbar.minHeight}px + 24px)`,
    pb: 4,
  },

  floatingButton: {
    position: "fixed",
    bottom: 24,
    right: 24,
    zIndex: 1300,
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    color: theme.palette.primary.contrastText,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 12px 30px rgba(0,0,0,0.6)"
        : "0 10px 25px rgba(0,0,0,0.25)",
    transition: "all 0.25s ease",

    "&:hover": {
      transform: "translateY(-3px) scale(1.05)",
      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    },
  },

  footer: {
    textAlign: "center",
    py: 3,
    mt: "auto",
    color: theme.palette.text.secondary,
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    transition: "background-color 0.3s ease",
  },
});

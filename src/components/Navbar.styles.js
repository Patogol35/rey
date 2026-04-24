import { menuColors } from "../theme/colors";

const styles = {
  appBar: (theme, scrolled) => ({
    // ✅ usar gradiente en vez de color plano
    background:
      theme.palette.mode === "dark"
        ? "#121212"
        : menuColors.primary,

    boxShadow: scrolled
      ? "0 4px 20px rgba(0,0,0,0.35)"
      : "none",

    transition: "background .3s ease, box-shadow .3s ease",
    zIndex: 1400,
  }),

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    fontWeight: "bold",
    textDecoration: "none",
  },

  logoIcon: {
    fontSize: 28,
    background: "linear-gradient(135deg, #FF5722, #FFC107)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  desktopMenu: {
    display: { xs: "none", lg: "flex" },
    gap: 2,
    alignItems: "center",
  },

  menuBtnMobile: {
    display: { xs: "block", lg: "none" },
  },

  iconCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
  },

  drawerPaper: (theme) => ({
    width: 280,

    // ✅ mismo sistema que appBar
    background:
      theme.palette.mode === "dark"
        ? "#1e1e1e"
        : menuColors.primary,

    color: "#fff",
    borderRadius: "16px 0 0 16px",
    p: 2,
  }),

  drawerStack: {
    flex: 1,
    mt: 8,
  },

  userSection: (isMobile) => ({
    my: isMobile ? 2 : 0,
    textAlign: "center",
    mt: isMobile ? 12 : 0,
  }),

  logoutBtn: (theme) => ({
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#fff",
    borderRadius: "12px",
    textTransform: "none",
    width: "100%",
    py: 1.2,
    transition: "all 0.25s ease",

    // ✅ usar gradiente bien aplicado
    backgroundImage: menuColors.logout,
    backgroundColor: "transparent",

    "& .MuiButton-startIcon": {
      color: "#fff",
    },

    "&:hover": {
      backgroundImage: menuColors.logout,
      boxShadow: "0 0 12px rgba(0,0,0,0.25)",
      filter: "brightness(1.05) saturate(1.1)",
    },

    ...(theme.palette.mode === "dark" && {
      "&:hover": {
        filter: "brightness(1.1) saturate(1.2)",
      },
    }),
  }),

  drawerUtilStack: {
    mt: 3,
    pb: 2,
  },

  toggleIcon: {
    color: "#fff",
    width: 48,
    height: 48,
  },
};

export default styles;

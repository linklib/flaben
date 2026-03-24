"use client";

import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import css from "./app-theme-provider.module.scss";

type Props = { children: React.ReactNode };

export default function AppThemeProvider(props: Readonly<Props>) {
  const theme = createTheme({
    palette: { primary: { main: css.primaryColor } },
    typography: { fontFamily: "inherit" },
    components: {
      MuiButton: {
        styleOverrides: {
          outlined: {
            display: "grid",
            minWidth: "unset",
            gridAutoFlow: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            gap: "0.5rem",
            fontSize: "1rem",
            boxShadow: "unset",
            border: "unset",
            color: css.primaryColor,
            backgroundColor: css.buttonBackgroundColor,
            borderRadius: "0.5rem",
            textTransform: "unset",
            padding: css.buttonPadding,
            span: {
              margin: "unset",
              button: {
                display: "grid",
                alignItems: "center",
                alignContent: "center",
              },
            },
            text: { minWidth: "4ch" },
            "&:hover": {
              backgroundColor: css.buttonBackgroundHoverColor,
              boxShadow: "unset",
              border: "unset",
            },
            "&:disabled": {
              boxShadow: "unset",
              border: "unset",
            },
          },
          root: {},
          contained: {
            fontSize: "1rem",
            boxShadow: "unset",
            // border: "unset",
            // color: css.primaryColor,
            // backgroundColor: css.buttonBackgroundColor,
            borderRadius: "0.5rem",
            textTransform: "unset",
            padding: css.buttonContainedPadding,
            "&:hover": {
              // backgroundColor: css.buttonBackgroundHoverColor,
              boxShadow: "unset",
            },
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: "1.25rem",
            padding: "0.75rem",
            "&:before": { display: "none" },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            padding: "unset",
            minHeight: "unset",
            boxShadow: "unset",
            "&.Mui-expanded": { minHeight: "unset" },
          },
          content: { margin: "unset", "&.Mui-expanded": { margin: "unset" } },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: { padding: "unset", paddingTop: "1.4375rem" },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            boxShadow: "unset",
            borderBottomLeftRadius: css.menuBorderRadius,
            borderTopLeftRadius: css.menuBorderRadius,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: { outlined: { color: css.inputLabelColor } },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          // input: { padding: css.inputPadding },
          notchedOutline: { border: "none" },

          // input: { padding: 0 },
          root: {
            borderRadius: css.inputBorderRadius,
            border: "unset",
            backgroundColor: css.inputBackground,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          root: {},
          paper: {
            boxShadow: "unset",
            width: "95%",
            // minWidth: "90rem",
            maxWidth: "unset",
            borderRadius: css.paperBorderRadius,
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          outlined: { width: "15ch" },
        },
      },
      MuiMenu: {
        styleOverrides: { paper: { borderRadius: css.inputBorderRadius } },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            borderCollapse: "separate",
            borderSpacing: css.tableGap,
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            backgroundColor: "white",
          },
          head: { backgroundColor: "transparent" },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: "none",
            padding: css.tableCellCommonPadding,
            "&:first-child": {
              padding: css.tableCellFirstPadding,
              borderTopLeftRadius: css.tableRowBorderRadius,
              borderBottomLeftRadius: css.tableRowBorderRadius,
            },
            "&:last-child": {
              padding: css.tableCellLastPadding,
              borderTopRightRadius: css.tableRowBorderRadius,
              borderBottomRightRadius: css.tableRowBorderRadius,
            },
          },
          head: {
            padding: css.headerCellCommonPadding,
            textTransform: "uppercase",
            color: css.textSecondaryColor,
            fontSize: css.inputHead,
            "&:first-child": {
              padding: css.headerCellFirstPadding,
            },
            "&:last-child": {
              padding: css.headerCellLastPadding,
            },
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            boxShadow: "unset",
          },
        },
      },
    },
  });

  return (
    <AppRouterCacheProvider key={"fliben"}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}

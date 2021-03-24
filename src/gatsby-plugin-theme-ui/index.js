import merge from "deepmerge"
import tailwind, { baseColors } from "@theme-ui/preset-tailwind"
import prism from "@theme-ui/prism/presets/github.json"

const themeColor = [
  "#f8f9fc",
  "#e9eef6",
  "#d9e1f0",
  "#c8d4e9",
  "#b5c5e1",
  "#9fb4d8",
  "#87a1ce",
  "#698ac2",
  "#426bb3",
  "#113b86",
]

const mods = {
  useLocalStorage: false,
  fonts: {},
  colors: {
    primary: themeColor[8],
    primaryHover: themeColor[9],
    warning: baseColors.yellow[5],
    link: themeColor[8],
    modes: {
      dark: {
        text: baseColors.gray[1],
        background: baseColors.gray[9],
        textMuted: baseColors.gray[3],
        link: themeColor[6],
      },
    },
  },
  styles: {
    pre: {
      ...prism,
      overflow: "auto",
      p: "1rem",
      borderRadius: "md",
      borderStyle: "solid",
      borderWidth: "px",
      borderColor: "muted",
    },
    p: {
      fontSize: 2,
      fontWeight: "light",
    },
    li: {
      fontSize: 2,
      fontWeight: "light",
    },
    a: {
      color: "link",
      textDecoration: "none",
      ":hover": {
        textDecoration: "underline",
      },
    },
    blockquote: {
      display: "inline-block",
      pl: 2,
      fontSize: 1,
      borderLeftWidth: "4",
      borderLeftStyle: "solid",
      borderLeftColor: "secondary",
      "> p": {
        my: 1,
      },
    },
    td: {
      p: 2,
    },
  },
}

const theme = merge(tailwind, mods)

export default theme

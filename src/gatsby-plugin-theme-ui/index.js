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
  colors: {
    primary: themeColor[8],
    primaryHover: themeColor[9],
    warning: baseColors.yellow[5],
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
    blockquote: {
      pl: 2,
      borderLeftWidth: "4",
      borderLeftStyle: "solid",
      borderLeftColor: "secondary",
    },
  },
}

const theme = merge(tailwind, mods)

export default theme

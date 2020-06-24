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

const colorSystem = {
  themeColor,
  hero: {
    bg: themeColor[8],
    text: baseColors.gray[1],
    lighttext: baseColors.gray[3],
  },
  menu: {
    main: baseColors.gray[8],
    sub: baseColors.gray[6],
    hover: {
      bg: themeColor[8],
      main: baseColors.gray[1],
    },
  },
  search: {
    border: themeColor[4],
  },
}

const mods = {
  styles: {
    pre: {
      ...prism,
      overflow: "auto",
      p: "2rem",
      borderRadius: "lg",
      boxShadow: "default",
    },
    a: {
      color: themeColor[8],
    },
  },
  colors: {
    ...colorSystem,
  },
}

const theme = merge(tailwind, mods)

export default theme

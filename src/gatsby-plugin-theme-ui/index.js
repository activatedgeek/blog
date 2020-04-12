import merge from "deepmerge"
import { tailwind as preset } from "@theme-ui/presets"
import prism from "@theme-ui/prism/presets/github.json"

const theme = merge(preset, {
  styles: {
    pre: {
      ...prism,
      overflow: "auto",
      p: "1em",
    },
  },
})

export default theme

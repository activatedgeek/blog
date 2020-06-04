import merge from "deepmerge"
import tailwind from "@theme-ui/preset-tailwind"
import prism from "@theme-ui/prism/presets/github.json"

const theme = merge(tailwind, {
  styles: {
    pre: {
      ...prism,
      overflow: "auto",
      p: "1em",
    },
  },
})

export default theme

import React from "react"

const asLazy = (ipath, defaultProps) => props => {
  const [Component, setComponent] = React.useState(() => () => null)
  React.useEffect(() => {
    ipath.then(Comp => setComponent(() => Comp.default))
  }, [])
  return <Component {...defaultProps} {...props} />
}

export default {
  LazyImage: asLazy(import("./image.js")),
  LazyVega: asLazy(import("../../node_modules/react-vega/lib/Vega"), {
    actions: false,
  }),
}

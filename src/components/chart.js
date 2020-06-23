/** @jsx jsx */
import { jsx, Box } from "theme-ui"
import { VegaLite } from "react-vega"

export default ({ ...props }) => (
  <Box sx={{ overflow: "auto" }}>
    <VegaLite {...props} />
  </Box>
)

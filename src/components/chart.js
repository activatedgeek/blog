/** @jsx jsx */
import { useState, useEffect } from "react"
import { jsx, Box } from "theme-ui"
import { VegaLite } from "react-vega"
import axios from "axios"

export default ({ specUrl }) => {
  const [spec, setSpec] = useState()

  useEffect(() => {
    axios
      .get(specUrl)
      .then(response => {
        setSpec(response.data)
      })
      .catch(err => {
        console.error(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ overflow: "auto" }}>
      {spec ? <VegaLite spec={spec} actions={false} /> : null}
    </Box>
  )
}

/** @jsx jsx */
import { useState, useEffect } from "react"
import { jsx, Box, Styled } from "theme-ui"
import { VegaLite } from "react-vega"
import axios from "axios"

export default ({ id, specUrl }) => {
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
    <figure sx={{ textAlign: "center" }}>
      <Box sx={{ overflow: "auto", maxHeight: "3xl" }}>
        {spec ? <VegaLite spec={spec} actions={false} /> : null}
      </Box>
      <figcaption sx={{ fontSize: 0, color: "textMuted" }}>
        Chart {id}:{" "}
        <Styled.a href={specUrl} target="_blank" rel="noopener noreferrer">
          Vega-Lite Spec
        </Styled.a>
        .
      </figcaption>
    </figure>
  )
}

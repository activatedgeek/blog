import React from "react" // eslint-disable-line no-unused-vars
/** @jsx jsx */
import { jsx, Styled, Box, Image as TImage } from "theme-ui" // eslint-disable-line no-unused-vars
import { Vega } from "react-vega"

const Image = ({ alt, ...props }) => {
  return (
    <span sx={{ display: "block", textAlign: "center" }}>
      <TImage alt={alt} {...props} />
      {alt ? (
        <span
          sx={{ display: "block", color: "secondary", textAlign: "center" }}
        >
          {alt}
        </span>
      ) : null}
    </span>
  )
}

export default {
  Image,
  Vega,
}

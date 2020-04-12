import React from "react" // eslint-disable-line no-unused-vars
import { Flex, Box, Image as RImage } from "rebass"
/** @jsx jsx */
import { jsx, Styled } from "theme-ui" // eslint-disable-line no-unused-vars

const Image = ({ alt, ...props }) => {
  return (
    <div sx={{ textAlign: "center" }}>
      <RImage alt={alt} {...props} />
      <p sx={{ color: "secondary", textAlign: "center" }}>{alt}</p>
    </div>
  )
}

export default {
  Flex,
  Box,
  Image,
}

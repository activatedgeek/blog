/** @jsx jsx */

import { jsx, Image as TImage } from "theme-ui"

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

export default Image

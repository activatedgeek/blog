/** @jsx jsx */

import { jsx, Image as TImage } from "theme-ui"

const Image = ({ id, alt, ...props }) => {
  return (
    <figure sx={{ textAlign: "center" }}>
      <TImage alt={alt} {...props} />
      <figcaption sx={{ color: "textMuted" }}>
        Fig. {id}: {alt}
      </figcaption>
    </figure>
  )
}

export default Image

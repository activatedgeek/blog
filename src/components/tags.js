/** @jsx jsx */

import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"

const Tags = ({ tags }) =>
  tags.map((t, k) => (
    <Styled.a
      key={k}
      as={Link}
      to={`/blog/tags/${encodeURIComponent(t)}`}
      sx={{ "&:hover": { textDecoration: "none" } }}
    >
      <span
        sx={{
          m: "0.25em",
          borderStyle: "solid",
          borderWidth: "1px",
          p: "0.2em",
          borderRadius: "0.2em",
          fontSize: 0,
        }}
      >
        {t}
      </span>
    </Styled.a>
  ))

export default Tags

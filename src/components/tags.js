/** @jsx jsx */

import { jsx, Styled, Box } from "theme-ui"
import { Link } from "gatsby"

const Tags = ({ tags, fontSize, my }) =>
  tags.map(({ tag, totalCount }, k) => (
    <Box
      key={k}
      sx={{
        display: "inline-block",
        bg: "gray.2",
        borderRadius: "lg",
        px: 2,
        mx: 1,
        my,
      }}
    >
      <Styled.a
        as={Link}
        to={`/blog/tags/${encodeURIComponent(tag)}`}
        sx={{ fontSize, "&:hover": { textDecoration: "none" } }}
      >
        {tag} {totalCount ? `(${totalCount})` : null}
      </Styled.a>
    </Box>
  ))

export default Tags

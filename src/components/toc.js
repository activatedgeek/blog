/** @jsx jsx */

import { Link } from "gatsby"
import { jsx, Styled, Box } from "theme-ui"

const NestedList = ({ toc, depth }) => (
  <Styled.ul>
    {toc.map(({ url, title, items }, i) => (
      <Styled.li key={i}>
        <Styled.a as={Link} to={url}>
          {title}
        </Styled.a>
        {items ? <NestedList toc={items} depth={depth + 1} /> : null}
      </Styled.li>
    ))}
  </Styled.ul>
)

const TableOfContents = ({ toc: { items } }) => {
  return (
    <Box
      sx={{
        bg: "gray.1",
        p: "1em",
        position: "sticky",
        top: "1em",
        overflow: "auto",
      }}
    >
      <Styled.h4>Table of Contents</Styled.h4>
      <NestedList toc={items} depth={0} />
    </Box>
  )
}

export default TableOfContents

/** @jsx jsx */

import { Link } from "gatsby"
import { jsx, Styled, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faListAlt } from "@fortawesome/free-solid-svg-icons"

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
        bg: "gray.2",
        p: 4,
        borderRadius: "lg",
        position: "sticky",
        top: 4,
        overflow: "auto",
      }}
    >
      <Styled.h4>
        <FontAwesomeIcon icon={faListAlt} sx={{ mr: 1 }} /> Table of Contents
      </Styled.h4>
      <NestedList toc={items} depth={0} />
    </Box>
  )
}

export default TableOfContents

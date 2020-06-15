import { Link } from "gatsby"
/** @jsx jsx */
import { jsx, Styled, Flex } from "theme-ui"

const KBList = ({ edges }) => (
      <Flex sx={{ pt: "1.5em", flexDirection: "column" }}>
        <Styled.h4 sx={{ p: "0 0.5em", m: 0 }}>Knowledge Base</Styled.h4>
        {edges.map(({ node: { frontmatter: { title, slug } } }, i) => (
          <Styled.a
            key={i}
            as={Link}
            to={slug}
            sx={{
              p: "0.5em 1em",
              "&:hover": {
                bg: "gray.2",
                cursor: "pointer",
              },
            }}
          >
            {title}
          </Styled.a>
        ))}
      </Flex>
)

export default KBList

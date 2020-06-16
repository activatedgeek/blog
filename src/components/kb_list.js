import { Link } from "gatsby"
/** @jsx jsx */
import { jsx, Styled, Flex } from "theme-ui"

const KBList = ({ edges }) => {
  let labelMap = {}
  edges.forEach(({ node }) => {
    const {
      frontmatter: { label },
    } = node
    const useLabel = label || "0"
    labelMap[useLabel] = labelMap[useLabel] || []
    labelMap[useLabel].push(node)
  })

  return (
    <Flex sx={{ pt: "1.5em", flexDirection: "column" }}>
      <Styled.h4 sx={{ p: "0 0.3em", m: 0 }}>Knowledge Base</Styled.h4>
      <Styled.hr sx={{ m: "0.5em" }} />
      {Object.keys(labelMap)
        .sort()
        .map((l, k) => (
          <Flex key={k} sx={{ flexDirection: "column" }}>
            {l === "0" ? null : (
              <Styled.p sx={{ p: "0 0.5em", color: "secondary" }}>{l}</Styled.p>
            )}
            {labelMap[l].map(({ frontmatter: { title, slug } }, i) => (
              <Styled.a
                key={i}
                as={Link}
                to={slug}
                sx={{
                  p: "0.3em 1em",
                  "&:hover": {
                    bg: "gray.2",
                    cursor: "pointer",
                  },
                }}
              >
                {title}
              </Styled.a>
            ))}
            <Styled.hr sx={{ m: "0.5em" }} />
          </Flex>
        ))}
    </Flex>
  )
}

export default KBList

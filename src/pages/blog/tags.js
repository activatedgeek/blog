import { graphql, Link } from "gatsby"
/** @jsx jsx */
import { jsx, Styled, Flex, Box } from "theme-ui"

import Layout from "../../components/layout"

const TagList = ({
  data: {
    allMdx: { group },
  },
}) => {
  return (
    <Layout
      frontmatter={{
        title: "Tags",
        description: "All tags used in blog articles.",
      }}
    >
      <Box
        sx={{
          p: "1em",
          m: "auto",
          maxWidth: ["100%", "100%", "50rem", "50rem"],
        }}
      >
        <Styled.h2 sx={{ mb: "0.5em" }}>
          Tags{" "}
          <span role="img" aria-label="tags">
            🏷️
          </span>
        </Styled.h2>
        <Flex sx={{ flexFlow: "row wrap" }}>
          {group.map(({ tag, totalCount }, i) => (
            <Styled.a
              key={i}
              as={Link}
              to={`/blog/tags/${encodeURIComponent(tag)}`}
              sx={{ m: "0 0.5em 1em 0", "&:hover": { textDecoration: "none" } }}
            >
              <span
                sx={{
                  m: "0.5em 0.5em 0.5em 0",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  p: "0.2em",
                  borderRadius: "0.2em",
                  fontSize: 2,
                }}
              >
                {tag} ({totalCount})
              </span>
            </Styled.a>
          ))}
        </Flex>
      </Box>
    </Layout>
  )
}

export default ({ data }) => <TagList data={data} />

export const pageQuery = graphql`
  {
    allMdx(filter: { frontmatter: { category: { eq: "blog" } } }) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`

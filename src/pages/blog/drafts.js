import { graphql } from "gatsby"
/** @jsx jsx */
import { jsx, Styled, Box } from "theme-ui"

import Layout from "../../components/layout"
import PostIndex from "../../components/post_index"

export default ({
  data: {
    allMdx: { edges },
  },
}) => (
  <Layout
    frontmatter={{
      title: "Drafts",
      description: "Draft blog posts.",
    }}
  >
    <Box
      sx={{
        p: "1em",
        m: "auto",
        minWidth: [null, null, "50rem", "50rem"],
        maxWidth: ["100%", "100%", "50rem", "50rem"],
      }}
    >
      <Styled.h2>Drafts</Styled.h2>
      <PostIndex
        items={edges.map(
          ({
            node: {
              frontmatter: { title, tags, slug, archive, draft },
              fields: { createdMs },
            },
          }) => ({
            title,
            tags,
            slug,
            archive,
            draft,
            createdMs,
          })
        )}
      />
    </Box>
  </Layout>
)

export const pageQuery = graphql`
  {
    allMdx(
      filter: { frontmatter: { category: { in: "blog" }, draft: { eq: true } } }
      sort: { fields: fields___createdMs, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            tags
            slug
            archive
            draft
          }
          fields {
            createdMs
          }
        }
      }
    }
  }
`

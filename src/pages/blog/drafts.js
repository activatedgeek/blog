/** @jsx jsx */

import { graphql } from "gatsby"
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
              frontmatter: { title, date, tags, slug, archive, draft },
            },
          }) => ({
            title,
            date,
            tags,
            slug,
            archive,
            draft,
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
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            tags
            slug
            archive
            draft
          }
        }
      }
    }
  }
`

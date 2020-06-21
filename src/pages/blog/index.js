/** @jsx jsx */

import { graphql } from "gatsby"
import { jsx, Styled, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper } from "@fortawesome/free-solid-svg-icons"

import Layout from "../../components/layout"
import PostIndex from "../../components/post_index"

export default ({
  data: {
    allMdx: { edges },
  },
}) => (
  <Layout
    frontmatter={{
      title: "All Posts",
      description: "Index of all blog posts.",
      slug: "/blog",
    }}
  >
    <Box
      sx={{
        p: 4,
        mx: "auto",
        maxWidth: ["100%", "100%", "3xl", "4xl"],
      }}
    >
      <Styled.h2>
        <FontAwesomeIcon icon={faNewspaper} sx={{ mr: 1 }} /> All Posts
      </Styled.h2>
      <PostIndex
        items={edges.map(
          ({
            node: {
              frontmatter: { title, date, tags, slug, archive, draft },
            },
          }) => ({
            title,
            date,
            tags: tags.map(t => ({ tag: t })),
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
      filter: { frontmatter: { category: { in: "blog" }, draft: { ne: true } } }
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

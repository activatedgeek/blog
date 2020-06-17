import { graphql, Link } from "gatsby"
/** @jsx jsx */
import { jsx, Styled, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

import Layout from "../components/layout"
import PostIndex from "../components/post_index"

export default ({
  data: {
    allMdx: { edges },
  },
  location: { pathname },
}) => {
  const tag = decodeURIComponent(pathname.split("/").slice(-1)[0])

  return (
    <Layout
      frontmatter={{
        title: `Posts tagged "${tag}"`,
        description: `Index of all blog posts tagged "${tag}".`,
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
        <Styled.h2>Posts tagged "{tag}"</Styled.h2>
        <Styled.a as={Link} to="/blog">
          <FontAwesomeIcon icon={faArrowLeft} title="Show all posts." /> All
          Posts
        </Styled.a>
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
}

export const pageQuery = graphql`
  query($tag: [String!]) {
    allMdx(
      filter: { frontmatter: { category: { in: "blog" }, tags: { in: $tag } } }
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

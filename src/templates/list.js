/** @jsx jsx */

import { graphql, Link } from "gatsby"
import { jsx, Styled, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faNewspaper } from "@fortawesome/free-solid-svg-icons"

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
        slug: `/blog/tags/${tag}`,
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
          <FontAwesomeIcon icon={faNewspaper} /> Posts tagged "{tag}"
        </Styled.h2>
        <Styled.p>
          <Styled.a as={Link} to="/blog">
            <FontAwesomeIcon icon={faArrowLeft} title="Show all posts." /> back
            to All Posts
          </Styled.a>
        </Styled.p>
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
}

export const pageQuery = graphql`
  query($tag: [String!]) {
    allMdx(
      filter: { frontmatter: { category: { in: "blog" }, tags: { in: $tag } } }
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

/** @jsx jsx */

import { graphql } from "gatsby"
import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper } from "@fortawesome/free-solid-svg-icons"

import Layout, { ContentBox } from "../../components/layout"
import PostIndex from "../../components/post_index"

export default ({
  data: {
    allMdx: { edges },
  },
}) => (
  <Layout
    frontmatter={{
      title: "All Posts - Blog",
      description: "Index of all blog posts.",
      slug: "/blog",
    }}
  >
    <ContentBox>
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
    </ContentBox>
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

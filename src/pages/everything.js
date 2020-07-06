/** @jsx jsx */

import { graphql, Link } from "gatsby"
import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper } from "@fortawesome/free-solid-svg-icons"

import Layout, { ContentBox } from "../components/layout"
import PostIndex from "../components/post_index"
import { Warn } from "../components/hint"

export default ({
  data: {
    allMdx: { edges },
  },
}) => (
  <Layout
    frontmatter={{
      title: "Everything",
      description: "Index of all posts.",
      slug: "/everything",
    }}
  >
    <ContentBox>
      <Styled.h2>
        <FontAwesomeIcon icon={faNewspaper} sx={{ mr: 1 }} /> Everything
      </Styled.h2>
      <Warn>
        This is a list of everything in the knowledge base. This place should
        only be visited rarely. Instead, visit the relevant outline pages or{" "}
        <Styled.a to="/search" as={Link}>
          search
        </Styled.a>{" "}
        for something on your mind.
      </Warn>
      <PostIndex
        items={edges.map(
          ({
            node: {
              frontmatter: { title, date, slug, archive, draft },
            },
          }) => ({
            title,
            date,
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
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date
            slug
            archive
            draft
          }
        }
      }
    }
  }
`

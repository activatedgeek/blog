/** @jsx jsx */

import { graphql, Link } from "gatsby"
import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDatabase } from "@fortawesome/free-solid-svg-icons"

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
      title: "Database of everything",
      description: "Index of all posts.",
      slug: "/db",
    }}
  >
    <ContentBox>
      <Styled.h2>
        <FontAwesomeIcon icon={faDatabase} sx={{ mr: 1 }} /> Database of
        everything
      </Styled.h2>
      <Warn>
        This is a list of everything in the knowledge base. This place should
        rarely need a visit, unless you don't know what you are looking for.
        Instead, visit the relevant outline or portal pages. If you know what
        you are looking for, try{" "}
        <Styled.a to="/search" as={Link}>
          search
        </Styled.a>{" "}
        instead.
      </Warn>
      <PostIndex
        items={edges.map(
          ({
            node: {
              frontmatter: { title, day, year, slug, archive, draft },
            },
          }) => ({
            title,
            slug,
            archive,
            draft,
            day,
            year,
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
            slug
            archive
            draft
            day: date(formatString: "MMM D")
            year: date(formatString: "YYYY")
          }
        }
      }
    }
  }
`

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
}) => {
  edges.sort((a, b) => {
    const { dateTs: a_dateTs, updatedTs: a_updatedTs } = a.node.frontmatter
    const { dateTs: b_dateTs, updatedTs: b_updatedTs } = b.node.frontmatter
    const a_Ts = a_updatedTs || a_dateTs
    const b_Ts = b_updatedTs || b_dateTs
    return b_Ts > a_Ts
  })

  return (
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
          This is a list of everything in the knowledge base, reverse sorted by
          last updated date. This place should rarely need a visit, unless you
          don't know what you are looking for. If you do know, try{" "}
          <Styled.a to="/search" as={Link}>
            Keyword Search
          </Styled.a>{" "}
          instead.
        </Warn>
        <PostIndex
          items={edges.map(
            ({
              node: {
                frontmatter: {
                  title,
                  day,
                  year,
                  updatedDay,
                  updatedYear,
                  slug,
                  archive,
                  draft,
                },
              },
            }) => ({
              title,
              slug,
              archive,
              draft,
              day: updatedDay || day,
              year: updatedYear || year,
            })
          )}
        />
      </ContentBox>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    allMdx {
      edges {
        node {
          frontmatter {
            title
            slug
            archive
            draft
            day: date(formatString: "MMM D")
            year: date(formatString: "YYYY")
            updatedDay: updated(formatString: "MMM D")
            updatedYear: updated(formatString: "YYYY")
            dateTs: date(formatString: "X")
            updatedTs: updated(formatString: "X")
          }
        }
      }
    }
  }
`

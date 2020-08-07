/** @jsx jsx */

import { Link, graphql } from "gatsby"
import { jsx, Styled } from "theme-ui"

import Layout, { ContentBox } from "../components/layout"
import PostIndex from "../components/post_index"
import Shortcodes from "../components/shortcodes"

const LostPage = ({
  data: {
    allMdx: { edges },
  },
}) => (
  <Layout
    frontmatter={{
      title: "Hmm... An error?",
      description: "This page could not be found.",
    }}
  >
    <ContentBox style={{ width: ["100%", "100%", "3xl", "4xl"] }}>
      <Styled.h1>Hmm... An error?</Styled.h1>
      <Shortcodes.LazyImage
        src="https://imgs.xkcd.com/comics/error_types.png"
        alt="https://xkcd.com/2303/"
      />
      <Styled.p>
        Have something in mind? Try a{" "}
        <Styled.a to="/search" as={Link}>
          Keyword Search
        </Styled.a>
        .
      </Styled.p>
      <Styled.p>
        Or now that you are here, perhaps check the last 10 pages I updated.
      </Styled.p>
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

export default LostPage

export const pageQuery = graphql`
  {
    allMdx(sort: { fields: fields___sortTs, order: DESC }, limit: 10) {
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

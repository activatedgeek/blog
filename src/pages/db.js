/** @jsx jsx */

import { graphql, Link } from "gatsby"
import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDatabase } from "@fortawesome/free-solid-svg-icons"

import Layout, { ContentBox } from "../components/layout"
import PostIndex from "../components/post_index"
import { Warn } from "../components/hint"
import { processFrontmatter } from "../utils"

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
        This is a list of everything in the <Styled.i>Knowledge Bayes</Styled.i>
        , sorted by last updated date. This place should rarely need a visit,
        unless you don't know what you are looking for. If you do know, try{" "}
        <Styled.a to="/search" as={Link}>
          Keyword Search
        </Styled.a>{" "}
        instead. Otherwise, a good place to start is{" "}
        <Styled.a to="/kb" as={Link}>
          here
        </Styled.a>
        .
      </Warn>
      <PostIndex
        items={edges.map(({ node: { frontmatter } }) =>
          processFrontmatter(frontmatter)
        )}
      />
    </ContentBox>
  </Layout>
)

export const pageQuery = graphql`
  {
    allMdx(sort: { fields: fields___sortTs, order: DESC }) {
      edges {
        node {
          ...frontmatter
        }
      }
    }
  }
`

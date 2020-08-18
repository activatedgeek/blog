import React from "react"
import { graphql } from "gatsby"

import { Post } from "./page"
import Layout, { ContentBox } from "../components/layout"
import PostIndex from "../components/post_index"
import { processRawEdges } from "../utils"

const OverviewPageTemplate = ({
  data: {
    mdx,
    allMdx: { edges },
  },
}) => {
  const { frontmatter } = mdx

  return (
    <Layout frontmatter={frontmatter}>
      <ContentBox>
        <Post mdx={mdx} />

        <PostIndex items={processRawEdges(edges)} />
      </ContentBox>
    </Layout>
  )
}

export default OverviewPageTemplate

export const pageQuery = graphql`
  query($id: String, $area: String) {
    mdx(id: { eq: $id }) {
      id
      body
      tableOfContents
      frontmatter {
        title
        description
        area
        cat
        slug
        date(formatString: "MMM D YYYY")
        updated(formatString: "MMM D YYYY")
        draft
        archive
      }
    }
    allMdx(
      sort: { fields: fields___sortTs, order: DESC }
      filter: { frontmatter: { area: { eq: $area }, cat: { ne: "ov" } } }
    ) {
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
          }
        }
      }
    }
  }
`

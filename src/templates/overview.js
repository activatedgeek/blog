import React from "react"
import { graphql } from "gatsby"

import PageTemplate from "./page"
import PostIndex from "../components/post_index"
import { processFrontmatter } from "../utils"

const OverviewPageTemplate = ({ data }) => {
  const {
    allMdx: { edges },
  } = data
  return (
    <PageTemplate data={data}>
      <PostIndex
        showArea={false}
        items={edges.map(({ node: { frontmatter } }) =>
          processFrontmatter(frontmatter)
        )}
      />
    </PageTemplate>
  )
}

export default OverviewPageTemplate

export const pageQuery = graphql`
  query($id: String, $area: String) {
    mdx(id: { eq: $id }) {
      ...page
    }
    allMdx(
      sort: { fields: fields___sortTs, order: DESC }
      filter: { frontmatter: { area: { eq: $area }, cat: { ne: "ov" } } }
    ) {
      edges {
        node {
          ...frontmatter
        }
      }
    }
  }
`

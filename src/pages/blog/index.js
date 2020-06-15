import React from "react"
import { graphql } from "gatsby"
import PostIndex from "../../templates/post_index"

export default ({ data }) => (
  <PostIndex data={data} title="Posts" titleLink="/blog" />
)

export const pageQuery = graphql`
  {
    allMdx(
      filter: { frontmatter: { category: { in: "blog" }, draft: { ne: true } } }
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

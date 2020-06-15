import React from "react"
import { graphql } from "gatsby"
import PostIndex from "../../templates/post_index"

export default ({ data }) => (
  <PostIndex data={data} title="Drafts" titleLink="/blog/drafts" />
)

export const pageQuery = graphql`
  {
    allMdx(
      filter: { frontmatter: { category: { in: "blog" }, draft: { eq: true } } }
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

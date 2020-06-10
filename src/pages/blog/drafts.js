import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PostIndex from "../../templates/post_index"

const BlogIndex = () => (
  <StaticQuery
    query={graphql`
      {
        allMdx(
          filter: {
            frontmatter: { category: { in: "blog" }, draft: { eq: true } }
          }
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
    `}
    render={data => (
      <PostIndex data={data} title="Drafts" titleLink="/blog/drafts" />
    )}
  />
)

export default BlogIndex

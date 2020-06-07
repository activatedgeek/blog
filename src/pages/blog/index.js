import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PostIndex from "../../templates/post_index"

const BlogIndex = () => (
  <StaticQuery
    query={graphql`
      {
        allMdx(
          filter: {
            frontmatter: { category: { in: "blog" }, draft: { ne: true } }
          }
        ) {
          edges {
            node {
              frontmatter {
                title
                tags
                slug
                createdMs
                archive
                draft
              }
            }
          }
        }
      }
    `}
    render={data => <PostIndex data={data} title="Posts" titleLink="/blog" />}
  />
)

export default BlogIndex

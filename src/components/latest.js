import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { processFrontmatter } from "../utils"
import PostIndex from "./post_index"

const LatestPages = () => {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    {
      allMdx(
        sort: { fields: fields___sortTs, order: DESC },
        filter: { frontmatter: { draft: { ne: true } } },
        limit: 10
      ) {
        edges {
          node {
            ...frontmatter
          }
        }
      }
    }
  `)

  return (
    <PostIndex
      items={edges.map(({ node: { frontmatter } }) =>
        processFrontmatter(frontmatter)
      )}
    />
  )
}

export default LatestPages

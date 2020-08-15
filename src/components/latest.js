import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { processRawEdges } from "../utils"
import PostIndex from "./post_index"

const LatestPages = () => {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    {
      allMdx(sort: { fields: fields___sortTs, order: DESC }, limit: 10) {
        edges {
          node {
            frontmatter {
              title
              area
              cat
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
  `)

  return <PostIndex items={processRawEdges(edges)} />
}

export default LatestPages

import React from "react"
import { graphql } from "gatsby"

import { Post } from "./page"
import Layout, { ContentBox } from "../components/layout"
import PostIndex from "../components/post_index"

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
        slug
        date(formatString: "MMM D YYYY")
        updated(fromNow: true)
        draft
        archive
      }
      fields {
        filedUnder
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
            dateTs: date(formatString: "X")
            updatedTs: updated(formatString: "X")
          }
        }
      }
    }
  }
`

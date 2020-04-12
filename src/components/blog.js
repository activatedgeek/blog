import React from "react"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import emoji from "node-emoji"
/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

import Layout from "./layout"

const BlogIndex = ({
  data: {
    allMdx: { edges },
  },
}) => {
  let yearIndex = edges.reduce((acc, x) => {
    const {
      node: {
        fields: { createdMs },
      },
    } = x
    const year = new Date(createdMs).getFullYear()
    if (!acc.hasOwnProperty(year)) {
      acc[year] = []
    }
    acc[year].push(x)
    return acc
  }, {})

  const yearList = Object.keys(yearIndex)
  yearList.sort().reverse()

  yearList.forEach(year => {
    yearIndex[year].sort(function(x, y) {
      const {
        node: {
          fields: { createdMs: c1 },
        },
      } = x
      const {
        node: {
          fields: { createdMs: c2 },
        },
      } = y
      return new Date(c1) < new Date(c2) ? 1 : -1
    })
  })

  return (
    <Layout>
      <Helmet>
        <title>Blog Archive</title>
        <meta name="description" content="Blog Archive" />
      </Helmet>
      <Styled.h1>Blog Archive {emoji.get(`:pencil:`)}</Styled.h1>
      {yearList.map((year, i) => (
        <React.Fragment key={i}>
          <Styled.h2>{year}</Styled.h2>
          <Styled.ul>
            {yearIndex[year].map(
              (
                {
                  node: {
                    frontmatter: { title, stale },
                    fields: { slug, createdMs },
                  },
                },
                j
              ) => (
                <Styled.li key={j}>
                  <Styled.a
                    as={Link}
                    to={slug}
                    sx={{ opacity: stale === true ? 0.6 : 1 }}
                  >
                    {title}
                  </Styled.a>
                  <span sx={{ color: "secondary", m: "0 .5em", fontSize: 0 }}>
                    {new Date(createdMs).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {new Date(createdMs).getDate()}
                  </span>
                </Styled.li>
              )
            )}
          </Styled.ul>
        </React.Fragment>
      ))}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  {
    allMdx(filter: { fields: { subcontent: { eq: "blog" } } }) {
      edges {
        node {
          frontmatter {
            title
            stale
          }
          fields {
            slug
            createdMs
          }
        }
      }
    }
  }
`

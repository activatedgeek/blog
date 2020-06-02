import React from "react"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import emoji from "node-emoji"
/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArchive, faEdit } from "@fortawesome/free-solid-svg-icons"

import Layout from "./layout"

const BlogIndex = ({
  data: {
    allMdx: { edges },
  },
}) => {
  let yearIndex = edges.reduce((acc, x) => {
    const {
      node: {
        frontmatter: { createdMs },
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
          frontmatter: { createdMs: c1 },
        },
      } = x
      const {
        node: {
          frontmatter: { createdMs: c2 },
        },
      } = y
      return new Date(c1) < new Date(c2) ? 1 : -1
    })
  })

  return (
    <Layout>
      <Helmet>
        <title>Blog Index</title>
        <meta name="description" content="Blog Index" />
      </Helmet>
      <Styled.h2>Blog Index {emoji.get(`:pencil:`)}</Styled.h2>
      {yearList.map((year, i) => (
        <React.Fragment key={i}>
          <Styled.h3>{year}</Styled.h3>
          <Styled.ul>
            {yearIndex[year].map(
              (
                {
                  node: {
                    frontmatter: { title, slug, createdMs, archive, draft },
                  },
                },
                j
              ) => (
                <Styled.li key={j}>
                  <Styled.a
                    as={Link}
                    to={slug}
                    sx={{ opacity: archive === true ? 0.6 : 1 }}
                  >
                    {title}
                  </Styled.a>
                  <span sx={{ color: "secondary", m: "0 .5em", fontSize: 0 }}>
                    {new Date(createdMs).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {new Date(createdMs).getDate()}
                  </span>
                  {archive === true ? (
                    <FontAwesomeIcon
                      icon={faArchive}
                      title="This post is archived."
                      sx={{ opacity: 0.6 }}
                    />
                  ) : null}
                  {draft === true ? (
                    <FontAwesomeIcon
                      icon={faEdit}
                      title="This post is a working draft."
                      sx={{ opacity: 0.6 }}
                    />
                  ) : null}
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
  query($c: [String!]) {
    allMdx(filter: { frontmatter: { category: { in: $c } } }) {
      edges {
        node {
          frontmatter {
            title
            slug
            createdMs
            category
            archive
            draft
          }
        }
      }
    }
  }
`

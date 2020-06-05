import React from "react"
import { graphql, Link } from "gatsby"
import emoji from "node-emoji"
/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArchive, faEdit } from "@fortawesome/free-solid-svg-icons"

import Layout from "../components/layout"

const YearIndex = ({
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
    <Layout
      frontmatter={{
        title: "Blog Posts",
        description: "Index of all blog posts.",
      }}
    >
      <Styled.h2>
        <Styled.a as={Link} to="/blog">
          Blog Posts
        </Styled.a>{" "}
        {emoji.get(`:pencil:`)}
      </Styled.h2>
      {yearList.map((year, i) => (
        <React.Fragment key={i}>
          <Styled.h3>{year}</Styled.h3>
          <Styled.ul>
            {yearIndex[year].map(
              (
                {
                  node: {
                    frontmatter: {
                      title,
                      slug,
                      createdMs,
                      archive,
                      draft,
                      tags,
                    },
                  },
                },
                j
              ) => (
                <Styled.li key={j}>
                  <Styled.a as={Link} to={slug}>
                    {title}
                  </Styled.a>
                  {archive === true ? (
                    <FontAwesomeIcon
                      icon={faArchive}
                      title="This post is archived."
                      sx={{ ml: "0.5em", fontSize: 0 }}
                    />
                  ) : null}
                  {draft === true ? (
                    <FontAwesomeIcon
                      icon={faEdit}
                      title="This post is a working draft."
                      sx={{ ml: "0.5em", fontSize: 0 }}
                    />
                  ) : null}
                  <span sx={{ color: "secondary", m: "0 .5em", fontSize: 0 }}>
                    {new Date(createdMs).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {new Date(createdMs).getDate()}
                  </span>
                  <br />
                  {tags.map((t, k) => (
                    <Styled.a
                      key={k}
                      as={Link}
                      to={`/blog/tags/${encodeURIComponent(t)}`}
                      sx={{
                        "&:hover": {
                          textDecoration: "none",
                        },
                      }}
                    >
                      <span
                        sx={{
                          m: "0.5em 0.5em 0.5em 0",
                          borderStyle: "solid",
                          borderWidth: "1px",
                          p: "0.2em",
                          borderRadius: "0.2em",
                          fontSize: 0,
                        }}
                      >
                        {t}
                      </span>
                    </Styled.a>
                  ))}
                </Styled.li>
              )
            )}
          </Styled.ul>
        </React.Fragment>
      ))}
    </Layout>
  )
}

export default YearIndex

export const pageQuery = graphql`
  query($tag: [String!]) {
    allMdx(
      filter: { frontmatter: { category: { in: "blog" }, tags: { in: $tag } } }
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
`

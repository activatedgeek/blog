/** @jsx jsx */

import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { jsx, Styled, Flex, Box } from "theme-ui"

import Layout from "../components/layout"
import Tags from "../components/tags"
import { Info, Warn } from "../components/hint"
import TableOfContents from "../components/toc"
import shortcodes from "../components/shortcodes"

const InfoSep = () => (
  <Styled.hr
    sx={{
      width: "1px",
      height: "2em",
      display: "inline-block",
      m: "0 0.5em",
    }}
  />
)

export const PostInfo = ({ date, updated, tags }) => {
  let infoList = []

  if (date !== null) {
    infoList.push(
      <React.Fragment>
        <span role="img" aria-label="Date" sx={{ mr: "0.3em" }}>
          ✍️
        </span>
        {date}
      </React.Fragment>
    )
  }
  if (updated !== null) {
    infoList.push(
      <React.Fragment>
        <span role="img" aria-label="Last Updated" sx={{ mr: "0.3em" }}>
          🕓
        </span>{" "}
        Last updated: {updated}
      </React.Fragment>
    )
  }
  if (Array.isArray(tags) && tags.length) {
    infoList.push(<Tags tags={tags} />)
  }

  return (
    <Flex
      sx={{
        color: "secondary",
        fontSize: 0,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {infoList.map((c, i) => (
        <React.Fragment key={i}>
          {c}
          {i < infoList.length - 1 ? <InfoSep /> : null}
        </React.Fragment>
      ))}
    </Flex>
  )
}

const BlogPageTemplate = ({ data: { mdx } }) => {
  const { body, frontmatter, tableOfContents } = mdx
  const { title, draft, archive } = frontmatter

  return (
    <Layout frontmatter={{ ...frontmatter, title: `${title} - Blog` }}>
      <Flex>
        <Box
          sx={{
            p: "1em",
            m: "0 auto",
            maxWidth: ["100%", "100%", "50rem", "50rem"],
          }}
        >
          <Styled.h1>{title}</Styled.h1>

          <PostInfo {...frontmatter} />

          <Styled.hr />

          {tableOfContents.items ? (
            <Box sx={{ display: ["block", "block", "none", "none"] }}>
              <TableOfContents toc={tableOfContents} />
              <Styled.hr />
            </Box>
          ) : null}

          {archive ? (
            <Warn>
              This post is archived. Some content may be out of date or render
              incorrectly.
            </Warn>
          ) : null}

          {draft ? <Info>This post is a work in progress.</Info> : null}

          <MDXProvider components={shortcodes}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </Box>

        {tableOfContents.items ? (
          <Box
            sx={{
              pt: "2em",
              display: ["none", "none", "block", "block"],
              mr: "1em",
            }}
          >
            <TableOfContents toc={tableOfContents} />
          </Box>
        ) : null}
      </Flex>
    </Layout>
  )
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query($id: String) {
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
        tags
        draft
        archive
      }
    }
  }
`

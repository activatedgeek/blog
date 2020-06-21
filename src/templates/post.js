/** @jsx jsx */

import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { jsx, Styled, Flex, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt, faEdit, faTag } from "@fortawesome/free-solid-svg-icons"

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
      mx: 2,
      my: 0,
    }}
  />
)

export const PostInfo = ({ date, updated, tags }) => {
  let infoList = []

  if (date !== null) {
    infoList.push(
      <React.Fragment>
        <FontAwesomeIcon icon={faPencilAlt} sx={{ mr: 1 }} /> {date}
      </React.Fragment>
    )
  }
  if (updated !== null) {
    infoList.push(
      <React.Fragment>
        <FontAwesomeIcon icon={faEdit} sx={{ mr: 1 }} /> Last updated: {updated}
      </React.Fragment>
    )
  }
  if (Array.isArray(tags) && tags.length) {
    infoList.push(
      <React.Fragment>
        <FontAwesomeIcon icon={faTag} sx={{ mr: 1 }} />
        <Tags tags={tags.map(t => ({ tag: t }))} />
      </React.Fragment>
    )
  }

  return (
    <Flex
      sx={{
        color: "gray.6",
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

export const Post = ({ mdx, toc }) => {
  const { body, frontmatter, tableOfContents } = mdx
  const { title, draft, archive } = frontmatter

  return (
    <Box>
      <Styled.h1>{title}</Styled.h1>

      <PostInfo {...frontmatter} />

      <Styled.hr />

      {tableOfContents.items ? (
        <Box
          sx={{ display: toc ? "block" : ["block", "block", "none", "none"] }}
        >
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
  )
}

const BlogPageTemplate = ({ data: { mdx } }) => {
  const { frontmatter, tableOfContents } = mdx
  const { title } = frontmatter

  return (
    <Layout frontmatter={{ ...frontmatter, title: `${title} - Blog` }}>
      <Box
        sx={{
          p: 4,
          mx: "auto",
          maxWidth: ["100%", "100%", "3xl", "4xl"],
          flex: 1,
        }}
      >
        <Post mdx={mdx} />
      </Box>
      {tableOfContents.items ? (
        <Box
          sx={{
            display: ["none", "none", "block", "block"],
            mx: "auto",
          }}
        >
          <TableOfContents toc={tableOfContents} />
        </Box>
      ) : null}
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

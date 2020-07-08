/** @jsx jsx */

import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { jsx, Styled, Flex, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt, faEdit } from "@fortawesome/free-solid-svg-icons"

import Layout, { ContentBox } from "../components/layout"
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

export const PostInfo = ({ date, updated, filedUnder }) => {
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

  return (
    <Flex
      sx={{
        color: "textMuted",
        flexWrap: "wrap",
        alignItems: "center",
        fontSize: 0,
      }}
    >
      {infoList.map((c, i) => (
        <React.Fragment key={i}>
          {c}
          <InfoSep />
        </React.Fragment>
      ))}
      {filedUnder}
    </Flex>
  )
}

export const Post = ({ mdx }) => {
  const { body, frontmatter, fields, tableOfContents } = mdx
  const { title, draft, archive } = frontmatter

  return (
    <Box>
      <Styled.h1 sx={{ mt: 0 }}>{title}</Styled.h1>

      <PostInfo {...frontmatter} {...fields} />

      <Styled.hr />

      {archive ? (
        <Warn>
          This post is archived. Some content may be out of date or render
          incorrectly.
        </Warn>
      ) : null}

      {draft ? <Info>This post is a work in progress.</Info> : null}

      {tableOfContents.items ? (
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "inline-block",
            float: [null, null, "right", "right"],
            ml: [0, 0, 4, 4],
            mb: 4,
          }}
        >
          <TableOfContents toc={tableOfContents} />
        </Box>
      ) : null}

      <MDXProvider components={shortcodes}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </Box>
  )
}

const PageTemplate = ({ data: { mdx } }) => {
  const { frontmatter } = mdx

  return (
    <Layout frontmatter={frontmatter}>
      <ContentBox>
        <Post mdx={mdx} />
      </ContentBox>
    </Layout>
  )
}

export default PageTemplate

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
        draft
        archive
      }
      fields {
        filedUnder
      }
    }
  }
`

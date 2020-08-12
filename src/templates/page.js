/** @jsx jsx */

import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { jsx, Styled, Flex, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt, faEdit, faTag } from "@fortawesome/free-solid-svg-icons"

import Layout, { ContentBox, InfoSep } from "../components/layout"
import { Info, Warn } from "../components/hint"
import TableOfContents from "../components/toc"
import shortcodes from "../components/shortcodes"
import { areas } from "../../site/orgsys"


const PostInfo = ({ area, cat, date, updated }) => {
  let infoList = []

  if (date !== null) {
    infoList.push(
      <React.Fragment>
        <FontAwesomeIcon
          title="Date written"
          icon={faPencilAlt}
          sx={{ mr: 1 }}
        />{" "}
        {date}
      </React.Fragment>
    )
  }
  if (updated !== null) {
    infoList.push(
      <React.Fragment>
        <FontAwesomeIcon title="Date updated" icon={faEdit} sx={{ mr: 1 }} />{" "}
        Last updated: {updated}
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
      <FontAwesomeIcon title="Filed under" icon={faTag} sx={{ mr: 1 }} />
      {areas[area].categories[cat].label} in{" "}
      <span
        sx={{
          display: "inline-block",
          bg: areas[area].color,
          borderRadius: "lg",
          boxShadow: "md",
          px: 2,
          ml: 1,
        }}
      >
        <Styled.a
          as={Link}
          to={areas[area].url}
          sx={{
            fontSize: 0,
            color: "light",
            ":visited,:hover,:active": {
              textDecoration: "none",
            },
          }}
        >
          {area}
        </Styled.a>
      </span>
    </Flex>
  )
}

export const Post = ({ mdx }) => {
  const { body, frontmatter, fields, tableOfContents } = mdx
  const { title, draft, archive } = frontmatter
  const { area } = frontmatter

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
            display: "inline-block",
            float: [null, null, "right", "right"],
            ml: [0, 0, 4, 4],
            mb: 4,
          }}
        >
          <TableOfContents toc={tableOfContents} color={areas[area].color} />
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
        area
        cat
        slug
        date(formatString: "MMM D YYYY")
        updated(fromNow: true)
        draft
        archive
      }
    }
  }
`

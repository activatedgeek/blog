/** @jsx jsx */

import React from "react"
import { graphql } from "gatsby"
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
import { AreaButton } from "../components/post_index"

const PostInfo = ({ area, cat, day, year, updatedDay, updatedYear }) => (
  <Flex
    sx={{
      color: "textMuted",
      flexWrap: "wrap",
      alignItems: "center",
      fontSize: 0,
    }}
  >
    <span>
      <FontAwesomeIcon title="Date written" icon={faPencilAlt} sx={{ mr: 1 }} />{" "}
      {day}, {year}
    </span>
    <InfoSep />
    {updatedDay ? (
      <React.Fragment>
        <FontAwesomeIcon title="Date updated" icon={faEdit} sx={{ mr: 1 }} />{" "}
        Last updated: {updatedDay}, {updatedYear}
        <InfoSep />
      </React.Fragment>
    ) : null}
    <FontAwesomeIcon title="Filed under" icon={faTag} sx={{ mr: 1 }} />{" "}
    <AreaButton area={area} cat={cat} />
  </Flex>
)

export const Post = ({ mdx }) => {
  const { body, frontmatter, tableOfContents } = mdx
  const { title, draft, archive } = frontmatter
  const { area } = frontmatter

  return (
    <Box>
      <Styled.h1 sx={{ mt: 0 }}>{title}</Styled.h1>

      <PostInfo {...frontmatter} />

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
            maxWidth: [null, null, "40%", "40%"],
            display: "inline-block",
            float: [null, null, "left", "left"],
            mr: [0, 0, 4, 4],
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

const PageTemplate = ({ data: { mdx }, children }) => {
  const { frontmatter } = mdx

  return (
    <Layout frontmatter={frontmatter}>
      <ContentBox>
        <Post mdx={mdx} />
        {children}
      </ContentBox>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  fragment page on Mdx {
    body
    tableOfContents
    ...frontmatter
  }

  query($id: String) {
    mdx(id: { eq: $id }) {
      ...page
    }
  }
`

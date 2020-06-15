import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import emoji from "node-emoji"
/** @jsx jsx */
import { jsx, Styled, Flex, Box } from "theme-ui"

import Layout from "../components/layout"
import Tags from "../components/tags"
import { Info, Warn } from "../components/hint"
import TableOfContents from "../components/toc"
import shortcodes from "../components/shortcodes"

export const PostInfo = ({ tags, createdMs, updatedMs }) => (
  <Flex
    sx={{
      color: "secondary",
      fontSize: 0,
      flexWrap: "wrap",
      alignItems: "center",
    }}
  >
    {createdMs
      ? `${emoji.get(":writing_hand:")} ${new Date(createdMs).toDateString()}`
      : null}
    {updatedMs ? ` (Updated: ${new Date(updatedMs).toDateString()})` : null}
    {tags.length ? (
      <Styled.hr
        sx={{
          width: "1px",
          height: "2em",
          display: "inline-block",
          m: "0 0.5em",
        }}
      />
    ) : null}
    {tags.length ? emoji.get(":label:") : null}
    <Tags tags={tags} />
  </Flex>
)

const BlogPageTemplate = ({ data: { mdx } }) => {
  const { body, frontmatter, fields, tableOfContents } = mdx
  const { title, tags, archive, draft } = frontmatter
  const { createdMs, updatedMs } = fields

  return (
    <Layout
      frontmatter={{ ...frontmatter, createdMs, title: `${title} - Blog` }}
    >
      <Flex>
        <Box
          sx={{
            p: "1em",
            m: "0 auto",
            maxWidth: ["100%", "100%", "50rem", "50rem"],
          }}
        >
          <Styled.h1>{title}</Styled.h1>

          <PostInfo tags={tags} createdMs={createdMs} updatedMs={updatedMs} />

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
        tags
        slug
        archive
        draft
      }
      fields {
        createdMs
        updatedMs
      }
    }
  }
`

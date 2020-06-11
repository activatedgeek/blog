import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
/** @jsx jsx */
import { jsx, Styled, Flex, Box } from "theme-ui"

import Layout from "../components/layout"
import TableOfContents from "../components/toc"
import shortcodes from "../components/shortcodes"
import KBList from "../components/kb_list"
import { PostInfo } from "./post"


const KBPageTemplate = ({ data: { mdx } }) => {
  const { body, frontmatter, fields, tableOfContents } = mdx
  const { title, tags } = frontmatter
  const { createdMs } = fields

  return (
    <Layout frontmatter={{ ...frontmatter, createdMs, title: `${title} - KB` }}>
      <Flex>
        <Box
          sx={{
            bg: "gray.1",
            overflow: "auto",
            display: ["none", "none", "block", "block"],
          }}
        >
          <KBList />
        </Box>
        <Box
          sx={{
            p: "1em",
            m: "0 auto",
            maxWidth: ["100%", "100%", "50rem", "50rem"],
          }}
        >
          <Styled.h1>{title}</Styled.h1>

          <PostInfo tags={tags} createdMs={createdMs} />

          <Styled.hr />

          {tableOfContents.items ? (
            <Box sx={{ display: ["block", "block", "none", "none"] }}>
              <TableOfContents toc={tableOfContents} />
              <Styled.hr />
            </Box>
          ) : null}

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

export default KBPageTemplate

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
      }
      fields {
        createdMs
      }
    }
  }
`
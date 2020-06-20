/** @jsx jsx */

import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { jsx, Styled, Flex, Box } from "theme-ui"

import Layout from "../components/layout"
import TableOfContents from "../components/toc"
import shortcodes from "../components/shortcodes"
import KBList from "../components/kb_list"
import { PostInfo } from "./post"

const KBPageTemplate = ({
  data: {
    mdx,
    allMdx: { edges },
  },
}) => {
  const { body, frontmatter, tableOfContents } = mdx
  const { title } = frontmatter

  return (
    <Layout frontmatter={{ ...frontmatter, title: `${title} - KB` }}>
      <Flex>
        <Box
          sx={{
            bg: "gray.1",
            overflow: "auto",
            display: ["none", "none", "block", "block"],
          }}
        >
          <KBList edges={edges} />
        </Box>
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
    allMdx(
      filter: {
        frontmatter: { category: { in: "kb" } }
      }
      sort: { order: ASC, fields: frontmatter___title }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            label
          }
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      body
      tableOfContents
      frontmatter {
        title
        date
        updated
        description
        tags
        slug
      }
    }
  }
`

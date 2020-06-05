import React from "react" // eslint-disable-line no-unused-vars
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import emoji from "node-emoji"
/** @jsx jsx */
import { jsx, Styled, Flex } from "theme-ui"

import Layout from "../components/layout"
import TableOfContents from "../components/toc"
import shortcodes from "../components/shortcodes"

const BlogPageTemplate = ({ data: { mdx } }) => {
  const { body, frontmatter, timeToRead, tableOfContents } = mdx
  const { title, tags, createdMs, archive } = frontmatter

  return (
    <Layout frontmatter={frontmatter}>
      <Styled.h1>{title}</Styled.h1>

      <Flex
        sx={{
          color: "secondary",
          fontSize: 0,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {emoji.get(":writing_hand:")}
        {`   ${new Date(createdMs).toDateString()}`}
        <Styled.hr
          sx={{
            width: "1px",
            height: "2em",
            display: "inline-block",
            m: "0 0.5em",
          }}
        />
        {emoji.get(":hourglass_flowing_sand:")}
        {`   ${timeToRead}`} min
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
        {tags.map((t, k) => (
          <Styled.a
            key={k}
            as={Link}
            to={`/blog/tags/${encodeURIComponent(t)}`}
            sx={{ "&:hover": { textDecoration: "none" } }}
          >
            <span
              sx={{
                m: "0.25em",
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
      </Flex>

      <Styled.hr />

      {archive ? (
        <Styled.p
          display="flex"
          alignItems="center"
          sx={{ bg: "yellow.2", p: "1em" }}
        >
          <FontAwesomeIcon icon={faExclamationTriangle} /> This post is
          archived. Some content may be out of date or render incorrectly.
        </Styled.p>
      ) : null}

      {tableOfContents.items ? <TableOfContents toc={tableOfContents} /> : null}

      <MDXProvider components={shortcodes}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      timeToRead
      tableOfContents
      frontmatter {
        title
        description
        tags
        slug
        createdMs
        archive
      }
    }
  }
`

import React from "react" // eslint-disable-line no-unused-vars
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import emoji from "node-emoji"
/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

import Layout from "../components/layout"
import shortcodes from "../components/shortcodes"

const BlogPageTemplate = ({ data: { mdx } }) => {
  const { body, frontmatter, timeToRead } = mdx
  const { title, tags, createdMs, archive } = frontmatter

  return (
    <Layout frontmatter={frontmatter}>
      {archive ? (
        <div
          sx={{
            bg: "yellow.3",
            width: "100vw",
            left: "50%",
            ml: "-50vw",
            mt: "-3em",
            position: "relative",
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon icon={faExclamationTriangle} /> This post is
          archived. Some content may render incorrectly.
        </div>
      ) : null}
      <Styled.h1>{title}</Styled.h1>
      <div
        sx={{
          color: "secondary",
          display: "flex",
          alignItems: "center",
          fontSize: 0,
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
      </div>
      <Styled.hr />
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

import React from "react" // eslint-disable-line no-unused-vars
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

import Layout from "../components/layout"
import shortcodes from "../components/shortcodes"

const BlogPageTemplate = ({ data: { mdx } }) => {
  const { body, frontmatter } = mdx
  const { title, description, tags, slug, createdMs, archive } = frontmatter

  let archiveDiv
  if (archive === true) {
    archiveDiv = (
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
        <FontAwesomeIcon icon={faExclamationTriangle} /> This post is archived.
        Some text may be inaccurate or content may not render!
      </div>
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={`https://www.sanyamkapoor.com${slug}`} />
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta
          property="article:published_time"
          content={new Date(createdMs).toISOString()}
        />
        <meta property="article:tag" content={(tags || []).join(", ")} />
        <meta
          property="og:url"
          content={`https://www.sanyamkapoor.com${slug}`}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          name="twitter:url"
          content={`https://www.sanyamkapoor.com${slug}`}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      {archiveDiv}
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
      <Styled.hr />
      <p sx={{ color: "secondary" }}>
        {tags.length ? "Tags:" : ""}
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
      </p>
      <p sx={{ color: "secondary" }}>
        Created: {new Date(createdMs).toDateString()}
      </p>
    </Layout>
  )
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
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

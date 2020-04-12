import React from "react" // eslint-disable-line no-unused-vars
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
/** @jsx jsx */
import { jsx } from "theme-ui"

import Layout from "./layout"
import shortcodes from "./shortcodes"

const BlogPageTemplate = ({ data: { mdx } }) => {
  const { body, frontmatter, fields } = mdx
  const { createdMs, modifiedMs } = fields

  let staleDiv
  if (frontmatter.stale === true) {
    staleDiv = (
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
        <FontAwesomeIcon icon={faExclamationTriangle} /> This is an old post.
        Some text may be inaccurate or content may not render!
      </div>
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title}</title>
        <link
          rel="canonical"
          href={`https://www.sanyamkapoor.com${fields.slug}`}
        />
        <meta name="description" content={frontmatter.description} />
        <meta property="og:type" content="article" />
        <meta
          property="article:published_time"
          content={new Date(createdMs).toISOString()}
        />
        <meta
          property="article:modified_time"
          content={new Date(modifiedMs).toISOString()}
        />
        <meta
          property="article:modified_time"
          content={new Date(modifiedMs).toISOString()}
        />
        <meta
          property="article:tag"
          content={(frontmatter.tags || []).join(", ")}
        />
        <meta
          property="og:url"
          content={`https://www.sanyamkapoor.com${fields.slug}`}
        />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta
          name="twitter:url"
          content={`https://www.sanyamkapoor.com${fields.slug}`}
        />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
      </Helmet>
      {staleDiv}
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
      <p sx={{ color: "secondary" }}>
        Created: {new Date(createdMs).toDateString()}; Last Modified:{" "}
        {new Date(modifiedMs).toDateString()}
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
        stale
      }
      fields {
        slug
        createdMs
        modifiedMs
      }
    }
  }
`

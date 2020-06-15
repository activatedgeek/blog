import React from "react"
import { Helmet } from "react-helmet"
import { graphql, StaticQuery } from "gatsby"

const Head = ({ siteMetadata, frontmatter }) => {
  const allMeta = { ...siteMetadata, ...frontmatter }
  const {
    name,
    title,
    social,
    author,
    slug,
    description,
    createdMs,
    tags,
  } = allMeta

  return (
    <Helmet>
      <title>
        {title ? `${title} | ` : ""}
        {name}
      </title>

      <link rel="canonical" href={`https://www.sanyamkapoor.com${slug}`} />

      <meta name="description" content={description} />

      <meta property="og:type" content="article" />
      <meta property="article:tag" content={(tags || []).join(", ")} />
      {createdMs ? (
        <meta
          property="article:published_time"
          content={new Date(createdMs).toISOString()}
        />
      ) : null}

      <meta property="article:author" content={author} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={`https://www.sanyamkapoor.com${slug}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:site" content={author} />
      <meta name="twitter:creator" content={social.twitter} />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:url"
        content={`https://www.sanyamkapoor.com${slug}`}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

export default ({ frontmatter }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            name
            description
            author
            menu {
              label
              url
            }
            extMenu {
              label
              url
            }
            social {
              scholar
              github
              yc
              linkedin
              stackoverflow
              twitter
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata } }) => (
      <Head siteMetadata={siteMetadata} frontmatter={frontmatter} />
    )}
  />
)

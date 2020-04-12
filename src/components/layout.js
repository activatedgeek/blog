import React from "react" // eslint-disable-line no-unused-vars
import { Helmet } from "react-helmet"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Flex, Box } from "rebass"
/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

export default ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            author
            menu {
              label
              url
            }
          }
        }
      }
    `
  )

  const { title, menu, author } = site.siteMetadata

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={title} />
        <meta property="article:author" content="" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={author} />
        <meta name="twitter:creator" content={author} />
      </Helmet>
      <Flex alignItems="center" p="0 2%" bg="muted">
        <h1 sx={{ fontWeight: "medium" }}>
          <Styled.a
            as={Link}
            to="/"
            sx={{
              textDecoration: "none",
              ":visited,:hover,:active": {
                textDecoration: "inherit",
              },
            }}
          >
            {title}
          </Styled.a>
          {/* <Link to="/" className={layout.link}>{title}</Link> */}
        </h1>
        <Flex justifyContent="flex-end" flexGrow={1} flexWrap="wrap">
          {menu.map(({ label, url }, i) => (
            <h4 key={i} sx={{ fontWeight: "normal", m: "0 0.5em" }}>
              <Styled.a
                as={Link}
                to={url}
                sx={{
                  color: "secondary",
                  textDecoration: "none",
                  ":visited,:hover,:active": {
                    textDecoration: "inherit",
                  },
                }}
              >
                {label}
              </Styled.a>
            </h4>
          ))}
        </Flex>
      </Flex>
      <Box sx={{ maxWidth: "50rem", m: "auto", p: "0 2%" }}>{children}</Box>
    </>
  )
}

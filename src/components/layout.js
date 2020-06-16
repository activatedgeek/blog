import React from "react" // eslint-disable-line no-unused-vars
import { graphql, StaticQuery } from "gatsby"
import { Flex } from "theme-ui"

import Head from "./head"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ children, frontmatter, siteMetadata }) => {
  const { name, menu, extMenu, social } = siteMetadata

  return (
    <>
      <Head frontmatter={frontmatter} />
      <Flex sx={{ minHeight: "100vh", flexDirection: "column" }}>
        <Header name={name} menu={menu} extMenu={extMenu} />

        {children}

        <Footer name={name} social={social} />
      </Flex>
    </>
  )
}

export default ({ children, frontmatter }) => (
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
      <Layout frontmatter={frontmatter} siteMetadata={siteMetadata}>
        {children}
      </Layout>
    )}
  />
)

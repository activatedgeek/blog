import React from "react" // eslint-disable-line no-unused-vars
import { graphql, useStaticQuery } from "gatsby"
import { Flex } from "rebass"

import Head from "./head"
import Header from "./header"
import Footer from "./footer"

export default ({ children, frontmatter }) => {
  const { site } = useStaticQuery(
    graphql`
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
    `
  )

  const { name, menu, extMenu, social } = site.siteMetadata

  return (
    <>
      <Head frontmatter={frontmatter} />
      <Flex minHeight="100vh" flexDirection="column">
        <Header name={name} menu={menu} extMenu={extMenu} />

        {children}

        <Footer name={name} social={social} />
      </Flex>
    </>
  )
}

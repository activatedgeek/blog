import React from "react" // eslint-disable-line no-unused-vars
import { Link, graphql, useStaticQuery } from "gatsby"
import { Flex, Box } from "rebass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faYCombinator,
  faLinkedin,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

import Head from "./head"

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

  const iconStyle = { margin: "0 0.2em", fontSize: 3 }

  return (
    <>
      <Head frontmatter={frontmatter} />
      <Flex minHeight="100vh" flexDirection="column">
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
              {name}
            </Styled.a>
          </h1>
          <Flex justifyContent="flex-end" flexGrow={1} flexWrap="wrap">
            {extMenu.map(({ label, url }, i) => (
              <h4
                key={i}
                sx={{ fontWeight: "normal", m: "0 0.5em" }}
                style={{ fontSize: "1em" }}
              >
                <Styled.a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
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
            {menu.map(({ label, url }, i) => (
              <h4 key={i} sx={{ fontWeight: "normal", m: "0 0.5em" }}>
                <Styled.a
                  as={Link}
                  to={url}
                  sx={{
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
        <Box
          minWidth={[null, null, "50rem", "50rem"]}
          maxWidth={["100vw", "100vw", "50rem", "50rem"]}
          m="auto"
          p="3em 2%"
        >
          {children}
        </Box>
        <Flex alignItems="center" flexDirection="column" p="2em 2%" bg="muted">
          <Flex w="100vw" m="0.5em 0">
            <Styled.a as={Link} to="/" sx={{ m: "0 1em" }}>
              Home
            </Styled.a>
            <Styled.a as={Link} to="/blog" sx={{ m: "0 1em" }}>
              Blog
            </Styled.a>
            <Styled.a as={Link} to="/blog/tags" sx={{ m: "0 1em" }}>
              Tags
            </Styled.a>
          </Flex>
          <Flex w="100vw" m="0.5em 0">
            <Styled.a
              href={social.scholar}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faUserGraduate} sx={iconStyle} />
            </Styled.a>
            <Styled.a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} sx={iconStyle} />
            </Styled.a>
            <Styled.a
              href={social.yc}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faYCombinator} sx={iconStyle} />
            </Styled.a>
            <Styled.a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} sx={iconStyle} />
            </Styled.a>
            <Styled.a
              href={social.stackoverflow}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faStackOverflow} sx={iconStyle} />
            </Styled.a>
            <Styled.a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} sx={iconStyle} />
            </Styled.a>
          </Flex>
          <Styled.p
            sx={{
              fontSize: 0,
              m: "0.5em 0",
              color: "secondary",
              fontWeight: "light",
            }}
            mt={0}
          >
            © {new Date().getFullYear()} {name}
          </Styled.p>
        </Flex>
      </Flex>
    </>
  )
}

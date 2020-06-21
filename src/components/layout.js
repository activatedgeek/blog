/** @jsx jsx */

import React, { useState } from "react" // eslint-disable-line no-unused-vars
import Helmet from "react-helmet"
import { graphql, Link, StaticQuery } from "gatsby"
import { navigate } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGraduate, faRss } from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faYCombinator,
  faLinkedin,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { jsx, Styled, Flex, Input, Box } from "theme-ui"

const Head = ({ siteMetadata, frontmatter }) => {
  const allMeta = { ...siteMetadata, ...frontmatter }
  const {
    name,
    siteUrl,
    title,
    social,
    author,
    slug,
    description,
    date,
    tags,
  } = allMeta

  return (
    <Helmet>
      <title>
        {title ? `${title} | ` : ""}
        {name}
      </title>

      <link rel="canonical" href={`${siteUrl}${slug}`} />

      {description ? <meta name="description" content={description} /> : null}

      <meta property="og:type" content="article" />
      <meta property="article:tag" content={(tags || []).join(", ")} />
      {date ? <meta property="article:published_time" content={date} /> : null}

      <meta property="article:author" content={author} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={`${siteUrl}${slug}`} />
      <meta property="og:title" content={title} />
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}

      <meta name="twitter:site" content={author} />
      <meta name="twitter:creator" content={social.twitter} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={`${siteUrl}${slug}`} />
      <meta name="twitter:title" content={title} />
      {description ? (
        <meta name="twitter:description" content={description} />
      ) : null}
    </Helmet>
  )
}

const Header = () => (
  <Box>
    <Box
      sx={{
        display: "inline-block",
        position: "sticky",
        top: 3,
        bg: "gray.9",
        px: 3,
      }}
    >
      <Styled.a
        as={Link}
        to="/"
        sx={{
          ":visited,:hover,:active": {
            textDecoration: "none",
          },
        }}
      >
        <Styled.h1 sx={{ color: "gray.1" }}>SK</Styled.h1>
      </Styled.a>
    </Box>
  </Box>
)

export const SearchBar = ({ inputSx }) => {
  const [query, setQuery] = useState("")

  return (
    <Flex
      as="form"
      onSubmit={e => {
        e.preventDefault()
        setQuery(query)
        navigate(`/search?q=${encodeURIComponent(query)}`)
      }}
      sx={{ alignItems: "center", color: "gray.1" }}
    >
      <Input
        name="query"
        value={query}
        placeholder="Search"
        sx={{
          width: "64",
          p: 1,
          textAlign: "center",
          borderColor: "gray.5",
          borderRadius: "lg",
          mx: "auto",
          ...inputSx,
        }}
        onChange={e => setQuery(e.target.value)}
      />
    </Flex>
  )
}

const MenuLink = ({ url, external, children }) => (
  <Styled.p sx={{ display: "inline-block", my: 1 }}>
    <Styled.a
      as={external ? null : Link}
      target={external ? "_blank" : null}
      rel={external ? "noopener noreferrer" : null}
      to={external ? null : url}
      href={external ? url : null}
      sx={{
        color: "gray.5",
        textDecoration: "none",
        ":visited,:hover,:active": {
          textDecoration: "inherit",
        },
        ":hover": {
          color: "gray.1",
        },
      }}
    >
      {children}
    </Styled.a>
  </Styled.p>
)

const Footer = ({ name, social, menu, extMenu }) => {
  const iconStyle = {
    mx: 1,
    fontSize: 2,
    color: "gray.5",
    ":hover": { color: "gray.1" },
  }
  return (
    <Flex
      sx={{
        width: "screenWidth",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        py: 3,
        bg: "gray.9",
        mt: "auto",
      }}
    >
      <SearchBar
        inputSx={{
          "&:hover": { borderColor: "gray.3" },
          "&:focus": { outline: "none", borderColor: "gray.1" },
        }}
      />
      <Flex sx={{ flexWrap: "wrap", justifyContent: "center" }}>
        {menu.map(({ label, url }, i) => (
          <MenuLink key={i} url={url}>
            <span sx={{ mx: 2 }}>{label}</span>
          </MenuLink>
        ))}
        {extMenu.map(({ label, url }, i) => (
          <MenuLink key={i} url={url} external>
            <span sx={{ mx: 2 }}>{label}</span>
          </MenuLink>
        ))}
      </Flex>
      <Flex>
        <MenuLink url={social.scholar} external>
          <FontAwesomeIcon icon={faUserGraduate} sx={iconStyle} />
        </MenuLink>
        <MenuLink url={social.github} external>
          <FontAwesomeIcon icon={faGithub} sx={iconStyle} />
        </MenuLink>
        <MenuLink url={social.yc} external>
          <FontAwesomeIcon icon={faYCombinator} sx={iconStyle} />
        </MenuLink>
        <MenuLink url={social.linkedin} external>
          <FontAwesomeIcon icon={faLinkedin} sx={iconStyle} />
        </MenuLink>
        <MenuLink url={social.stackoverflow} external>
          <FontAwesomeIcon icon={faStackOverflow} sx={iconStyle} />
        </MenuLink>
        <MenuLink url={social.twitter} external>
          <FontAwesomeIcon icon={faTwitter} sx={iconStyle} />
        </MenuLink>
        <MenuLink url="/rss/blog.xml" external>
          <FontAwesomeIcon icon={faRss} sx={iconStyle} />
        </MenuLink>
      </Flex>
      <Styled.p
        sx={{
          my: 1,
          color: "gray.7",
          fontWeight: "light",
          mb: 0,
        }}
      >
        © {new Date().getFullYear()} {name}
      </Styled.p>
    </Flex>
  )
}

export default ({ children, frontmatter }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            name
            siteUrl
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
    render={({ site: { siteMetadata } }) => {
      const { name, menu, extMenu, social } = siteMetadata

      return (
        <>
          <Head siteMetadata={siteMetadata} frontmatter={frontmatter} />
          <Flex sx={{ flexDirection: "column", minHeight: "screenHeight" }}>
            <Flex sx={{ flexDirection: ["column", "column", "row", "row"] }}>
              <Header />
              {children}
            </Flex>
            <Footer name={name} menu={menu} extMenu={extMenu} social={social} />
          </Flex>
        </>
      )
    }}
  />
)

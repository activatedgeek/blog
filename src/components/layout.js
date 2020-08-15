/** @jsx jsx */

import React, { useState } from "react" // eslint-disable-line no-unused-vars
import Helmet from "react-helmet"
import { graphql, Link, StaticQuery } from "gatsby"
import { navigate } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserGraduate,
  faHome,
  faBrain,
  faSearch,
  faWineBottle,
  faCode,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faYCombinator,
  faLinkedin,
  faStackOverflow,
  faTwitter,
  faReddit,
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

const HeaderMenuItem = ({ url, children, external }) => (
  <Styled.a
    as={external ? null : Link}
    target={external ? "_blank" : null}
    rel={external ? "noopener noreferrer" : null}
    to={external ? null : url}
    href={external ? url : null}
    sx={{
      ":visited,:hover,:active": {
        textDecoration: "none",
      },
    }}
  >
    <Styled.p
      sx={{
        my: 1,
        p: 2,
        color: "textMuted",
        borderRadius: "lg",
        ":hover": {
          bg: "primary",
          color: "light",
          boxShadow: "xl",
        },
      }}
    >
      {children}
    </Styled.p>
  </Styled.a>
)

const Header = () => {
  return (
    <Flex
      sx={{
        // position: ["inherit", "inherit", "fixed", "fixed"],
        position: "absolute",
        top: 0,
        right: 0,
        opacity: 0.8,
        ":hover": {
          opacity: 1,
        },
      }}
    >
      <Flex
        sx={{
          bg: "primary",
          p: 3,
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "default",
        }}
      >
        <Styled.a
          as={Link}
          to="/"
          sx={{
            ":visited,:hover,:active": {
              textDecoration: "none",
            },
            color: "light",
          }}
        >
          <Styled.h3>SK</Styled.h3>
        </Styled.a>
      </Flex>
    </Flex>
  )
}

export const InfoSep = ({ customSx }) => (
  <Styled.hr
    sx={{
      width: "px",
      height: 5,
      display: "inline-block",
      mx: 2,
      my: 0,
      ...customSx,
    }}
  />
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
    >
      <Input
        name="query"
        value={query}
        placeholder="Search"
        sx={{
          p: 1,
          textAlign: "center",
          borderColor: "muted",
          borderRadius: "md",
          ":focus": {
            outline: "none",
          },
          ...inputSx,
        }}
        onChange={e => setQuery(e.target.value)}
      />
    </Flex>
  )
}

const IconLink = ({ url, external, children, icon }) => (
  <Box>
    <Styled.a
      as={external ? null : Link}
      target={external ? "_blank" : null}
      rel={external ? "noopener noreferrer" : null}
      to={external ? null : url}
      href={external ? url : null}
      sx={{
        textDecoration: "none",
        ":visited,:active,:hover": {
          textDecoration: "inherit",
        },
      }}
    >
      {children}
      <FontAwesomeIcon
        icon={icon}
        sx={{
          mx: 1,
          fontSize: 2,
          color: "textMuted",
          ":hover": {
            color: "primary",
          },
        }}
        fixedWidth
      />
    </Styled.a>
  </Box>
)

const Footer = ({ name, social }) => {
  // const [colorMode, setColorMode] = useColorMode("default")

  return (
    <Flex
      id="footer"
      sx={{
        width: "screenWidth",
        flexDirection: "column",
        justifyContent: "center",
        pb: 3,
      }}
    >
      <Styled.hr sx={{ m: 0 }} />
      <Flex sx={{ justifyContent: "center", flexWrap: "wrap" }}>
        <HeaderMenuItem url="/">
          <FontAwesomeIcon icon={faHome} sx={{ mr: 1 }} fixedWidth /> Home
        </HeaderMenuItem>
        <HeaderMenuItem url="/search">
          <FontAwesomeIcon icon={faSearch} sx={{ mr: 1 }} fixedWidth /> Search
        </HeaderMenuItem>
        <HeaderMenuItem url="/kb">
          <FontAwesomeIcon icon={faBrain} sx={{ mr: 1 }} fixedWidth /> Knowledge
          Base
        </HeaderMenuItem>
        <HeaderMenuItem url="/db">
          <FontAwesomeIcon icon={faDatabase} sx={{ mr: 1 }} fixedWidth /> DB
        </HeaderMenuItem>
        <HeaderMenuItem url="https://wine.sanyamkapoor.com" external>
          <FontAwesomeIcon icon={faWineBottle} sx={{ mr: 1 }} fixedWidth /> Wine
          Map
        </HeaderMenuItem>
        <HeaderMenuItem url={`${social.github}/www`} external>
          <FontAwesomeIcon icon={faCode} sx={{ mr: 1 }} fixedWidth /> Source
        </HeaderMenuItem>
        {/* <FontAwesomeIcon
          icon={colorMode === "default" ? faMoon : faSun}
          title="Toggle Dark Mode"
          sx={{
            mx: 1,
            // fontSize: 2,
            color: "textMuted",
            cursor: "pointer",
          }}
          fixedWidth
          onClick={e => {
            e.preventDefault()
            setColorMode(colorMode === "default" ? "dark" : "default")
          }}
        /> */}
      </Flex>

      <Flex sx={{ justifyContent: "center", mt: 2 }}>
        <IconLink url={social.scholar} icon={faUserGraduate} external />
        <IconLink url={social.github} icon={faGithub} external />
        <IconLink url={social.yc} icon={faYCombinator} external />
        <IconLink url={social.linkedin} icon={faLinkedin} external />
        <IconLink url={social.stackoverflow} icon={faStackOverflow} external />
        <IconLink url={social.twitter} icon={faTwitter} external />
        <IconLink url={social.reddit} icon={faReddit} external />
      </Flex>
      <Styled.p
        sx={{
          color: "textMuted",
          fontWeight: "light",
          mb: 0,
          mt: 2,
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} {name}
      </Styled.p>
    </Flex>
  )
}

export const ContentBox = ({ children, style }) => (
  <Box
    sx={{
      px: 4,
      my: 4,
      mx: "auto",
      width: ["100%", "100%", "3xl", "3xl"],
      flex: 1,
      ...style,
    }}
  >
    {children}
  </Box>
)

const Layout = ({ children, frontmatter, showHeader, showFooter }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            name
            siteUrl
            description
            author
            social {
              scholar
              github
              yc
              linkedin
              stackoverflow
              twitter
              reddit
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata } }) => {
      const { name, social } = siteMetadata

      return (
        <>
          <Head siteMetadata={siteMetadata} frontmatter={frontmatter} />
          <Flex sx={{ flexDirection: "column", minHeight: "screenHeight" }}>
            {showHeader ? <Header siteMetadata={siteMetadata} /> : null}
            {children}
            {showFooter ? <Footer name={name} social={social} /> : null}
          </Flex>
        </>
      )
    }}
  />
)

Layout.defaultProps = {
  showHeader: true,
  showFooter: true,
}

export default Layout

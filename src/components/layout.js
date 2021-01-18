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
  faCode,
  faDatabase,
  faRss,
} from "@fortawesome/free-solid-svg-icons"
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
    area,
    cat,
    social,
    author,
    slug,
    description,
    date,
    updated,
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
      <meta property="article:tag" content={`${area}, ${cat}`} />
      {date ? <meta property="article:published_time" content={date} /> : null}
      {updated ? (
        <meta property="article:modified_time" content={updated} />
      ) : null}

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

const HeaderMenuItem = ({ url, color, children, external }) => (
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
      my: 1,
    }}
  >
    <span
      sx={{
        py: 1,
        px: 3,
        color: "textMuted",
        borderRadius: "lg",
        ":hover": {
          // bg: "primary",
          color,
          // boxShadow: "md",
        },
      }}
    >
      {children}
    </span>
  </Styled.a>
)

const Header = () => {
  return (
    <Flex
      sx={{
        width: "screenWidth",
        position: ["inherit", "inherit", "fixed", "fixed"],
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <Flex
        sx={{
          position: "relative",
          justifyContent: "center",
          width: ["100%", "100%", "3xl", "3xl"],
          height: ["auto", "auto", "4em", "4em"],
          top: 0,
          left: 0,
          background: "white",
          borderBottomWidth: "px",
          borderBottomStyle: "solid",
          borderBottomColor: "muted",
          p: 2,
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
          <Box
            sx={{
              position: "absolute",
              display: ["none", "none", "inherit", "inherit"],
              left: "-5%",
              top: 0,
              backgroundImage: "url(/images/sk.svg)",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              p: 3,
              alignItems: "center",
              justifyContent: "center",
              height: "5em",
              width: "5em",
            }}
          />
        </Styled.a>
        <Flex
          sx={{
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <HeaderMenuItem url="/" color="primary">
            <FontAwesomeIcon icon={faHome} fixedWidth /> Home
          </HeaderMenuItem>
          <HeaderMenuItem url="/kb" color="pink.4">
            <FontAwesomeIcon icon={faBrain} fixedWidth /> Knowledge Bayes
          </HeaderMenuItem>
          <HeaderMenuItem url="/search" color="green.5">
            <FontAwesomeIcon icon={faSearch} fixedWidth /> Search
          </HeaderMenuItem>
          <HeaderMenuItem url="/rss.xml" color="orange.5" external>
            <FontAwesomeIcon icon={faRss} fixedWidth /> RSS
          </HeaderMenuItem>
        </Flex>
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

const IconLink = ({ url, external, children, icon, color }) => (
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
            color,
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
        py: 3,
        borderTopWidth: "px",
        borderTopStyle: "solid",
        borderTopColor: "muted",
      }}
    >
      <Flex sx={{ justifyContent: "center", flexWrap: "wrap" }}>
        <HeaderMenuItem url="/" color="primary">
          <FontAwesomeIcon icon={faHome} fixedWidth /> Home
        </HeaderMenuItem>
        <HeaderMenuItem url="/kb" color="pink.4">
          <FontAwesomeIcon icon={faBrain} fixedWidth /> kB
        </HeaderMenuItem>
        <HeaderMenuItem url="/search" color="green.5">
          <FontAwesomeIcon icon={faSearch} fixedWidth /> Search
        </HeaderMenuItem>
        <HeaderMenuItem url="/rss.xml" color="orange.5" external>
          <FontAwesomeIcon icon={faRss} fixedWidth /> RSS
        </HeaderMenuItem>
        <HeaderMenuItem url="/db" color="teal.4">
          <FontAwesomeIcon icon={faDatabase} fixedWidth /> dB
        </HeaderMenuItem>
        <HeaderMenuItem url={`${social.github}/www`} color="indigo.4" external>
          <FontAwesomeIcon icon={faCode} fixedWidth /> Source
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

      <Flex sx={{ justifyContent: "center", mt: 3 }}>
        <IconLink
          url={social.scholar}
          icon={faUserGraduate}
          color="rgb(239,202,77)"
          external
        />
        <IconLink
          url={social.github}
          icon={faGithub}
          color="rgb(27,31,35)"
          external
        />
        <IconLink
          url={social.yc}
          icon={faYCombinator}
          color="rgb(251,78,9)"
          external
        />
        <IconLink
          url={social.linkedin}
          icon={faLinkedin}
          color="rgb(14,79,180)"
          external
        />
        <IconLink
          url={social.stackoverflow}
          icon={faStackOverflow}
          color="rgb(239,107,29)"
          external
        />
        <IconLink
          url={social.twitter}
          icon={faTwitter}
          color="rgb(29,142,238)"
          external
        />
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
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata } }) => {
      const { author, social } = siteMetadata

      return (
        <>
          <Head siteMetadata={siteMetadata} frontmatter={frontmatter} />
          <Flex sx={{ flexDirection: "column", minHeight: "screenHeight" }}>
            {showHeader ? <Header siteMetadata={siteMetadata} /> : null}
            <Box sx={{ mt: [0, 0, "4em", "4em"] }}>{children}</Box>
            {showFooter ? <Footer name={author} social={social} /> : null}
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

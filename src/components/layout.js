/** @jsx jsx */

import React, { useState } from "react" // eslint-disable-line no-unused-vars
import Helmet from "react-helmet"
import { graphql, Link, StaticQuery } from "gatsby"
import { navigate } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserGraduate,
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
        color: "hero.lighttext",
        borderRadius: "lg",
        ":hover": {
          bg: "menu.hover.bg",
          color: "hero.text",
          cursor: "pointer",
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
        bg: "hero.bg",
        width: "screenWidth",
        boxShadow: "default",
      }}
    >
      <Flex
        sx={{
          p: 3,
          alignItems: "center",
          justifyContent: "center",
          borderRightColor: "hero.lighttext",
          borderRightWidth: 1,
          borderRightStyle: "solid",
        }}
      >
        <Styled.a
          as={Link}
          to="/"
          sx={{
            ":visited,:hover,:active": {
              textDecoration: "none",
            },
            color: "hero.text",
          }}
        >
          <Styled.h2>SK</Styled.h2>
        </Styled.a>
      </Flex>
      <Flex
        sx={{
          ml: "auto",
          px: 3,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <HeaderMenuItem url="/search">
          <FontAwesomeIcon icon={faSearch} sx={{ mr: 1 }} fixedWidth /> Search
        </HeaderMenuItem>
        <HeaderMenuItem url="/kb">
          <FontAwesomeIcon icon={faBrain} sx={{ mr: 1 }} fixedWidth /> KB
        </HeaderMenuItem>
        <HeaderMenuItem url="https://wine.sanyamkapoor.com" external>
          <FontAwesomeIcon icon={faWineBottle} sx={{ mr: 1 }} fixedWidth /> Wine
          Map
        </HeaderMenuItem>
      </Flex>
    </Flex>
  )
}

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
          borderColor: "search.border",
          borderRadius: "lg",
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
          color: "hero.graytext",
          ":hover": {
            color: "hero.bg",
          },
        }}
        fixedWidth
      />
    </Styled.a>
  </Box>
)

const Footer = ({ name, social }) => {
  return (
    <Flex
      sx={{
        width: "screenWidth",
        flexDirection: "column",
        justifyContent: "center",
        mt: "auto",
        p: 4,
      }}
    >
      <Styled.hr sx={{ mt: 0 }} />
      <Flex sx={{ justifyContent: "center" }}>
        <IconLink url={social.scholar} icon={faUserGraduate} external />
        <IconLink url={social.github} icon={faGithub} external />
        <IconLink url={social.yc} icon={faYCombinator} external />
        <IconLink url={social.linkedin} icon={faLinkedin} external />
        <IconLink url={social.stackoverflow} icon={faStackOverflow} external />
        <IconLink url={social.twitter} icon={faTwitter} external />
        <IconLink url={`${social.github}/www`} icon={faCode} external />
        <IconLink url="/everything" icon={faDatabase} external />
      </Flex>
      <Styled.p
        sx={{
          color: "hero.graytext",
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
      p: 4,
      mx: "auto",
      maxWidth: ["100%", "100%", "3xl", "4xl"],
      flex: 1,
      boxShadow: "default",
      ...style,
    }}
  >
    {children}
  </Box>
)

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
      const { name, social } = siteMetadata

      return (
        <>
          <Head siteMetadata={siteMetadata} frontmatter={frontmatter} />
          <Flex sx={{ flexDirection: "column", minHeight: "screenHeight" }}>
            <Header siteMetadata={siteMetadata} />
            {children}
            <Footer name={name} social={social} />
          </Flex>
        </>
      )
    }}
  />
)

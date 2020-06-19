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
import { jsx, Styled, Flex, Input } from "theme-ui"

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
    createdMs,
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
      {createdMs ? (
        <meta
          property="article:published_time"
          content={new Date(createdMs).toISOString()}
        />
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

const Header = ({ name, menu, extMenu }) => (
  <Flex sx={{ alignItems: "center", p: "0 2%", bg: "muted" }}>
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
    <Flex sx={{ justifyContent: "flex-end", flexGrow: 1, flexWrap: "wrap" }}>
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
)

const SearchBar = () => {
  const [query, setQuery] = useState("")

  return (
    <Flex
      as="form"
      onSubmit={e => {
        e.preventDefault()
        setQuery(query)
        navigate(`/search?q=${encodeURIComponent(query)}`)
      }}
      sx={{ alignItems: "center", fontSize: 0 }}
    >
      <Input
        name="query"
        value={query}
        placeholder="Search"
        sx={{
          p: "0.3em",
          textAlign: "center",
          borderColor: "secondary",
          borderRadius: "0.1em",
          "&:focus": { outline: "none" },
        }}
        onChange={e => setQuery(e.target.value)}
      />
    </Flex>
  )
}

const Footer = ({ name, social }) => {
  const iconStyle = { margin: "0 0.2em", fontSize: 3 }
  return (
    <Flex
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        p: "2em 2%",
        bg: "muted",
        mt: "auto",
      }}
    >
      <SearchBar />
      <Flex w="100vw" m="0.5em 0">
        <Styled.a as={Link} to="/blog" sx={{ m: "0 1em" }}>
          Blog
        </Styled.a>
        <Styled.a as={Link} to="/blog/tags" sx={{ m: "0 1em" }}>
          Tags
        </Styled.a>
        <Styled.a as={Link} to="/blog/drafts" sx={{ m: "0 1em" }}>
          Drafts
        </Styled.a>
        <Styled.a as={Link} to="/stack" sx={{ m: "0 1em" }}>
          Stack
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
        <Styled.a href={social.yc} target="_blank" rel="noopener noreferrer">
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
        <Styled.a href="/rss.xml" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faRss} sx={iconStyle} />
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
  )
}

export default ({ children, frontmatter }) => (
  <StaticQuery
    query={graphql`
      {
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
    render={({ site: { siteMetadata } }) => {
      const { name, menu, extMenu, social } = siteMetadata

      return (
        <>
          <Head siteMetadata={siteMetadata} frontmatter={frontmatter} />
          <Flex sx={{ minHeight: "100vh", flexDirection: "column" }}>
            <Header name={name} menu={menu} extMenu={extMenu} />

            {children}

            <Footer name={name} social={social} />
          </Flex>
        </>
      )
    }}
  />
)

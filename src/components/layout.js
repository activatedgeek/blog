/** @jsx jsx */

import React, { useState } from "react" // eslint-disable-line no-unused-vars
import Helmet from "react-helmet"
import { graphql, Link, StaticQuery } from "gatsby"
import { navigate } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserGraduate,
  faRss,
  faBrain,
  faNewspaper,
  faDraftingCompass,
  faSearch,
  faTag,
  faWineBottle,
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


const KBList = ({ edges }) => {
  let labelMap = {}
  edges.forEach(({ node }) => {
    const {
      frontmatter: { menuLabel, menuList },
    } = node
    if (menuList !== false) {
      const useLabel = menuLabel || "00default"
      labelMap[useLabel] = labelMap[useLabel] || []
      labelMap[useLabel].push(node)
    }
  })

  return (
    <Flex sx={{ flexDirection: "column" }}>
      {Object.keys(labelMap)
        .sort()
        .map((l, k) => (
          <Flex key={k} sx={{ flexDirection: "column" }}>
            {l === "00default" ? null : (
              <Styled.p sx={{ color: "gray.6" }}>{l}</Styled.p>
            )}
            {labelMap[l].map(({ frontmatter: { title, slug } }, i) => (
              <Styled.a key={i} as={Link} to={slug} sx={{ my: 1 }}>
                {title}
              </Styled.a>
            ))}
            <Styled.hr />
          </Flex>
        ))}
    </Flex>
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
      width: [null, null, "100%", "100%"],
      ":visited,:hover,:active": {
        textDecoration: "none",
      },
    }}
  >
    <Styled.p
      sx={{
        color: "gray.8",
        px: 3,
        py: 1,
        my: 1,
        ":hover": {
          bg: "gray.1",
          cursor: "pointer",
        },
      }}
    >
      {children}
    </Styled.p>
  </Styled.a>
)

const Header = ({ kbedges }) => {
  return (
    <Flex
      sx={{
        flexDirection: ["row", "row", "column", "column"],
        boxShadow: "md",
      }}
    >
      <Box
        sx={{
          p: 3,
          bg: "gray.9",
        }}
      >
        <Styled.a
          as={Link}
          to="/"
          sx={{
            ":visited,:hover,:active": {
              textDecoration: "none",
            },
            color: "gray.1",
          }}
        >
          <Styled.h2>SK</Styled.h2>
        </Styled.a>
      </Box>
      <Flex
        sx={{
          flexDirection: ["row", "row", "column", "column"],
          mt: 2,
          alignItems: ["center", "center", null, null],
          flexWrap: "wrap",
        }}
      >
        <HeaderMenuItem url="/blog">
          <FontAwesomeIcon icon={faNewspaper} sx={{ mr: 1 }} fixedWidth /> Blog
        </HeaderMenuItem>
        <HeaderMenuItem url="/blog/drafts">
          <FontAwesomeIcon icon={faDraftingCompass} sx={{ mr: 1 }} fixedWidth /> Drafts
        </HeaderMenuItem>
        <HeaderMenuItem url="/blog/tags">
          <FontAwesomeIcon icon={faTag} sx={{ mr: 1 }} fixedWidth /> Tags
        </HeaderMenuItem>
        <HeaderMenuItem url="/search">
          <FontAwesomeIcon icon={faSearch} sx={{ mr: 1 }} fixedWidth /> Search
        </HeaderMenuItem>
        <HeaderMenuItem url="https://wine.sanyamkapoor.com" external>
          <FontAwesomeIcon icon={faWineBottle} sx={{ mr: 1 }} fixedWidth /> Wine Map
        </HeaderMenuItem>
        <HeaderMenuItem url="/kb">
          <FontAwesomeIcon icon={faBrain} sx={{ mr: 1 }} fixedWidth /> Knowledge Base
        </HeaderMenuItem>
      </Flex>
      <Box
        sx={{
          display: ["none", "none", "block", "block"],
          fontSize: 0,
          pl: 4,
          pr: 2,
        }}
      >
        <KBList edges={kbedges} />
      </Box>
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
      sx={{ color: "gray.1" }}
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
  <Box>
    <Styled.a
      as={external ? null : Link}
      target={external ? "_blank" : null}
      rel={external ? "noopener noreferrer" : null}
      to={external ? null : url}
      href={external ? url : null}
      sx={{
        color: "gray.3",
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
  </Box>
)

const Footer = ({ name, social }) => {
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
        flexDirection: "column",
        justifyContent: "center",
        bg: "gray.9",
        mt: "auto",
        p: 4,
      }}
    >
      <Flex sx={{ justifyContent: "center" }}>
        <MenuLink url={social.scholar} external>
          <FontAwesomeIcon icon={faUserGraduate} sx={iconStyle} fixedWidth />
        </MenuLink>
        <MenuLink url={social.github} external>
          <FontAwesomeIcon icon={faGithub} sx={iconStyle} fixedWidth />
        </MenuLink>
        <MenuLink url={social.yc} external>
          <FontAwesomeIcon icon={faYCombinator} sx={iconStyle} fixedWidth />
        </MenuLink>
        <MenuLink url={social.linkedin} external>
          <FontAwesomeIcon icon={faLinkedin} sx={iconStyle} fixedWidth />
        </MenuLink>
        <MenuLink url={social.stackoverflow} external>
          <FontAwesomeIcon icon={faStackOverflow} sx={iconStyle} fixedWidth />
        </MenuLink>
        <MenuLink url={social.twitter} external>
          <FontAwesomeIcon icon={faTwitter} sx={iconStyle} fixedWidth />
        </MenuLink>
        <MenuLink url="/rss/blog.xml" external>
          <FontAwesomeIcon icon={faRss} sx={iconStyle} fixedWidth />
        </MenuLink>
      </Flex>
      <Styled.p
        sx={{
          color: "gray.7",
          fontWeight: "light",
          m: 0,
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} {name}
      </Styled.p>
    </Flex>
  )
}

export const ContentBox = ({ children, sx }) => (
  <Box
    sx={{
      p: 4,
      mx: "auto",
      maxWidth: ["100%", "100%", "3xl", "3xl"],
      flex: 1,
      boxShadow: "md",
      ...sx,
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
        allMdx(
          filter: { frontmatter: { category: { in: "kb" } } }
          sort: { order: ASC, fields: frontmatter___title }
        ) {
          edges {
            node {
              frontmatter {
                title
                slug
                menuLabel
                menuList
              }
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata }, allMdx: { edges: kbedges } }) => {
      const { name, social } = siteMetadata

      return (
        <>
          <Head siteMetadata={siteMetadata} frontmatter={frontmatter} />
          <Flex sx={{ flexDirection: "column", minHeight: "screenHeight" }}>
            <Flex sx={{ flexDirection: ["column", "column", "row", "row"] }}>
              <Header kbedges={kbedges} />
              {children}
            </Flex>
            <Footer name={name} social={social} />
          </Flex>
        </>
      )
    }}
  />
)

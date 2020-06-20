/** @jsx jsx */

import React, { useState } from "react" // eslint-disable-line no-unused-vars
import { graphql, Link } from "gatsby"
import { navigate } from "@reach/router"
import { useFlexSearch } from "react-use-flexsearch"
import { jsx, Styled, Box, Flex, Input } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

import Layout from "../components/layout"
import PostIndex from "../components/post_index"

const SearchBar = () => {
  const [query, setQuery] = useState("")

  return (
    <Flex
      as="form"
      onSubmit={e => {
        e.preventDefault()
        navigate(`/search?q=${encodeURIComponent(query)}`)
      }}
      sx={{ alignItems: "center", w: "50%" }}
    >
      <Input
        name="query"
        placeholder="Search"
        sx={{
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

const SearchPage = ({
  location: { search },
  data: {
    localSearchIndex: { index, store },
  },
}) => {
  const q = decodeURIComponent(search.split("=").slice(-1)[0])
  const results = useFlexSearch(q, index, JSON.parse(store))

  return (
    <Layout
      frontmatter={{
        title: `Search ${q ? `"${q}"` : ""}`,
        description: `Search results for ${q ? `"${q}"` : ""}`,
        slug: `/search?q=${encodeURIComponent(q)}`,
      }}
    >
      <Box
        sx={{
          p: "1em",
          m: "auto",
          minWidth: [null, null, "50rem", "50rem"],
          maxWidth: ["100%", "100%", "50rem", "50rem"],
        }}
      >
        <Styled.h1>
          Search{" "}
          <span role="img" aria-label="Search">
            🔎
          </span>
        </Styled.h1>
        <p sx={{ color: "secondary", fontSize: 0, display: "inline" }}>
          This is experimental and probably not satisfactory.
        </p>
        {q ? (
          <>
            <Styled.p>
              <Styled.a as={Link} to="/search">
                <FontAwesomeIcon icon={faArrowLeft} title="Search another" />{" "}
                Back to search.
              </Styled.a>
            </Styled.p>
            <Styled.p sx={{ color: "secondary" }}>
              showing results for "<b>{q}</b>"
            </Styled.p>
          </>
        ) : (
          <SearchBar />
        )}
        <PostIndex items={results} />
      </Box>
    </Layout>
  )
}

export default SearchPage

export const pageQuery = graphql`
  {
    localSearchIndex {
      index
      store
    }
  }
`

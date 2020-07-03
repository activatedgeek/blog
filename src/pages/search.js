/** @jsx jsx */

import React, { useState } from "react" // eslint-disable-line no-unused-vars
import { graphql, Link } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons"

import Layout, { SearchBar, ContentBox } from "../components/layout"
import PostIndex from "../components/post_index"

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
      <ContentBox sx={{ my: "auto" }}>
        <Styled.h1>
          <FontAwesomeIcon icon={faSearch} /> Search
        </Styled.h1>
        <Styled.p sx={{ color: "gray.5", fontSize: 0, display: "inline" }}>
          Experimental exact word search.
        </Styled.p>
        {q ? (
          <>
            <Styled.p>
              <Styled.a as={Link} to="/search">
                <FontAwesomeIcon icon={faArrowLeft} title="Search another" />{" "}
                Back to Search
              </Styled.a>
            </Styled.p>
            <Styled.p sx={{ color: "secondary" }}>
              showing results for "<b>{q}</b>"
            </Styled.p>
          </>
        ) : (
          <SearchBar
            inputSx={{
              width: "11/12",
              my: 2,
              fontSize: 2,
              color: "gray.7",
              "&:focus": { outline: "none", borderColor: "gray.7" },
            }}
          />
        )}
        <PostIndex items={results} />
      </ContentBox>
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

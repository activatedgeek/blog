/** @jsx jsx */

import React from "react" // eslint-disable-line no-unused-vars
import { graphql } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

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
      <ContentBox style={{ width: ["100%", "100%", "3xl", "4xl"] }}>
        <Styled.h1>
          <FontAwesomeIcon icon={faSearch} /> Search
        </Styled.h1>
        <Styled.p sx={{ color: "textMuted" }}>
          Exact word search <sup>BETA</sup>
        </Styled.p>
        <SearchBar
          inputSx={{
            my: 2,
            fontSize: 2,
          }}
        />
        {q ? <Styled.h3>Results for "{q}"</Styled.h3> : null}
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

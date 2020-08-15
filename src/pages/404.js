/** @jsx jsx */

import { Link } from "gatsby"
import { jsx, Styled } from "theme-ui"

import Layout, { ContentBox } from "../components/layout"
import LatestPages from "../components/latest"
import Shortcodes from "../components/shortcodes"

const LostPage = () => (
  <Layout
    frontmatter={{
      title: "Hmm... An error?",
      description: "This page could not be found.",
    }}
  >
    <ContentBox>
      <Styled.h1>Hmm... An error?</Styled.h1>
      <Shortcodes.LazyImage
        src="https://imgs.xkcd.com/comics/error_types.png"
        alt="https://xkcd.com/2303/"
      />
      <Styled.p>
        Have something in mind? Try a{" "}
        <Styled.a to="/search" as={Link}>
          Keyword Search
        </Styled.a>
        . More generally, a good place to start is{" "}
        <Styled.a to="/kb" as={Link}>
          here
        </Styled.a>
        .
      </Styled.p>
      <Styled.p>
        Or now that you've arrived, check some of the recently updated pages.
      </Styled.p>
      <LatestPages />
    </ContentBox>
  </Layout>
)

export default LostPage

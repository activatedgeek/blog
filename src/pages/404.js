/** @jsx jsx */

import { Link } from "gatsby"
import { jsx, Styled } from "theme-ui"

import Layout, { ContentBox } from "../components/layout"
import { Info } from "../components/hint"

const LostPage = () => (
  <Layout
    frontmatter={{ title: "404", description: "This page could not be found." }}
  >
    <ContentBox style={{ width: ["100%", "100%", "3xl", "4xl"] }}>
      <Styled.h1>Oops! Nothing here.</Styled.h1>
      <Info>
        You may have arrived here because I am reorganizing this website to
        serve as a knowledge base. While all content is intact, there's some
        more work to be done to conform to my{" "}
        <Styled.a to="/kb/knowledge-base-organization-philosophy" as={Link}>
          knowledge organization philosophy
        </Styled.a>
        {", "}
        so that navigation is more meaningful.
      </Info>
      <Styled.p>
        Have some keywords in mind? Search them{" "}
        <Styled.a to="/search" as={Link}>
          here
        </Styled.a>
      </Styled.p>
    </ContentBox>
  </Layout>
)

export default LostPage

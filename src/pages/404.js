/** @jsx jsx */

import { Link } from "gatsby"
import { jsx, Styled } from "theme-ui"

import Layout, { ContentBox } from "../components/layout"

const LostPage = () => (
  <Layout
    frontmatter={{ title: "404", description: "This page could not be found." }}
  >
    <ContentBox style={{ width: ["100%", "100%", "3xl", "4xl"] }}>
      <Styled.h1>Oops! Nothing here.</Styled.h1>
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

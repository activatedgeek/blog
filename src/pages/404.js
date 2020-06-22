/** @jsx jsx */

import { Link } from "gatsby"
import { jsx, Styled } from "theme-ui"

import Layout, { ContentBox } from "../components/layout"

const LostPage = () => (
  <Layout
    frontmatter={{ title: "404", description: "This page could not be found." }}
  >
    <ContentBox>
      <Styled.h1>Hmm... Nothing here!</Styled.h1>
      <Styled.p>
        Go back{" "}
        <Styled.a to="/" as={Link}>
          home
        </Styled.a>
      </Styled.p>
    </ContentBox>
  </Layout>
)

export default LostPage

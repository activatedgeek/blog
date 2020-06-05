import React from "react"
import { Link } from "gatsby"
import { Styled } from "theme-ui"

import Layout from "../components/layout"

const LostPage = () => (
  <Layout frontmatter={{ title: "You are lost!" }}>
    <Styled.h1>You are lost!</Styled.h1>
    <Styled.p>
      Go back{" "}
      <Styled.a to="/" as={Link}>
        home
      </Styled.a>
    </Styled.p>
  </Layout>
)

export default LostPage

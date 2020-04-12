import React from "react"
import { Link } from "gatsby"
import { Styled } from "theme-ui"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <h1>You are lost!</h1>
    <p>
      Go back{" "}
      <Styled.a to="/" as={Link}>
        home
      </Styled.a>
    </p>
  </Layout>
)

export default IndexPage

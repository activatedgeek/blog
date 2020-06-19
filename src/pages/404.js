/** @jsx jsx */

import { Link } from "gatsby"
import { jsx, Styled, Box } from "theme-ui"

import Layout from "../components/layout"

const LostPage = () => (
  <Layout frontmatter={{ title: "404" }}>
    <Box
      sx={{
        p: "1em",
        m: "auto",
        minWidth: [null, null, "50rem", "50rem"],
        maxWidth: ["100%", "100%", "50rem", "50rem"],
      }}
    >
      <Styled.h1>Hmm... Nothing here!</Styled.h1>
      <Styled.p>
        Go back{" "}
        <Styled.a to="/" as={Link}>
          home
        </Styled.a>
      </Styled.p>
    </Box>
  </Layout>
)

export default LostPage

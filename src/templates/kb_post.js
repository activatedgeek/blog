/** @jsx jsx */

import { graphql, Link } from "gatsby"
import { jsx, Styled, Flex, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBrain } from "@fortawesome/free-solid-svg-icons"

import Layout from "../components/layout"
import { Post } from "./post"

const KBList = ({ edges }) => {
  let labelMap = {}
  edges.forEach(({ node }) => {
    const {
      frontmatter: { label },
    } = node
    const useLabel = label || "0ungrouped"
    labelMap[useLabel] = labelMap[useLabel] || []
    labelMap[useLabel].push(node)
  })

  return (
    <Flex sx={{ p: 3, flexDirection: "column" }}>
      <Styled.h4>
        <FontAwesomeIcon icon={faBrain} sx={{ mr: 1 }} /> Knowledge Base
      </Styled.h4>
      <Styled.hr />
      {Object.keys(labelMap)
        .sort()
        .map((l, k) => (
          <Flex key={k} sx={{ flexDirection: "column" }}>
            {l === "0ungrouped" ? null : (
              <Styled.p sx={{ color: "gray.6" }}>{l}</Styled.p>
            )}
            {labelMap[l].map(({ frontmatter: { title, slug } }, i) => (
              <Styled.a key={i} as={Link} to={slug} sx={{ my: 1 }}>
                {title}
              </Styled.a>
            ))}
            <Styled.hr />
          </Flex>
        ))}
    </Flex>
  )
}

const KBPageTemplate = ({
  data: {
    mdx,
    allMdx: { edges },
  },
}) => {
  const { frontmatter } = mdx
  const { title } = frontmatter

  return (
    <Layout frontmatter={{ ...frontmatter, title: `${title} - KB` }}>
      <Box
        sx={{
          p: 4,
          mx: "auto",
          maxWidth: ["100%", "100%", "3xl", "4xl"],
          flex: 1,
        }}
      >
        <Post mdx={mdx} toc />
      </Box>
      <Box
        sx={{
          bg: "gray.2",
          display: ["none", "none", "block", "block"],
        }}
      >
        <KBList edges={edges} />
      </Box>
    </Layout>
  )
}

export default KBPageTemplate

export const pageQuery = graphql`
  query($id: String) {
    allMdx(
      filter: { frontmatter: { category: { in: "kb" } } }
      sort: { order: ASC, fields: frontmatter___title }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            label
          }
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      body
      tableOfContents
      frontmatter {
        title
        date
        updated
        description
        tags
        slug
      }
    }
  }
`

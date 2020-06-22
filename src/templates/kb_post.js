/** @jsx jsx */

import { graphql, Link } from "gatsby"
import { jsx, Styled, Flex } from "theme-ui"

import Layout, { ContentBox } from "../components/layout"
import { Post } from "./post"

export const KBList = ({ edges }) => {
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
    <Flex sx={{ flexDirection: "column" }}>
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

const KBPageTemplate = ({ data: { mdx } }) => {
  const { frontmatter } = mdx
  const { title } = frontmatter

  return (
    <Layout frontmatter={{ ...frontmatter, title: `${title} - KB` }}>
      <ContentBox>
        <Post mdx={mdx} />
      </ContentBox>
    </Layout>
  )
}

export default KBPageTemplate

export const pageQuery = graphql`
  query($id: String) {
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

/** @jsx jsx */

import { graphql } from "gatsby"
import { jsx, Styled, Flex, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"

import Layout from "../../components/layout"
import Tags from "../../components/tags"

const TagList = ({
  data: {
    allMdx: { group },
  },
}) => {
  return (
    <Layout
      frontmatter={{
        title: "Tags",
        description: "All tags used in blog articles.",
        slug: "/tags",
      }}
    >
      <Box
        sx={{
          p: 4,
          mx: "auto",
          maxWidth: ["100%", "100%", "3xl", "4xl"],
          flex: 1,
        }}
      >
        <Styled.h2 sx={{ mb: "0.5em" }}>
          <FontAwesomeIcon icon={faTag} /> Tags
        </Styled.h2>
        <Flex sx={{ flexFlow: "row wrap" }}>
          <Tags tags={group} fontSize={2} my={2} />
        </Flex>
      </Box>
    </Layout>
  )
}

export default ({ data }) => <TagList data={data} />

export const pageQuery = graphql`
  {
    allMdx(filter: { frontmatter: { category: { eq: "blog" } } }) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`

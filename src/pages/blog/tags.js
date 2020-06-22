/** @jsx jsx */

import { graphql } from "gatsby"
import { jsx, Styled, Flex } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"

import Layout, { ContentBox } from "../../components/layout"
import Tags from "../../components/tags"

const TagList = ({
  data: {
    allMdx: { group },
  },
}) => {
  return (
    <Layout
      frontmatter={{
        title: "Tags - Blog",
        description: "All tags used in blog articles.",
        slug: "/tags",
      }}
    >
      <ContentBox>
        <Styled.h2 sx={{ mb: "0.5em" }}>
          <FontAwesomeIcon icon={faTag} /> Tags
        </Styled.h2>
        <Flex sx={{ flexFlow: "row wrap" }}>
          <Tags tags={group} my={2} />
        </Flex>
      </ContentBox>
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

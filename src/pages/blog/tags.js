import { StaticQuery, graphql, Link } from "gatsby"
/** @jsx jsx */
import { jsx, Styled, Flex } from "theme-ui"
import emoji from "node-emoji"

import Layout from "../../components/layout"

const TagList = ({
  data: {
    allMdx: { group },
  },
}) => {
  return (
    <Layout>
      <Styled.h2 sx={{ mb: "0.5em" }}>Tags {emoji.get(`:label:`)}</Styled.h2>
      <Flex sx={{ flexFlow: "row wrap" }}>
        {group.map(({ tag, totalCount }, i) => (
          <Styled.a
            key={i}
            as={Link}
            to={`/blog/tags/${encodeURIComponent(tag)}`}
            sx={{ m: "0 0.5em 1em 0", "&:hover": { textDecoration: "none" } }}
          >
            <span
              sx={{
                m: "0.5em 0.5em 0.5em 0",
                borderStyle: "solid",
                borderWidth: "1px",
                p: "0.2em",
                borderRadius: "0.2em",
                fontSize: 2,
              }}
            >
              {tag} ({totalCount})
            </span>
          </Styled.a>
        ))}
      </Flex>
    </Layout>
  )
}

const TagIndex = () => (
  <StaticQuery
    query={graphql`
      {
        allMdx(filter: { frontmatter: { category: { eq: "blog" } } }) {
          group(field: frontmatter___tags) {
            tag: fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => <TagList data={data} />}
  />
)

export default TagIndex

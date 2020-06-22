/** @jsx jsx */

import { graphql, Link } from "gatsby"
import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faDraftingCompass,
} from "@fortawesome/free-solid-svg-icons"

import Layout, { ContentBox } from "../../components/layout"
import PostIndex from "../../components/post_index"

export default ({
  data: {
    allMdx: { edges },
  },
}) => (
  <Layout
    frontmatter={{
      title: "Drafts",
      description: "Draft blog posts.",
    }}
  >
    <ContentBox>
      <Styled.h2>
        <FontAwesomeIcon icon={faDraftingCompass} title="Show all posts." />{" "}
        Drafts
      </Styled.h2>
      <Styled.p>
        <Styled.a as={Link} to="/blog">
          <FontAwesomeIcon icon={faArrowLeft} title="Show all posts." /> back to
          All Posts
        </Styled.a>
      </Styled.p>
      <PostIndex
        items={edges.map(
          ({
            node: {
              frontmatter: { title, date, tags, slug, archive, draft },
            },
          }) => ({
            title,
            date,
            tags: tags.map(t => ({ tag: t })),
            slug,
            archive,
            draft,
          })
        )}
      />
    </ContentBox>
  </Layout>
)

export const pageQuery = graphql`
  {
    allMdx(
      filter: { frontmatter: { category: { in: "blog" }, draft: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            tags
            slug
            archive
            draft
          }
        }
      }
    }
  }
`

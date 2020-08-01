/** @jsx jsx */

import React from "react" // eslint-disable-line no-unused-vars
import { StaticQuery, graphql } from "gatsby"
import { jsx, Styled } from "theme-ui"

export default () => (
  <StaticQuery
    query={graphql`
      {
        reviews: allGoodreadsReview(
          sort: { fields: book___publication_year, order: DESC }
        ) {
          nodes {
            book {
              link
              year: publication_year
              title: title_without_series
            }
          }
        }
      }
    `}
    render={({ reviews }) => (
      <Styled.ul>
        {reviews.nodes.map(({ book: { link, title, year } }, i) => (
          <Styled.li key={i}>
            <Styled.a href={link} target="_blank" rel="noopener noreferrer">
              {title}
            </Styled.a>{" "}
            ({year})
          </Styled.li>
        ))}
      </Styled.ul>
    )}
  />
)

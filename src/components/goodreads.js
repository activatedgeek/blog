/** @jsx jsx */

import React from "react" // eslint-disable-line no-unused-vars
import { StaticQuery, graphql } from "gatsby"
import { jsx, Styled } from "theme-ui"

export default () => (
  <StaticQuery
    query={graphql`
      {
        reviews: allGoodreadsLibraryExportCsv(
          sort: { fields: Year_Published, order: DESC }
        ) {
          nodes {
            author: Author
            additional_authors: Additional_Authors
            avg_rating: Average_Rating
            book_id: Book_Id
            title: Title
            year: Year_Published
          }
        }
      }
    `}
    render={({ reviews }) => (
      <Styled.ul>
        {reviews.nodes.map(
          ({ title, year, book_id, author, additional_authors }, i) => (
            <Styled.li key={i}>
              <Styled.a
                href={`https://www.goodreads.com/book/show/${book_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </Styled.a>{" "}
              by{" "}
              <Styled.i>
                {author}
                {additional_authors ? `, ${additional_authors}` : null}
              </Styled.i>{" "}
              ({year})
            </Styled.li>
          )
        )}
      </Styled.ul>
    )}
  />
)

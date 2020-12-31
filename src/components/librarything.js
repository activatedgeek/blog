/** @jsx jsx */

import React from "react" // eslint-disable-line no-unused-vars
import { StaticQuery, graphql } from "gatsby"
import { jsx, Styled } from "theme-ui"

export default () => (
  <StaticQuery
    query={graphql`
      {
        books: allLibraryThing(sort: { fields: publicationdate, order: DESC }) {
          nodes {
            isbn: ISBN_cleaned
            author: author_fl
            id: book_id
            cover
            rating
            title
            year: publicationdate
          }
        }
      }
    `}
    render={({ books }) => (
      <Styled.ul>
        {books.nodes.map(({ isbn, author, title, year }, i) => (
          <Styled.li key={i}>
            <Styled.a
              href={`https://www.librarything.com/search.php?search=${isbn ||
                encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </Styled.a>{" "}
            by <Styled.i>{author}</Styled.i> ({year})
          </Styled.li>
        ))}
      </Styled.ul>
    )}
  />
)

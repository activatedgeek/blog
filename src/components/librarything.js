/** @jsx jsx */

import React from "react" // eslint-disable-line no-unused-vars
import { StaticQuery, graphql } from "gatsby"
import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"

const Rating = ({ value }) => {
  const rating = Math.floor(value)
  return (
    <Styled.div>
      {Array.apply(0, Array(rating)).map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          sx={{ fontSize: 0, color: "yellow.4" }}
        />
      ))}
      {value > rating ? (
        <FontAwesomeIcon
          icon={faStarHalf}
          sx={{ fontSize: 0, color: "yellow.4" }}
        />
      ) : null}
    </Styled.div>
  )
}

export default () => (
  <StaticQuery
    query={graphql`
      {
        books: allLibraryThing(
          sort: { fields: publicationdate, order: DESC }
          filter: { collections: { _1: { eq: "Your library" } } }
        ) {
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
        {books.nodes.map(({ isbn, author, title, year, rating }, i) => (
          <Styled.li key={i}>
            <Styled.a
              href={`https://www.librarything.com/search.php?search=${isbn ||
                encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </Styled.a>{" "}
            by <Styled.i>{author}</Styled.i> ({year}) <Rating value={rating} />
          </Styled.li>
        ))}
      </Styled.ul>
    )}
  />
)

/** @jsx jsx */

import React from "react" // eslint-disable-line no-unused-vars
import { StaticQuery, graphql } from "gatsby"
import { jsx, Styled } from "theme-ui"

export default ({ limit }) => (
  <StaticQuery
    query={graphql`
      {
        movies: allTmdbAccountFavoriteMovies(
          sort: { fields: release_date, order: DESC }
          limit: 30
        ) {
          nodes {
            id: accountFavoriteMoviesId
            title
            year: release_date(formatString: "YYYY")
          }
        }
      }
    `}
    render={({ movies }) => (
      <Styled.ul>
        {movies.nodes.map(({ id, title, year }, i) => (
          <Styled.li key={i}>
            <Styled.a
              href={`https://www.themoviedb.org/movie/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </Styled.a>{" "}
            ({year})
          </Styled.li>
        ))}
      </Styled.ul>
    )}
  />
)

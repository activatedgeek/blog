/** @jsx jsx */

import React from "react" // eslint-disable-line no-unused-vars
import { StaticQuery, graphql } from "gatsby"
import { jsx, Styled } from "theme-ui"

export default () => (
  <StaticQuery
    query={graphql`
      {
        tv: allTmdbAccountFavoriteTv(
          sort: { fields: first_air_date, order: DESC }
        ) {
          nodes {
            id: accountFavoriteTvId
            name
            year: first_air_date(formatString: "YYYY")
          }
        }
      }
    `}
    render={({ tv }) => (
      <Styled.ul>
        {tv.nodes.map(({ id, name, year }, i) => (
          <Styled.li key={i}>
            <Styled.a
              href={`https://www.themoviedb.org/tv/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {name}
            </Styled.a>{" "}
            ({year})
          </Styled.li>
        ))}
      </Styled.ul>
    )}
  />
)

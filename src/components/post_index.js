/** @jsx jsx */

import React from "react" // eslint-disable-line no-unused-vars
import { Link, graphql } from "gatsby"
import { jsx, Styled, Flex, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArchive, faEdit } from "@fortawesome/free-solid-svg-icons"

import { areas } from "../../site/orgsys"

export const AreaButton = ({ area, cat }) => (
  <span sx={{ color: "textMuted", fontSize: 1 }}>
    <Styled.i>{areas[area].categories[cat].label} </Styled.i> in{" "}
    <Styled.a
      as={Link}
      to={areas[area].url}
      sx={{
        ":visited,:hover,:active": {
          textDecoration: "none",
        },
      }}
    >
      <span
        sx={{
          color: "light",
          display: "inline-block",
          bg: areas[area].color,
          borderRadius: "lg",
          boxShadow: "md",
          px: 2,
        }}
      >
        {area}
      </span>
    </Styled.a>
  </span>
)

const PostItem = ({ title, area, cat, slug, archive, draft, showArea }) => (
  <Box>
    <Styled.p sx={{ display: "inline", my: 0 }}>
      <Styled.a as={Link} to={slug}>
        {title}
      </Styled.a>
      {archive === true ? (
        <FontAwesomeIcon
          icon={faArchive}
          title="This post is archived."
          sx={{ mx: 2, color: "textMuted" }}
        />
      ) : null}
      {draft === true ? (
        <FontAwesomeIcon
          icon={faEdit}
          title="This post is a working draft."
          sx={{ mx: 2, color: "textMuted" }}
        />
      ) : null}
      {"    "}
      <AreaButton area={area} cat={cat} />
    </Styled.p>
  </Box>
)

const PostIndex = ({ items, showArea, showCat }) => {
  let yearIndex = items.reduce((acc, x) => {
    const { year } = x
    acc[year] = acc[year] || []
    acc[year].push(x)
    return acc
  }, {})

  const yearList = Object.keys(yearIndex)
  yearList.sort().reverse()

  return (
    <Box sx={{ mt: 3 }}>
      {yearList.map((year, i) => (
        <Flex
          key={i}
          sx={{ flexDirection: ["column", "column", "row", "row"], mb: 3 }}
        >
          <Box
            sx={{
              display: "inline-flex",
              width: "20",
              alignItems: "flex-start",
              pt: 1,
              fontSize: 1,
              fontWeight: "bold",
            }}
          >
            {year === "0" ? "Undated" : year}
          </Box>
          <Box sx={{ flex: 1 }}>
            {yearIndex[year].map(({ day, ...props }, j) => (
              <Flex key={j}>
                <Box
                  sx={{
                    display: "inline-flex",
                    width: "24",
                    mx: [0, 0, 2, 2],
                    color: "textMuted",
                    fontSize: 1,
                    alignItems: "center",
                  }}
                >
                  {day}
                </Box>
                <Box sx={{ flex: 1, mb: 1 }}>
                  <PostItem {...props} showArea={showArea} showCat={showCat} />
                </Box>
              </Flex>
            ))}
          </Box>
        </Flex>
      ))}
    </Box>
  )
}

export default PostIndex

export const query = graphql`
  fragment frontmatter on Mdx {
    frontmatter {
      title
      description
      area
      cat
      slug
      archive
      draft
      day: date(formatString: "MMM D")
      year: date(formatString: "YYYY")
      updatedDay: updated(formatString: "MMM D")
      updatedYear: updated(formatString: "YYYY")
    }
  }
`

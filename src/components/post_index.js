/** @jsx jsx */

import React from "react" // eslint-disable-line no-unused-vars
import { Link } from "gatsby"
import { jsx, Styled, Flex, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArchive, faEdit } from "@fortawesome/free-solid-svg-icons"

import { areas } from "../../site/orgsys"

const PostItem = ({
  title,
  area,
  slug,
  archive,
  draft,
}) => (
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
      {area ? (
        <span
          sx={{
            display: "inline-block",
            bg: areas[area].color,
            borderRadius: "lg",
            boxShadow: "md",
            px: 2,
            ml: 2,
          }}
        >
          <Styled.a
            as={Link}
            to={areas[area].url}
            sx={{
              fontSize: 0,
              color: "light",
              ":visited,:hover,:active": {
                textDecoration: "none",
              },
            }}
          >
            {area}
          </Styled.a>
        </span>
      ) : null}
    </Styled.p>
  </Box>
)

const PostIndex = ({ items }) => {
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
          <Box sx={{ width: "20" }}>
            <Styled.h5>{year === "0" ? "Undated" : year}</Styled.h5>
          </Box>
          <Box sx={{ flex: 1 }}>
            {yearIndex[year].map(({ day, ...props }, j) => (
              <Flex key={j}>
                <Box
                  sx={{
                    display: "inline",
                    width: "24",
                    mx: [0, 0, 2, 2],
                    color: "textMuted",
                  }}
                >
                  {day}
                </Box>
                <Box sx={{ flex: 1, mb: 1 }}>
                  <PostItem {...props} />
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

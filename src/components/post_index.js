/** @jsx jsx */

import React from "react" // eslint-disable-line no-unused-vars
import { Link } from "gatsby"
import { jsx, Styled, Flex, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArchive, faEdit } from "@fortawesome/free-solid-svg-icons"

import Tags from "../components/tags"

const PostItem = ({ title, tags, slug, archive, draft }) => (
  <Box>
    <Styled.p sx={{ display: "inline", my: 0 }}>
      <Styled.a as={Link} to={slug}>
        {title}
      </Styled.a>
      {archive === true ? (
        <FontAwesomeIcon
          icon={faArchive}
          title="This post is archived."
          sx={{ mx: 2, color: "gray.6" }}
        />
      ) : null}
      {draft === true ? (
        <FontAwesomeIcon
          icon={faEdit}
          title="This post is a working draft."
          sx={{ mx: 2, color: "gray.6" }}
        />
      ) : null}
    </Styled.p>
    <Box sx={{ display: "inline" }}>
      <Tags tags={tags} fontSize={0} />
    </Box>
  </Box>
)

const PostIndex = ({ items }) => {
  let yearIndex = items.reduce((acc, x) => {
    const { date } = x
    const year = new Date(date).getFullYear()
    if (!acc.hasOwnProperty(year)) {
      acc[year] = []
    }
    acc[year].push(x)
    return acc
  }, {})

  const yearList = Object.keys(yearIndex)
  yearList.sort().reverse()

  const dateOptions = { month: "short", day: "numeric" }

  return (
    <>
      {yearList.map((year, i) => (
        <Flex
          key={i}
          sx={{ flexDirection: ["column", "column", "row", "row"] }}
        >
          <Box sx={{ width: "20" }}>
            <Styled.h4>{year}</Styled.h4>
          </Box>
          <Box sx={{ flex: 1 }}>
            {yearIndex[year].map(({ date, ...props }, j) => (
              <Flex key={j}>
                <Box
                  sx={{
                    display: "inline",
                    width: "24",
                    mx: [0, 0, 2, 2],
                    color: "gray.5",
                  }}
                >
                  <span>
                    {new Intl.DateTimeFormat("en-US", dateOptions).format(
                      new Date(date)
                    )}
                  </span>
                </Box>
                <Box sx={{ flex: 1, mb: 2 }}>
                  <PostItem date={date} {...props} />
                </Box>
              </Flex>
            ))}
          </Box>
        </Flex>
      ))}
    </>
  )
}

export default PostIndex

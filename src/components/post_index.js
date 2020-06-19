/** @jsx jsx */

import React from "react"
import { Link } from "gatsby"
import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArchive, faEdit } from "@fortawesome/free-solid-svg-icons"

import Tags from "../components/tags"

const PostIndex = ({ items }) => {
  let yearIndex = items.reduce((acc, x) => {
    const { createdMs } = x
    const year = new Date(createdMs).getFullYear()
    if (!acc.hasOwnProperty(year)) {
      acc[year] = []
    }
    acc[year].push(x)
    return acc
  }, {})

  const yearList = Object.keys(yearIndex)
  yearList.sort().reverse()

  return (
    <>
      {yearList.map((year, i) => (
        <React.Fragment key={i}>
          <Styled.h3>{year}</Styled.h3>
          <Styled.ul>
            {yearIndex[year].map(
              ({ title, slug, archive, draft, tags, createdMs }, j) => (
                <Styled.li key={j}>
                  <Styled.a as={Link} to={slug}>
                    {title}
                  </Styled.a>
                  {archive === true ? (
                    <FontAwesomeIcon
                      icon={faArchive}
                      title="This post is archived."
                      sx={{ ml: "0.5em", fontSize: 0 }}
                    />
                  ) : null}
                  {draft === true ? (
                    <FontAwesomeIcon
                      icon={faEdit}
                      title="This post is a working draft."
                      sx={{ ml: "0.5em", fontSize: 0 }}
                    />
                  ) : null}
                  <span sx={{ color: "secondary", m: "0 .5em", fontSize: 0 }}>
                    {new Date(createdMs).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {new Date(createdMs).getDate()}
                  </span>
                  <br />
                  <Tags tags={tags} />
                </Styled.li>
              )
            )}
          </Styled.ul>
        </React.Fragment>
      ))}
    </>
  )
}

export default PostIndex

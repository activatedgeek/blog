import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faYCombinator,
  faLinkedin,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

/** @jsx jsx */
import { jsx, Styled, Flex } from "theme-ui"

const Footer = ({ name, social }) => {
  const iconStyle = { margin: "0 0.2em", fontSize: 3 }
  return (
    <Flex
      sx={{
        alignItems: "center",
        flexDirection: "column",
        p: "2em 2%",
        bg: "muted",
        mt: "auto"
      }}
    >
      <Flex w="100vw" m="0.5em 0">
        <Styled.a as={Link} to="/blog" sx={{ m: "0 1em" }}>
          Blog
        </Styled.a>
        <Styled.a as={Link} to="/blog/tags" sx={{ m: "0 1em" }}>
          Tags
        </Styled.a>
        <Styled.a as={Link} to="/blog/drafts" sx={{ m: "0 1em" }}>
          Drafts
        </Styled.a>
      </Flex>
      <Flex w="100vw" m="0.5em 0">
        <Styled.a
          href={social.scholar}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faUserGraduate} sx={iconStyle} />
        </Styled.a>
        <Styled.a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} sx={iconStyle} />
        </Styled.a>
        <Styled.a href={social.yc} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYCombinator} sx={iconStyle} />
        </Styled.a>
        <Styled.a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} sx={iconStyle} />
        </Styled.a>
        <Styled.a
          href={social.stackoverflow}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faStackOverflow} sx={iconStyle} />
        </Styled.a>
        <Styled.a
          href={social.twitter}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} sx={iconStyle} />
        </Styled.a>
      </Flex>
      <Styled.p
        sx={{
          fontSize: 0,
          m: "0.5em 0",
          color: "secondary",
          fontWeight: "light",
        }}
        mt={0}
      >
        © {new Date().getFullYear()} {name}
      </Styled.p>
    </Flex>
  )
}

export default Footer

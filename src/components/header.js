import { Link } from "gatsby"
/** @jsx jsx */
import { jsx, Styled, Flex } from "theme-ui"

const Header = ({ name, menu, extMenu }) => (
  <Flex sx={{ alignItems: "center", p: "0 2%", bg: "muted" }}>
    <h1 sx={{ fontWeight: "medium" }}>
      <Styled.a
        as={Link}
        to="/"
        sx={{
          textDecoration: "none",
          ":visited,:hover,:active": {
            textDecoration: "inherit",
          },
        }}
      >
        {name}
      </Styled.a>
    </h1>
    <Flex sx={{ justifyContent: "flex-end", flexGrow: 1, flexWrap: "wrap" }}>
      {extMenu.map(({ label, url }, i) => (
        <h4
          key={i}
          sx={{ fontWeight: "normal", m: "0 0.5em" }}
          style={{ fontSize: "1em" }}
        >
          <Styled.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textDecoration: "none",
              ":visited,:hover,:active": {
                textDecoration: "inherit",
              },
            }}
          >
            {label}
          </Styled.a>
        </h4>
      ))}
      {menu.map(({ label, url }, i) => (
        <h4 key={i} sx={{ fontWeight: "normal", m: "0 0.5em" }}>
          <Styled.a
            as={Link}
            to={url}
            sx={{
              textDecoration: "none",
              ":visited,:hover,:active": {
                textDecoration: "inherit",
              },
            }}
          >
            {label}
          </Styled.a>
        </h4>
      ))}
    </Flex>
  </Flex>
)

export default Header

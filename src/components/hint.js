/** @jsx jsx */

import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons"

const Info = ({ children }) => (
  <Styled.p
    sx={{
      p: 3,
      boxShadow: "md",
      borderLeftStyle: "solid",
      borderLeftWidth: "4",
      borderLeftColor: "blue.4",
      bg: "blue.1",
      color: "blue.8",
    }}
  >
    <FontAwesomeIcon icon={faInfoCircle} /> {children}
  </Styled.p>
)

const Warn = ({ children }) => (
  <Styled.p
    sx={{
      p: 3,
      boxShadow: "md",
      borderLeftStyle: "solid",
      borderLeftWidth: "4",
      borderLeftColor: "yellow.4",
      bg: "yellow.1",
      color: "yellow.8",
    }}
  >
    <FontAwesomeIcon icon={faExclamationTriangle} /> {children}
  </Styled.p>
)

export { Info, Warn }

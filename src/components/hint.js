/** @jsx jsx */

import { jsx, Styled } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons"

const Info = ({ children }) => (
  <Styled.p sx={{ bg: "blue.2", p: "1em" }}>
    <FontAwesomeIcon icon={faInfoCircle} /> {children}
  </Styled.p>
)

const Warn = ({ children }) => (
  <Styled.p sx={{ bg: "yellow.2", p: "1em" }}>
    <FontAwesomeIcon icon={faExclamationTriangle} /> {children}
  </Styled.p>
)

export { Info, Warn }

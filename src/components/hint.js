/** @jsx jsx */

import { jsx, Styled, Flex, Box } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons"

const Info = ({ children, icon, color }) => (
  <Flex
    sx={{
      my: 4,
      borderLeftStyle: "solid",
      borderLeftColor: color || "info",
      borderLeftWidth: "4",
      alignItems: "center",
    }}
  >
    <Box sx={{ px: 3, color: color || "info", fontSize: 2 }}>
      <FontAwesomeIcon icon={icon || faInfoCircle} />
    </Box>
    <Box sx={{ pr: 3, fontSize: 0, flex: 1 }}>
      <Styled.p sx={{ m: 0 }}>{children}</Styled.p>
    </Box>
  </Flex>
)

const Warn = ({ ...props }) => (
  <Info {...props} icon={faExclamationTriangle} color="warning" />
)

export { Info, Warn }

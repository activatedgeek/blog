import React from "react"
import ThemeUIPrism from "@theme-ui/prism"
import PrismCore from "prismjs/components/prism-core"

import "prismjs/components/prism-bash"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-yaml"
// import 'prismjs/components/prism-json'
import "prismjs/components/prism-python"
// import 'prismjs/components/prism-regex'
import "prismjs/components/prism-sql"

const components = {
  pre: props => props.children,
  code: props => <ThemeUIPrism {...props} Prism={PrismCore} />,
}

export default components

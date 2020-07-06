const visit = require("unist-util-visit")
const yaml = require("js-yaml")

module.exports = _ref => {
  let markdownAST = _ref.markdownAST

  visit(markdownAST, "code", node => {
    if (node.lang === "vega") {
      const { specUrl } = yaml.safeLoad(node.value)

      node.type = "jsx"
      node.value = `<LazyVega specUrl="${specUrl}" />`
    }
  })

  return markdownAST
}

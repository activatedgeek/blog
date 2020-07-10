const visit = require("unist-util-visit")
const yaml = require("js-yaml")

module.exports = _ref => {
  let markdownAST = _ref.markdownAST
  let id = 0

  visit(markdownAST, "code", node => {
    if (node.lang === "vega") {
      const { specUrl } = yaml.safeLoad(node.value)

      id += 1
      node.type = "jsx"
      node.value = `<LazyVega id="${id}" specUrl="${specUrl}" />`
    }
  })

  return markdownAST
}

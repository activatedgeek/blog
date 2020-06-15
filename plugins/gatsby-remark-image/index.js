const visit = require("unist-util-visit")

module.exports = _ref => {
  let markdownAST = _ref.markdownAST

  visit(markdownAST, "image", node => {
    const { url, title, alt } = node

    node.type = "jsx"
    node.value = `<Image src="${url}" alt="${alt || title}" title="${title ||
      alt}" />`
  })

  return markdownAST
}

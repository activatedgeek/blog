const visit = require("unist-util-visit")

module.exports = _ref => {
  let markdownAST = _ref.markdownAST
  let id = 0

  visit(markdownAST, "image", node => {
    const { url, title, alt } = node

    id += 1

    node.type = "jsx"
    node.value = `<LazyImage id="${id}" src="${url}" ${
      alt ? `alt="${alt}"` : ""
    } ${title ? `title="${title}"` : ""} />`
  })

  return markdownAST
}

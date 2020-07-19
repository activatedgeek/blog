const visit = require("unist-util-visit")

module.exports = _ref => {
  let markdownAST = _ref.markdownAST

  visit(markdownAST, "link", node => {
    const targetAttrs = {
      target: node.url.indexOf("#") === -1 ? `_blank` : undefined,
      rel: `noopener noreferrer`,
    }

    node.data = {
      htmlAttributes: {
        ...targetAttrs,
      },
      hProperties: {
        ...targetAttrs,
      },
    }
  })

  return markdownAST
}

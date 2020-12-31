const visit = require("unist-util-visit")
const assert = require("assert")

module.exports = _ref => {
  let markdownAST = _ref.markdownAST

  let ref_id = 0
  let refs = {}

  visit(markdownAST, "footnoteDefinition", node => {
    let paragraph = node.children[0]
    let labelEntry

    if (node.identifier.startsWith("@")) {
      if (!(node.identifier in refs)) {
        ref_id += 1
      }

      refs[node.identifier] = refs[node.identifier] || ref_id

      labelEntry = {
        type: "emphasis",
        children: [{ type: "text", value: `[R${refs[node.identifier]}] ` }],
      }
    } else {
      labelEntry = {
        type: "emphasis",
        children: [{ type: "text", value: `[${node.identifier}] ` }],
      }
    }

    paragraph.children.splice(0, 0, labelEntry)
  })

  visit(markdownAST, "footnoteReference", node => {
    if (node.identifier.startsWith("@")) {
      node.label = `[R${refs[node.identifier]}]`
    } else {
      node.label = `[${node.label}]`
    }
  })

  return markdownAST
}

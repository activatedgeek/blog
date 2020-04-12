const visit = require("unist-util-visit")
const Cite = require("citation-js")

module.exports = _ref => {
  var markdownAST = _ref.markdownAST

  let bibmap = {}

  visit(markdownAST, "code", node => {
    if (node.lang === "bib") {
      const refs = Cite(node.value)
      const bibjson = JSON.parse(refs.format("data"))
      bibmap = bibjson.reduce((acc, { id }, i) => {
        acc[id] = i
        return acc
      }, {})

      const bibtext = refs
        .format("bibliography", { template: "harvard1" })
        .trim()
        .split("\n")

      node.type = "list"
      node.ordered = true
      node.start = 1
      node.data = {
        htmlAttributes: {
          class: `bibref`,
        },
        hProperties: {
          class: `bibref`,
        },
      }
      node.children = bibtext.map((txt, i) => ({
        type: "listItem",
        data: {
          htmlAttributes: {
            id: `bibitem-${i}`,
            class: `bibitem`,
          },
          hProperties: {
            id: `bibitem-${i}`,
            class: `bibitem`,
          },
        },
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                value: txt,
              },
            ],
          },
        ],
      }))
    }
  })

  visit(markdownAST, "text", (node, index, parent) => {
    const re = /\\c\ite{((\w),?)+}/g
    let matches = []
    while ((match = re.exec(node.value)) !== null) {
      matches.push({ s: match.index, e: re.lastIndex })
    }

    if (matches.length) {
      let newChildren = []

      if (matches[0].s) {
        newChildren.push({
          type: "text",
          value: node.value.slice(0, matches[0].s),
        })
      }

      matches.forEach((m, i) => {
        const citestr = node.value.slice(m.s + 6, m.e - 1).trim()
        const citeid = citestr.split(",").map(cname => bibmap[cname.trim()])

        const refstr = citeid
          .map(
            cid => `<a class="biblink" href="#bibitem-${cid}">${cid + 1}</a>`
          )
          .join(", ")

        newChildren.push({
          type: "html",
          value: `<span>[${refstr}]</span>`,
        })

        if (i < matches.length - 1) {
          newChildren.push({
            type: "text",
            value: node.value.slice(matches[i].e, matches[i + 1].s),
          })
        }
      })

      if (matches[matches.length - 1].e < node.value.length) {
        newChildren.push({
          type: "text",
          value: node.value.slice(matches[matches.length - 1].e),
        })
      }

      parent.children = [
        ...parent.children.slice(0, index),
        ...newChildren,
        ...parent.children.slice(index + 1),
      ]
    }
  })

  return markdownAST
}

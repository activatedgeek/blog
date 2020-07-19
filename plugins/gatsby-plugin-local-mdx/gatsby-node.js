const path = require("path")
const moment = require("moment")
const slugger = require("github-slugger").slug

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MdxFrontmatter {
      title: String!
      description: String
      area: String!
      cat: String!
      date: Date @dateformat
      updated: Date @dateformat
      slug: String!
      permid: String!
      draft: Boolean
      archive: Boolean
      redirectsFrom: [String]
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = (
  { node, reporter, actions, getNode },
  { orgsys: { areas } }
) => {
  if (node.internal.type !== "Mdx") {
    return
  }

  const { createNodeField } = actions

  const fileNode = getNode(node.parent)
  const { title, area, cat, slug } = node.frontmatter
  let { date, updated, _options } = node.frontmatter
  _options = _options || {}

  if (area !== undefined) {
    if (area in areas) {
      if (!(cat in areas[area].categories)) {
        reporter.panicOnBuild(
          `ERROR: ${fileNode.relativePath} - Undefined category "${cat}" in area "${area}".`
        )
      }
    } else {
      reporter.panicOnBuild(
        `ERROR: ${fileNode.relativePath} - Undefined/missing area "${area}".`
      )
    }
  } else {
    reporter.panicOnBuild(
      `ERROR: ${fileNode.relativePath} - Missing category."`
    )
  }

  if (date === undefined) {
    reporter.warn(`WARN: ${fileNode.relativePath} - Missing creation date`)
  }

  if (date !== undefined) {
    date = new Date(date)
    if (!(date instanceof Date && !isNaN(date.getTime()))) {
      reporter.panicOnBuild(
        `ERROR: ${fileNode.relativePath} - Invalid creation date.`
      )
    }
  }

  if (updated !== undefined) {
    updated = new Date(updated)
    if (!(updated instanceof Date && !isNaN(updated.getTime()))) {
      reporter.panicOnBuild(
        `ERROR: ${fileNode.relativePath} - Invalid updated date.`
      )
    }
  }

  node.frontmatter = {
    ...node.frontmatter,
    date: date !== undefined ? moment(date).format() : date,
    updated: updated !== undefined ? moment(updated).format() : updated,
    slug: slug || `/kb/${slugger(title)}`,
    permid: `${area}.${cat}.${moment(date).format("YYYYMMDD.HHmmss")}`,
  }

  createNodeField({
    node,
    name: "filedUnder",
    value: `${areas[area].label} :: ${areas[area].categories[cat].label}`,
  })
  createNodeField({
    node,
    name: "template",
    value: _options.template || "default",
  })

  delete node.frontmatter._options
}

exports.createPages = async (
  { graphql, actions, reporter },
  { templatesDir, templateMap }
) => {
  const { createPage, createRedirect } = actions

  const createAllPages = async function() {
    const result = await graphql(`
      {
        allMdx {
          edges {
            node {
              id
              frontmatter {
                slug
                redirectsFrom
              }
              fields {
                template
              }
            }
          }
        }
      }
    `)

    if (result.errors) {
      reporter.panicOnBuild('🚨  ERROR: Loading "createAllPages" query')
    }

    result.data.allMdx.edges.forEach(
      ({
        node: {
          id,
          frontmatter: { slug, redirectsFrom },
          fields: { template },
        },
      }) => {
        createPage({
          path: slug,
          component: path.resolve(
            `${templatesDir}/${templateMap[template]}.js`
          ),
          context: { id },
        })

        if (Array.isArray(redirectsFrom)) {
          redirectsFrom.forEach(fromPath => {
            createRedirect({ fromPath, toPath: slug, isPermanent: true })
          })
        }
      }
    )
  }

  await createAllPages()
}

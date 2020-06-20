const path = require("path")
const moment = require("moment")
const assert = require("assert")

const siteMetadata = require(`./site/metadata`)

const templatesDir = "./src/templates"
const categoryTemplateMap = {
  blog: "post",
  kb: "kb_post",
  info: "post",
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MdxFrontmatter {
      title: String!
      description: String
      slug: String!
      date: Date @dateformat
      updated: Date @dateformat
      category: [String]
      tags: [String]
      draft: Boolean
      archive: Boolean
      menuList: Boolean
      label: String
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    let { date, updated, slug, category } = node.frontmatter
    category = category || []

    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    // Assign default category to the root folder.
    const defaultcategory = parsedFilePath.dir
      .replace(/\//g, " ")
      .trim()
      .split(" ")[0]

    if (defaultcategory.length) {
      category = [defaultcategory, ...category]
    }

    if (slug === undefined) {
      slug = `/${parsedFilePath.dir}`
      if (parsedFilePath.name !== "index") {
        slug = `${slug}/${parsedFilePath.name}`
      }
    }

    if (date !== undefined) {
      date = new Date(date)
      assert(date instanceof Date && !isNaN(date.getTime()))
      date = moment(date).format()
    }

    if (updated !== undefined) {
      updated = new Date(updated)
      assert(updated instanceof Date && !isNaN(updated.getTime()))
      updated = moment(updated).format()
    }

    node.frontmatter = {
      ...node.frontmatter,
      date,
      updated,
      slug,
      category,
    }

    createNodeField({
      node,
      name: "template",
      value: defaultcategory || "blog",
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const createAllPages = async function() {
    const result = await graphql(`
      {
        allMdx {
          edges {
            node {
              id
              fields {
                template
              }
              frontmatter {
                slug
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
          fields: { template },
          frontmatter: { slug },
        },
      }) => {
        createPage({
          path: slug,
          component: path.resolve(
            `${templatesDir}/${categoryTemplateMap[template]}.js`
          ),
          context: { id },
        })
      }
    )
  }

  const createAllTagPages = async function() {
    const result = await graphql(`
      {
        allMdx(filter: { frontmatter: { category: { eq: "blog" } } }) {
          group(field: frontmatter___tags) {
            tag: fieldValue
            totalCount
          }
        }
      }
    `)

    if (result.errors) {
      reporter.panicOnBuild('🚨  ERROR: Loading "createAllTagPages" query')
    }

    result.data.allMdx.group.forEach(({ tag }) => {
      createPage({
        path: `/blog/tags/${encodeURIComponent(tag)}`,
        component: path.resolve(`${templatesDir}/list.js`),
        context: { tag },
      })
    })
  }

  createAllPages()
  createAllTagPages()
}

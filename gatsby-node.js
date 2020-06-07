const path = require("path")
const fs = require("fs")

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MdxFrontmatter {
      draft: Boolean
      archive: Boolean
      date: Date
      category: [String!]
      tags: [String!]
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  // const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    let { date, draft, category, tags } = node.frontmatter
    category = category || []
    tags = tags || []
    draft = draft || false

    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    // Assign default category to the root folder.
    const defaultcategory = parsedFilePath.dir
      .replace(/\//g, " ")
      .trim()
      .split(" ")[0]
    if (defaultcategory.length) {
      category.push(defaultcategory)
    }

    let slug = `/${parsedFilePath.dir}`
    if (parsedFilePath.name !== "index") {
      slug = `${slug}/${parsedFilePath.name}`
    }
    if (draft === true) {
      slug = `${slug}/draft`
    }

    if (date === undefined) {
      const { birthtimeMs } = fs.statSync(node.fileAbsolutePath)
      date = birthtimeMs
    }
    const createdMs = new Date(date).getTime()

    if (isNaN(createdMs)) {
      console.warn(`Unable to parse date in "${node.fileAbsolutePath}"`)
    }

    if (draft === undefined) {
      draft = false
    }

    node.frontmatter.slug = slug
    node.frontmatter.createdMs = createdMs
    node.frontmatter.category = category
    node.frontmatter.tags = tags
    node.frontmatter.draft = draft
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const createAllPages = async function(componentPath) {
    const result = await graphql(`
      {
        allMdx {
          edges {
            node {
              id
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
          frontmatter: { slug },
        },
      }) => {
        createPage({
          path: slug,
          component: path.resolve(componentPath),
          context: { id },
        })
      }
    )
  }

  const createAllTagPages = async function(componentPath) {
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
        component: path.resolve(componentPath),
        context: { tag },
      })
    })
  }

  createAllPages(`./src/templates/post.js`)
  createAllTagPages(`./src/templates/post_index.js`)
}

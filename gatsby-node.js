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
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  // const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    let { date, draft, category } = node.frontmatter
    category = category || []

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
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const createSubcontent = async function(componentPath) {
    const result = await graphql(`
      {
        allMdx {
          edges {
            node {
              id
              frontmatter {
                slug
                draft
              }
            }
          }
        }
      }
    `)

    if (result.errors) {
      reporter.panicOnBuild('🚨  ERROR: Loading "createSubcontent" query')
    }

    result.data.allMdx.edges.forEach(
      ({
        node: {
          id,
          frontmatter: { slug, draft },
        },
      }) => {
        if (process.env.NODE_ENV === "production") {
          if (draft === true) {
            return
          }
        }
        createPage({
          path: slug,
          component: path.resolve(componentPath),
          context: { id },
        })
      }
    )
  }

  createPage({
    path: `/blog`,
    component: path.resolve(`./src/components/blog_index.js`),
    context: { c: "blog" },
  })

  createSubcontent(`./src/components/blog_page.js`)
}

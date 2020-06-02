const path = require("path")
const fs = require("fs")

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MdxFrontmatter {
      slug: String
      draft: Boolean
      date: Date
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    let { slug, date, draft } = node.frontmatter

    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    const subcontent = parsedFilePath.dir
      .replace(/\//g, " ")
      .trim()
      .split(" ")[0]

    if (slug === undefined) {
      slug = `/${parsedFilePath.dir}`
      if (parsedFilePath.name !== "index") {
        slug = `${slug}/${parsedFilePath.name}`
      }
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

    createNodeField({
      name: "subcontent",
      node,
      value: subcontent || "default",
    })
    createNodeField({
      name: "index",
      node,
      value: process.env.NODE_ENV === "production" ? !draft : true,
    })
    createNodeField({
      name: "slug",
      node,
      value: slug,
    })
    createNodeField({
      name: "createdMs",
      node,
      value: createdMs,
    })
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
                draft
              }
              fields {
                slug
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
          fields: { slug },
          frontmatter: { draft },
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
  })

  createSubcontent(`./src/components/blog_page.js`)
}

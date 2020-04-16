const path = require("path")
const fs = require("fs")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    let slug
    let createdMs

    if (node.hasOwnProperty("frontmatter")) {
      if (node.frontmatter.hasOwnProperty("slug")) {
        slug = node.frontmatter.slug
      }
      if (node.frontmatter.hasOwnProperty("date")) {
        createdMs = new Date(node.frontmatter.date).getTime()
      }
    }

    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    const subcontent = parsedFilePath.dir
      .replace(/\//g, " ")
      .trim()
      .split(" ")[0]

    if (slug === undefined) {
      if (parsedFilePath.dir !== "") {
        slug = `/${parsedFilePath.dir}`
      }
      if (parsedFilePath.name !== "index") {
        slug = `${slug}/${parsedFilePath.name}/`
      }
    }

    const { birthtimeMs, mtimeMs } = fs.statSync(node.fileAbsolutePath)
    createdMs = createdMs || birthtimeMs

    createNodeField({
      name: "subcontent",
      node,
      value: subcontent,
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
    createNodeField({
      name: "modifiedMs",
      node,
      value: mtimeMs,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const createSubcontent = async function(subcontent, componentPath) {
    const result = await graphql(`
      {
        allMdx (filter: {fields: {subcontent: {eq: "${subcontent}"}}}) {
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
      ({ node: { id, fields, frontmatter } }) => {
        if (process.env.NODE_ENV === "production") {
          if (frontmatter.draft === true) {
            return
          }
        }
        createPage({
          path: fields.slug,
          component: path.resolve(componentPath),
          context: { id },
        })
      }
    )
  }

  createPage({
    path: `/blog`,
    component: path.resolve(`./src/components/blog.js`),
  })

  createSubcontent(`blog`, `./src/components/blog_page.js`)
  createSubcontent(`about`, `./src/components/blog_page.js`)
  createSubcontent(`kb`, `./src/components/blog_page.js`)
}

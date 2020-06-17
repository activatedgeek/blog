module.exports = {
  siteMetadata: require(`./site/metadata`),
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: { icon: false },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
          {
            resolve: require.resolve(`./plugins/gatsby-remark-image`),
          },
          {
            resolve: require.resolve(`./plugins/gatsby-remark-bibtex`),
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/site/content`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sanyam Kapoor`,
        short_name: `Sanyam Kapoor`,
        start_url: `/`,
        background_color: `#e2e8f0`,
        theme_color: `#2b6cb0`,
        display: `standalone`,
        icon: `static/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              name
              description
              author
              siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            output: `/rss.xml`,
            title: `Sanyam Kapoor's RSS Feed`,
            query: `
            {
              allMdx(
                filter: { frontmatter: { draft: { ne: true } } }
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    id
                    frontmatter {
                      title
                      description
                      category
                      slug
                    }
                    fields {
                      createdMs
                    }
                  }
                }
              }
            }
            `,
            serialize: ({
              query: {
                site: {
                  siteMetadata: { siteUrl, author },
                },
                allMdx,
              },
            }) => {
              return allMdx.edges.map(
                ({
                  node: {
                    id,
                    frontmatter: { title, description, category, slug },
                    fields: { createdMs },
                  },
                }) =>
                  Object.assign(
                    {},
                    {
                      title,
                      description,
                      url: `${siteUrl}${slug}`,
                      guid: id,
                      categories: category,
                      author,
                      date: new Date(createdMs),
                    }
                  )
              )
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-goatcounter`,
      options: {
        code: "sanyamkapoor",
        exclude: [],
        pageTransitionDelay: 0,
        head: false,
        pixel: false,
        allowLocal: false,
        localStorageKey: "skipgc",
      },
    },
  ],
}

const moment = require(`moment`)
const siteMetadata = require(`./site/metadata`)

module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: require.resolve(`./plugins/gatsby-remark-links`),
          },
          {
            resolve: require.resolve(`./plugins/gatsby-remark-image`),
          },
          {
            resolve: require.resolve(`./plugins/gatsby-remark-bibtex`),
          },
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
            output: `/rss/blog.xml`,
            title: `Sanyam Kapoor's Blog RSS Feed`,
            query: `
            {
              allMdx(
                filter: { frontmatter: { category: { in: "blog" }, draft: { ne: true } } }
                sort: { fields: frontmatter___date, order: DESC }
              ) {
                edges {
                  node {
                    id
                    frontmatter {
                      title
                      description
                      date
                      category
                      slug
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
                    frontmatter: { title, description, date, category, slug },
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
                      date: moment(new Date(date)).format(),
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
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "index",
        engine: "flexsearch",
        engineOptions: "speed",
        query: `
        {
          allMdx(
            filter: { frontmatter: { draft: { ne: true } } }
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
                  description
                  date
                  tags
                  slug
                  archive
                  draft
                }
                rawBody
              }
            }
          }
        }
        `,
        ref: "id",
        index: ["title", "description", "rawBody"],
        store: ["title", "tags", "slug", "archive", "draft", "date"],
        normalizer: ({
          data: {
            allMdx: { edges },
          },
        }) =>
          edges.map(
            ({
              node: {
                id,
                frontmatter: {
                  title,
                  description,
                  date,
                  tags,
                  slug,
                  archive,
                  draft,
                },
              },
            }) => ({
              id,
              title,
              description,
              date,
              tags,
              slug,
              archive,
              draft,
            })
          ),
      },
    },
  ],
}

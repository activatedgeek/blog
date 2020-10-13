const siteMetadata = require(`./site/metadata`)
const visit = require(`unist-util-visit`)
const moment = require(`moment`)

const orgsys = require(`./site/orgsys`)
const { processFrontmatter } = require(`./src/utils`)

const getSearchText = ast => {
  let searchText = []

  visit(ast, "text", n => {
    searchText.push(n.value)
  })

  return searchText.join(" ")
}

const allQuery = `
{
  allMdx(
    filter: { frontmatter: { draft: { ne: true } } }
  ) {
    edges {
      node {
        id
        mdxAST
        frontmatter {
          title
          description
          area
          cat
          slug
          archive
          draft
          date
          updated
          day: date(formatString: "MMM D")
          year: date(formatString: "YYYY")
          updatedDay: updated(formatString: "MMM D")
          updatedYear: updated(formatString: "YYYY")
        }
      }
    }
  }
}
`

const gatsbyRemarkPlugins = [
  {
    resolve: require.resolve(`./plugins/gatsby-remark-local-links`),
  },
  {
    resolve: require.resolve(`./plugins/gatsby-remark-local-image`),
  },
  {
    resolve: require.resolve(`./plugins/gatsby-remark-local-bibtex`),
  },
  {
    resolve: require.resolve(`./plugins/gatsby-remark-local-vega`),
  },
  {
    resolve: `gatsby-remark-autolink-headers`,
    options: { icon: false },
  },
]

const gatsbyPlugins = [
  {
    resolve: `@jamesdanylik/gatsby-source-goodreads`,
    options: {
      key: process.env.GOODREADS_API_KEY,
      id: "25941036",
    },
  },
  {
    resolve: `gatsby-source-tmdb`,
    options: {
      apiKey: process.env.TMDB_API_KEY,
      sessionID: process.env.TMDB_SESSION_ID,
      modules: {
        account: {
          activate: true,
          endpoints: {
            tvs: [`accountFavoriteTv`],
            movies: [`accountFavoriteMovies`],
          },
        },
      },
      poster: false,
      backdrop: false,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/site/contents`,
      name: `contents`,
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`, `.md`],
      gatsbyRemarkPlugins,
    },
  },
  {
    resolve: `gatsby-plugin-local-mdx`,
    options: {
      templatesDir: `src/templates`,
      templateMap: {
        default: "page",
        overview: "overview",
      },
      orgsys,
    },
  },
  {
    resolve: "gatsby-plugin-local-search",
    options: {
      name: "index",
      engine: "flexsearch",
      engineOptions: "speed",
      query: allQuery,
      ref: "id",
      index: ["title", "description", "searchText"],
      store: [
        "title",
        "area",
        "cat",
        "slug",
        "archive",
        "draft",
        "day",
        "year",
      ],
      normalizer: ({
        data: {
          allMdx: { edges },
        },
      }) =>
        edges.map(({ node: { id, mdxAST, frontmatter } }) => ({
          id,
          searchText: getSearchText(mdxAST),
          ...processFrontmatter(frontmatter),
        })),
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Sanyam Kapoor`,
      short_name: `Sanyam Kapoor`,
      start_url: `/`,
      background_color: `white`,
      theme_color: `#426bb3`,
      display: `standalone`,
      icon: `static/images/icon.png`,
    },
  },
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-theme-ui`,
  `gatsby-plugin-offline`
]

if (process.env.NODE_ENV === "production") {
  const prodGatsbyRemarkPlugins = [
    {
      resolve: `gatsby-remark-katex`,
      options: {
        strict: `ignore`,
      },
    },
  ]

  gatsbyRemarkPlugins.push(...prodGatsbyRemarkPlugins)

  const prodPlugins = [
    {
      resolve: `gatsby-plugin-goatcounter`,
      options: {
        code: process.env.GOATCOUNTER_CODE,
        exclude: [],
        pageTransitionDelay: 0,
        head: false,
        pixel: false,
        allowLocal: false,
        localStorageKey: "skipgc",
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                name
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            output: "/rss.xml",
            title: "Sanyam Kapoor's RSS Feed",
            query: allQuery,
            serialize: ({
              query: {
                allMdx: { edges },
              },
            }) =>
              edges.map(
                ({
                  node: {
                    frontmatter: {
                      title,
                      description,
                      slug,
                      area,
                      cat,
                      date,
                      updated,
                    },
                  },
                }) => ({
                  title,
                  description,
                  url: `${siteMetadata.siteUrl}${slug}`,
                  categories: [
                    orgsys.areas[area].label,
                    orgsys.areas[area].categories[cat].label,
                  ],
                  author: siteMetadata.author,
                  date: moment(new Date(date || updated)).format(
                    `ddd, DD, MMM YYYY HH:MM:ss ZZ`
                  ),
                })
              ),
          },
        ],
      },
    },
    `gatsby-plugin-netlify`,
  ]

  gatsbyPlugins.push(...prodPlugins)
}

module.exports = {
  siteMetadata,
  plugins: gatsbyPlugins,
}

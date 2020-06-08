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
            resolve: require.resolve(`./src/plugins/gatsby-remark-bibtex`),
          },
        ],
        remarkPlugins: [
          require(`remark-math`),
          require(`remark-html-katex`),
          require(`remark-emoji`),
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
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
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

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
            resolve: `gatsby-remark-table-of-contents`,
            options: { tight: true },
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
  ],
}

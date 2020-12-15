module.exports = {
  dateFormat: `MMM D YYYY, H:m ZZ`,
  name: `Perhaps, Bayes`,
  description: `Website and knowledge base.`,
  author: `Sanyam Kapoor`,
  siteUrl:
    process.env.NODE_ENV === "production"
      ? `https://im.perhapsbay.es`
      : `http://localhost:8000`,
  social: {
    scholar: "https://www.semanticscholar.org/author/Sanyam-Kapoor/153936584",
    github: "https://github.com/activatedgeek",
    yc: "https://news.ycombinator.com/user?id=activatedgeek",
    linkedin: "https://www.linkedin.com/in/sanyamkapoor",
    stackoverflow: "https://stackoverflow.com/users/2425365",
    twitter: "https://twitter.com/snymkpr",
  },
}

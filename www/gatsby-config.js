module.exports = {
  siteMetadata: {
    title: `Aniket Handa`,
    name: `Aniket Handa`,
    siteUrl: `https://anikethanda.com`,
    description: `Personal website of Aniket Handa. User Experience Engineer and Prototyper`,
    hero: {
      heading: `Hello!`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/anikethanda`,
      },
      {
        name: `github`,
        url: `https://github.com/atneik`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/_aniket`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/atneik/`,
      }
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Aniket Handa`,
        short_name: `Aniket`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
  ],
};

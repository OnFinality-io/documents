module.exports = {
  title: "OnFinality Document Hub",
  themeConfig: {
    nav: [],
    sidebarDepth: 2,
    sidebar: [
      {
        title: "Home",
        path: "/",
      },
    ],
  },
  plugins: [
    ['fulltext-search'],
    ['@vuepress/plugin-google-analytics'],
  ],
  markdown: {
    extractHeaders: ['h2','h3','h4'],
  }
};

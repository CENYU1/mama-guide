module.exports = {
  plugins: [
    ["@vuepress/medium-zoom"],
    [
      "vuepress-plugin-mathjax",
      {
        target: "svg",
        macros: {
          "*": "\\times",
        },
      },
    ],
  ],
  themeConfig: {
    sidebar: "auto",
  },
}

import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MioYi's Blog",
  titleTemplate: ":title | MioYi's Blog",
  description: "Powered by VitePress",
  lang: "zh-CN",
  markdown: {
    math: true,
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },
  head: [["link", { rel: "icon", href: "/avatar.png" }]],
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    search: {
      provider: "local",
    },
    nav: [
      { text: "主页", link: "/" },
      { text: "博客", link: "/blogs" },
      { text: "关于", link: "/about" },
    ],
    footer: {
      message: "Powered by VitePress (MIT License)",
      copyright: "Copyright © 2025-present MioYi Sama",
    },
    sidebar: [
      {
        text: "类目",
        items: [
          {
            text: "AI",
            link: "/blogs#ai",
          },
          {
            text: "Web",
            link: "/blogs#web",
          },
          {
            text: "Kotlin",
            link: "/blogs#kotlin",
          },
          {
            text: "OS",
            link: "/blogs#os",
          },
          {
            text: "其他",
            link: "/blogs#其他",
          },
        ],
      },
    ],
  },
});

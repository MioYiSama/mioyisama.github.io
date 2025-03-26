---
layout: home
hero:
  text: MioYi's Blog
  actions:
    - theme: brand
      text: 博客
      link: /blogs
    - theme: alt
      text: 关于
      link: /about
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    name: 'MioYi',
    avatar: '/avatar.png',
    links: [
      { icon: 'bilibili', link: 'https://space.bilibili.com/3546701476399826' },
      { icon: 'github', link: 'https://github.com/MioYiSama' }
    ]
  }
]
</script>

<VPTeamMembers :members="members" />

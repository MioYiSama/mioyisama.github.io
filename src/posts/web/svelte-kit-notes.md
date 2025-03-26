#  Svelte Kit 笔记

版本：

- Svelte Kit：2.x

[[toc]]

## Svelte Kit 基础

### 介绍

Svelte Kit解决了：

- 路由（Routing）
- 服务端渲染（SSR）
- 数据抓取
- TypeScript
- 预渲染（构建期）
- 单页面应用（SPA）
- 库打包
- 优化后的生产构建
- 项目部署

### 路由

- 基于文件系统
- 布局（`+layout.svelte`）

```svelte
<script>
  let { children } = $props();
</script>

<nav>
  <a href="/">home</a>
  <a href="/about">about</a>
</nav>

{@render children()}
```

- 动态参数

使用`.../[param]/...`、`.../[foo]-[bar]/...`

### 加载数据

- 页面数据（`+page.server.js`）

```js
import { posts } from './data.js';

export function load() {
  return {
    summaries: posts.map((post) => ({
      slug: post.slug,
      title: post.title
    }))
  };
}
```

```svelte
<script>
  let { data } = $props();
</script>

<ul>
  {#each data.summaries as { slug, title }}
    <li><a href="/blog/{slug}">{title}</a></li>
  {/each}
</ul>
```

- 布局数据（`+layout.server.js`）

> 为所有页面和布局组件提供数据

### 标头和Cookies

- 设置标头

```js
// +page.server.js
export function load({ setHeaders }) {
  setHeaders({
    'Content-Type': 'text/plain'
  });
}
```

- Cookies

```js
export function load({ cookies }) {
  const visited = cookies.get('visited');

  cookies.set('visited', 'true', { path: '/' });

  return {
    visited: visited === 'true'
  };
}
```

### 共享模块

`$lib`：自动替换为`./src/lib`

### 表单

- 默认action

```svelte
<form method="POST">
</form>
```

```js
// +page.server.js
export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    db.createTodo(cookies.get('userid'), data.get('description'));
  }
};
```

- 命名actions

```svelte
<form method="POST" action="?/create">
</form>

<form method="POST" action="?/delete">
</form>
```

```js
// +page.server.js
export const actions = {
  create: async ({ cookies, request }) => {
    const data = await request.formData();
    db.createTodo(cookies.get('userid'), data.get('description'));
  },

  delete: async ({ cookies, request }) => {
    const data = await request.formData();
    db.deleteTodo(cookies.get('userid'), data.get('id'));
  }
};
```

- 校验

```js
// +page.server.js
import { fail } from '@sveltejs/kit';

export const actions = {
  create: async ({ cookies, request }) => {
    // ...
    
    return fail(422, {
      description: data.get('description'),
      error: error.message
    });
  }
}
```

```svelte
<script>
  let { data, form } = $props();
</script>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

<form method="POST" action="?/create">
  <label>
    add a todo:
    <input
      name="description"
      value={form?.description ?? ''}
      autocomplete="off"
      required
    />
  </label>
</form>
```

- 渐进增强（`$app/forms/enhance`）

> 阻止表单的默认全页面刷新，改为通过 JavaScript 在后台提交数据

```svelte
<script>
  import { enhance } from "$app/forms";
</script>
<form use:enhance>
</form>
```

- 自定义`enhance`

```svelte
<form
  method="POST"
  action="?/create"
  use:enhance={() => {
    creating = true;

    return async ({ update }) => {
      await update();
      creating = false;
    };
  }}
>
</form>

{#if creating}
  <span class="saving">saving...</span>
{/if}
```

### API路由

`+server.js`

```js
import { json } from '@sveltejs/kit';

export function GET() {
  const number = Math.floor(Math.random() * 6) + 1;

  return new Response(number, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  // 简化写法：
  return json(number);
}

export async function POST({ request, cookies }) {
  const { description } = await request.json();

  const userid = cookies.get('userid');
  const { id } = await database.createTodo({ userid, description });

  return json({ id }, { status: 201 });
}

export async function PUT({ params, request, cookies }) {
  const { done } = await request.json();
  const userid = cookies.get('userid');

  await database.toggleTodo({ userid, id: params.id, done });
  return new Response(null, { status: 204 });
}

export async function DELETE({ params, cookies }) {
  const userid = cookies.get('userid');

  await database.deleteTodo({ userid, id: params.id });
  return new Response(null, { status: 204 });
}
```

### `$app/state`

TODO

### 「错误」与「重定向」

TODO

## Svelte Kit 进阶

### 钩子

TODO

### 页面选项

- `ssr` ：是否进行服务器端渲染
- `csr` ：是否进行客户端渲染（涉及页面交互等）
- `prerender` ：是否在构建时（而非请求时）预渲染页面
- `trailingSlash`： 是否在 URL 中去除、添加或忽略尾部斜杠

```js
// +page.server.js
export const ssr = false;
export const csr = false;
export const prerender = false;
export const trailingSlash = "always";
```

### 链接

TODO

### 「路由」进阶

TODO

### 「数据加载」进阶

TODO

### 环境变量

- static：构建时确定的环境变量
- dynamic：运行时确定的环境变量
- private：不暴露给浏览器的环境变量（只能在`.server.js`文件中使用）
- public：暴露给浏览器的环境变量

```js
import { env } from "$env/static/private";
import { env } from "$env/dynamic/private";
import { env } from "$env/static/public";
import { env } from "$env/dynamic/public";
```


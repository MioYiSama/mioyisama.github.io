# Svelte 笔记

版本：

- Svelte：5.x

[[toc]]

## Svelte 基础

### 介绍

- 使用`{}`嵌入JS表达式

```svelte
<script>
  let src = '/tutorial/image.gif';
  let name = 'Rick Astley';
</script>

<p>Name: {name}</p>
<img src={src}/>

<!-- 语法糖 -->
<img {src} />
```

- 使用`<style>`加入样式

```svelte
<p>This is a paragraph.</p>

<style>
  p {
    color: goldenrod;
    font-size: 2em;
  }
</style>
```

- 导入和使用组件

```svelte
<script lang="ts">
  import Nested from './Nested.svelte';
</script>

<Nested />
```

- 将字符串变成HTML代码

```svelte
<p>{@html string}</p>
```

### 响应式

- 「状态」的创建和修改

> $... 被称作Runes（符文）

```svelte
<script>
  let count = $state(0);
  
  function increment() {
    count += 1;
  }
</script>
```

- 「深状态」

```svelte
<script>
  let numbers = $state([1, 2, 3, 4]);

  function addNumber() {
    numbers.push(numbers.length + 1);
  }
</script>
```

- 「派生状态」

```svelte
<script>
  let numbers = $state([1, 2, 3, 4]);
  let total = $derived(numbers.reduce((t, n) => t + n, 0));
</script>
```

- 状态「快照」

```svelte
<script>
  let numbers = $state([1, 2, 3, 4]);
  console.log($state.snapshot(numbers));
  
  // 使用 $inspect 在状态每次变化时自动记录快照
  $inspect(numbers).with(console.trace);
</script>
```

- 「副作用」

```svelte
<script>
  let elapsed = $state(0);
  let interval = $state(1000);

  $effect(() => {
    const id = setInterval(() => {
      elapsed += 1;
    }, interval);

    return () => clearInterval(id);
  });
</script>
```

- 在Svelte文件外使用「状态」

```js
export const counter = $state({
  count: 0
});
```

### 组件的「属性」

- 声明「属性」

```svelte
<script lang="ts">
  let { answer } = $props();
</script>
```

- 属性的默认值

```svelte
<script>
  let { answer = 'a mystery' } = $props();
</script>
```

- 传递属性

```svelte
<PackageInfo
  name={pkg.name}
  version={pkg.version}
  description={pkg.description}
  website={pkg.website}
/>

<!-- 语法糖 -->
<PackageInfo {...pkg} />
```

### HTML中的「逻辑」

- 分支（`#if`, `:else if`, `:else`, `/if`）

```svelte
{#if count > 10}
  <p>{count} is greater than 10</p>
{:else if count < 5}
  <p>{count} is less than 5</p>
{:else}
  <p>{count} is between 5 and 10</p>
{/if}
```

- 遍历（`#each as`）

```svelte
<div>
  {#each colors as color, i} <!-- i为可选 -->
    <button
      style="background: {color}"
      aria-label={color}
    >{i + 1}</button>
  {/each}
</div>
```

- 带「键」的遍历

```svelte
{#each things as thing (thing.id)}
  <Thing name={thing.name}/>
{/each}
```

- 异步

```svelte
{#await promise}
  <p>...rolling</p>
{:then number}
  <p>you rolled a {number}!</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<!-- 若promise不会被拒绝，catch可省略 -->
<!-- 若不需要在promise完成前显示内容，可以简写 -->
{#await promise then number}
  <p>you rolled a {number}!</p>
{/await}
```

### 事件

- 监听事件

```svelte
<!-- 语法：on<name> -->
<div onpointermove={onpointermove} />

<!-- 语法糖 -->
<div {onpointermove} />

<!-- 内联 -->
<div
  onpointermove={(event) => {
    m.x = event.clientX;
    m.y = event.clientY;
  }}
/>
```

- 使用「捕获」而非「冒泡」进行事件处理

```svelte
<div onkeydowncapture={(e) => alert(`<div> ${e.key}`)} >
  <input onkeydowncapture={(e) => alert(`<input> ${e.key}`)} />
</div>
```

- 组件向外传递Event Handler

```svelte
<script>
  let props = $props();
</script>

<button {...props}>
  Push
</button>
```

### （双向）绑定

- 语法

```svelte
<script>
  let value = $state('world');
  let a = $state(0);
  let b = $state(0);
</script>

<input bind:value={value} />

<!-- 语法糖 -->
<input bind:value />

<!-- 语法糖：a和b会被自动转换为number -->
<input type="number" bind:value={a} />
<input type="range" bind:value={b} min="0" max="10" />
```

- `bind:group`：单选/多选框

```svelte
<script>
  let scoops = $state(1);
  let flavours = $state([]);
</script>

<!-- scoops为被选中的value -->
{#each [1, 2, 3] as number}
  <label>
    <input
      type="radio"
      name="scoops"
      value={number}
      bind:group={scoops}
    />

    {number}
  </label>
{/each}

<!-- flavours为被选中的value的数组 -->
{#each ['a', 'b', 'c'] as flavour}
  <label>
    <input
      type="checkbox"
      name="flavours"
      value={flavour}
      bind:group={flavours}
    />

    {flavour}
  </label>
{/each}
```

- `<select multiple>`

```svelte
<select multiple bind:value={flavours}>
  {#each ['a', 'b', 'c'] as flavour}
    <option>{flavour}</option>
  {/each}
</select>
```

### 类与样式

- [clsx](https://github.com/lukeed/clsx)支持

```svelte
<button
  class={["card", { flipped }]}
  onclick={() => flipped = !flipped}
>
```

- `style:`

```svelte
<button
  class="card"
  style:transform={flipped ? 'rotateY(0)' : ''}
  style:--bg-1="palegoldenrod"
  style:--bg-2="black"
  style:--bg-3="goldenrod"
  onclick={() => flipped = !flipped}
>
```

- 在父组件中指定子组件样式

```svelte
<!-- 子组件 Box -->
<style>
  .box {
    background-color: var(--color, #ddd);
  }
</style>

<!-- 父组件 -->
<div class="boxes">
  <Box --color="red" />
  <Box --color="green" />
  <Box --color="blue" />
</div>
```

### Actions

```js
export function f(node) {
  // ...
}

export function g(node, param) {
  // ...
}
```

```svelte
<!-- 元素挂载后，调用该action -->
<div use:f use:g={/* 表达式 */}>
```

### 过渡动画

- 语法

```svelte
<script>
  import { fade, fly } from 'svelte/transition';

  let visible = $state(true);
</script>

<label>
  <input type="checkbox" bind:checked={visible} />
  visible
</label>

{#if visible}
  <p transition:fade>
    Fades in and out
  </p>

  <p transition:fly={{ y: 200, duration: 2000 }}>
    Flies in and out
  </p>

  <p in:fly={{ y: 200, duration: 2000 }} out:fade>
    Flies in, fades out
  </p>
{/if}
```

- 自定义CSS过渡动画

```svelte
<script>
  import { fade } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

  let visible = $state(true);

  function spin(node, { duration }) {
    return {
      duration,
      css: (t, u) => {
        const eased = elasticOut(t);

        return `
          transform: scale(${eased}) rotate(${eased * 1080}deg);
          color: hsl(
            ${Math.trunc(t * 360)},
            ${Math.min(100, 1000 * u)}%,
            ${Math.min(50, 500 * u)}%
          );`
      }
    };
  }
</script>
```

- 自定义JS过渡动画

- 自定义JS过渡动画

```js
function typewriter(node, { speed = 1 }) {
  const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

  if (!valid) {
    throw new Error(`This transition only works on elements with a single text node child`);
  }

  const text = node.textContent;
  const duration = text.length / (speed * 0.01);

  return {
    duration,
    tick: (t) => {
      const i = Math.trunc(text.length * t);
      node.textContent = text.slice(0, i);
    }
  };
}
```

- 过渡动画的事件

```svelte
<p
  transition:fly={{ y: 200, duration: 2000 }}
  onintrostart={() => status = 'intro started'}
  onoutrostart={() => status = 'outro started'}
  onintroend={() => status = 'intro ended'}
  onoutroend={() => status = 'outro ended'}
>
  Flies in and out
</p>
```

- 全局过渡

> 默认情况下，只有元素内部的内容的增删会触发过渡

```svelte
<div transition:slide|global>
  {item}
</div>
```

- Key block

> 通过彻底销毁并重建内容来强制触发过渡动画

```svelte
{#key i}
  <p in:typewriter={{ speed: 10 }}>
    {messages[i] || ''}
  </p>
{/key}
```

## Svelte 进阶

### 响应式进阶

- 原始状态

> 特点：属性和内容的变化不会触发更新

```svelte
let data = $state.raw(poll());
```

- 响应式的类

```js
class Box {
  width = $state(0);
  height = $state(0);
  area = $derived(this.width * this.height);

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  embiggen(amount) {
    this.width += amount;
    this.height += amount;
  }
}

class Box {
  #width = $state(0);
  #height = $state(0);
  area = $derived(this.#width * this.#height);

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  set width(value) {
    this.#width = Math.max(0, Math.min(MAX_SIZE, value));
  }

  set height(value) {
    this.#height = Math.max(0, Math.min(MAX_SIZE, value));
  }

  embiggen(amount) {
    this.width += amount;
    this.height += amount;
  }
}
```

- 自带的响应式的类

> 支持Map, Set, Date, URL, URLSearchParams

```js
import { SvelteDate } from 'svelte/reactivity';

let date = new SvelteDate();
```

- ~~store~~

### 内容复用

- `#snippet`

> snippet也可以作为属性传递给子组件

```svelte
<table>
  <tbody>
    {#snippet monkey(emoji, description)}
      <tr>
        <td>{emoji}</td>
        <td>{description}</td>
        <td>\u{emoji.charCodeAt(0).toString(16)}\u{emoji.charCodeAt(1).toString(16)}</td>
        <td>&amp#{emoji.codePointAt(0)}</td>
      </tr>
    {/snippet}

    {@render monkey('🙈', 'see no evil')}
    {@render monkey('🙉', 'hear no evil')}
    {@render monkey('🙊', 'speak no evil')}
  </tbody>
</table>
```

- 将snippet作为组件的属性

```svelte
<FilteredList
  data={colors}
  field="name"
  {header}
  {row}
></FilteredList>

{#snippet header()}
<!-- ... -->
{/snippet}

{#snippet row()}
<!-- ... -->
{/snippet}

<!-- 语法糖：在组件内部声明的snippet会自动成为这些组件的属性 -->
<FilteredList
  data={colors}
  field="name"
>
  {#snippet header()}
  <!-- ... -->
  {/snippet}

  {#snippet row()}
  <!-- ... -->
  {/snippet}
</FilteredList>
```

### 动效

- Tween

```svelte
<script>
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  let progress = new Tween(0, {
    duration: 400,
    easing: cubicOut
  });
</script>

<progress value={progress.current}></progress>

<button onclick={() => (progress.target = 0)}>
  0%
</button>

<button onclick={() => (progress.target = 1)}>
  100%
</button>
```

- Spring

```svelte
<script>
  import { Spring } from 'svelte/motion';

  let coords = new Spring({ x: 50, y: 50 }, {
    stiffness: 0.1,
    damping: 0.25
  });

  let size = new Spring(10);
</script>

<svg
  onmousemove={(e) => {
    coords.target = { x: e.clientX, y: e.clientY };
  }}
  onmousedown={() => (size.target = 30)}
  onmouseup={() => (size.target = 10)}
  role="presentation"
>
  <circle
    cx={coords.current.x}
    cy={coords.current.y}
    r={size.current}
  />
</svg>
```

### （双向）绑定进阶

- contenteditable

> 支持绑定textContent和innerHTML

```svelte
<div bind:innerHTML={html} contenteditable></div>
```

- each块

```svelte
{#each todos as todo}
  <li class={{ done: todo.done }}>
    <input
      type="checkbox"
      bind:checked={todo.done}
    />

    <input
      type="text"
      placeholder="What needs to be done?"
      bind:value={todo.text}
    />
  </li>
{/each}
```

- Media元素

```svelte
<audio
  {src}
  bind:currentTime={time}
  bind:duration
  bind:paused
></audio>
```

- Dimensions

> 支持clientWidth, clientHeight, offsetWidth, offsetHeight
>
> 只读绑定

```svelte
<div bind:clientWidth={w} bind:clientHeight={h}>
</div>
```

- DOM元素

> 只读绑定

```svelte
<script>
  let canvas;

  $effect(() => {
    const context = canvas.getContext('2d');
    // ...
  });
</script>

<canvas bind:this={canvas} width={32} height={32}></canvas>
```

- 让组件属性可绑定

```js
let { value = $bindable(''), onsubmit } = $props();
```

- 组件元素

```svelte
<!-- 子组件 -->
<script>
  export function f() {}
</script>

<!-- 父组件 -->
<script>
  let child;
</script>

<Child bind:this={child} />
<button onclick={child.f}>Button</button>
```

### 过渡动画进阶

- 延时过渡

```js
import { crossfade } from 'svelte/transition';
import { quintOut } from 'svelte/easing';

export const [send, receive] = crossfade({
  duration: (d) => Math.sqrt(d * 200),

  fallback(node, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration: 600,
      easing: quintOut,
      css: (t) => `
        transform: ${transform} scale(${t});
        opacity: ${t}
      `
    };
  }
});
```

```svelte
<li
  in:receive={{ key: todo.id }}
  out:send={{ key: todo.id }}
/>
```

- 动画（`animate:`）

> 为不进行过渡的元素提供动画效果

```svelte
<li
  class={{ done: todo.done }}
  in:receive={{ key: todo.id }}
  out:send={{ key: todo.id }}
  animate:flip
>
```

### Context

```svelte
<!-- 设置 -->
<script>
  import { setContext } from 'svelte';

  setContext('key', value);
</script>

<!-- 获取 -->
<script>
  import { getContext } from 'svelte';

  const value = getContext('key');
</script>
```

### 特殊元素

- `<svelte:window>`

  - 可添加事件监听器

  - 可绑定innerWidth, innerHeight, outerWidth, outerHeight, scrollX, scrollY, online（window.navigator.onLine）。除了scrollX和scrollY均为只读绑定

- `<svelte:document>`
  - 可添加事件监听器

- `<svelte:body>`
  - 可添加事件监听器

- `<svelte:head>`
  - 可以往HTML的`<head>`中加入内容
  - SSR模式下会与其他HTML内容分开返回

- `<svelte:element>`
  - 可通过`this`属性指定该元素的类型

```svelte
<script>
  const options = ['h1', 'h2', 'h3', 'p', 'marquee'];
  let selected = $state(options[0]);
</script>

<svelte:element this={selected}>
  I'm a <code>&lt;{selected}&gt;</code> element
</svelte:element>
```

- `<svelte:boundary>`
  - 可用于处理组件加载错误的情况

```svelte
<svelte:boundary onerror={(e) => console.error(e)}>
  <FlakyComponent />

  {#snippet failed(error, reset)}
    <p>Oops! {error.message}</p>
    <button onclick={reset}>Reset</button>
  {/snippet}
</svelte:boundary>
```

### `<script module>`

让代码从组件实例中分离出来

- 代码只会在模块首次被Evaluate的时候运行
- 可以使用export导出（但不能使用默认导出，因为默认导出是组件自身）

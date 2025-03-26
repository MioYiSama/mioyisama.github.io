# 移动设备安全区域、工具栏处理方案

```css
html, body {
  margin: 0;
  padding: 0;

  overflow: hidden;
}

html {
  width: 100vw; /* 兼容旧设备 */
  width: 100dvw; /* 兼容工具栏 */

  height: 100vh;
  height: 100dvh;

  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);

  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100%;
}
```
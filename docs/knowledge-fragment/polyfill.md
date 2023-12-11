# Polyfill 是什么

Polyfill 是指用于填充浏览器或其他环境中缺少的功能或API的代码。它可以在旧版本的浏览器或不支持某些功能的环境中，通过模拟或实现这些功能来使代码能够正常运行。

在 Web 开发中，Polyfill 通常用于填充浏览器对新的 JavaScript 语法、API或 HTML/CSS 特性的支持不完整或不支持的情况。通过引入Polyfill，开发者可以在旧版本的浏览器中使用新的语法和功能，以提供更好的用户体验和功能支持。

Polyfill 的实现通常是通过在代码中检测浏览器环境，然后根据需要加载相应的 Polyfill 代码。这些 Polyfill 代码会模拟或实现缺失的功能，使得代码在不支持该功能的环境中能够正常运行。

常见的 Polyfill 库包括 Babel、core-js、polyfill.io 等，它们提供了一系列的 Polyfill 代码，覆盖了各种浏览器和环境中的缺失功能。
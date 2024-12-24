---
lang: es_ES
author: pico190
---

# ¿Por qué los temas son desarrollados en CSS y no en JavaScript?

> [!WARNING]
> This page doesn't have an english version. It's only available in <u>spanish</u>.

Para crear un tema en codemirror, **es necesario usar JavaScript**, y nosotros para crear temas, **te lo ofrecemos para hacer en css**. Pero, ¿por qué?

Es muy sencillo: **hacerlo en css te permite editar mas cosas aparte de el editor**, como decidir si quieres que un elemento se muestre o no, y otras cosas.

También, los editores de código **te ayudarán mas si es CSS que si es JavaScript**, y aparte, css es **mucho mas facil de aplicar internamente que JavaScript**.

Por algunos terminos más, hemos decidido desarrollar las extensiones de temas de AiraCloud en CSS. Y es por eso que la función de `createTheme` no es utilizada para

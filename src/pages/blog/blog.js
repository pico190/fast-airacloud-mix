// region DISCONTINUED
/**
 * ! Warning: This file is being discontinued and abandoned. The forum idea it **maybe** will
 * ! be developed later.
 */

import "./blog.css";

function renderMarkdown(content) {
  document.querySelector("#app").innerHTML = content;
}
export default function Load(url) {
  switch (url[2]) {
    case null:
    case undefined:
    case "":
      document.querySelector("#app").innerHTML = `Soon`;
      break;
    case "how-to-create-an-extension":
      import("./tutorials/extension.js").then((content) => {
        var content = content.default;
        renderMarkdown(content());
      });
      break;
    default:
      document.querySelector("#app").innerHTML = `Not found`;
      break;
  }
}

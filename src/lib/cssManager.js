import { encode } from "js-base64";

/**
 * Adds a piece of css code to the web, that can be easily deleted
 * @param {*} token - A token to delete the css piece of code when required
 * @param {*} css - The css code
 */
export function addCss(token, css) {
  var cssElem = document.createElement("style");
  cssElem.id = "csstoken-" + encode(token);
  cssElem.innerHTML = css;
  document.body.appendChild(cssElem);
}

/**
 * The correspondent function to delete a already-existing css piece of code created with `addCss(...)`.
 * @param {*} token - The token of the piece of css to delete.
 */
export function removeCss(token) {
  var cssElem = document.getElementById("csstoken-" + encode(token));
  if (cssElem) {
    cssElem.remove();
  }
}

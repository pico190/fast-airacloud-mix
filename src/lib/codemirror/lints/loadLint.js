import { jslint, csslint, jsonlint, phplint, editorislang, pylint } from "../langs";
import phpLinter from "./php";
// import jsLinter from "./js";
import jsonLinter from "./json";
import { console_custom } from "../../debug/console";
import jsLinter from "./js.js";
import pythonLinter from "./python.js";

var cssLinter = null;
import("./css.js").then((module) => {
  console_custom(
    "Linter",
    "CSS Big Offline Linter imported.",
    "rgba(163, 8, 8, 0.25)"
  );
  cssLinter = module.default;
});
/**
 * Selects the linter of the correspondent lang. Then, it executes a function that loads
   the lintmsg.js function file
 * @param {String} val - The code of the file 
 * @param {Function} errorsfunc - A function to execute when the lint is completed. 
 */
export default function loadLint(val, errorsfunc) {
  if (!document.querySelector(".cm-placeholder, .cm-gap")) {
    if (editorislang(csslint)) {
      if (cssLinter) {
        cssLinter(val, errorsfunc);
      }
    } else if (editorislang(jslint)) {
      jsLinter(val, errorsfunc)
    } else if (editorislang(pylint)) {
      pythonLinter(val, errorsfunc)
    } else if (editorislang(jsonlint)) {
      jsonLinter(val, errorsfunc);
    } else if (editorislang(phplint)) {
      phpLinter(val, errorsfunc);
    }
  }
}

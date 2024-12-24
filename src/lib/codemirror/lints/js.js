import {basicSetup, EditorView} from "codemirror";
import {javascript, esLint} from "@codemirror/lang-javascript";
import globals from "globals";

// Uses linter.mjs
import * as eslint from "eslint-linter-browserify";

const rules = {
  semi: ["error", "never"],
};

/**
 * Function to run eslint for linting a JS file
 * @param {string} fullcode - The full JS code to be linted
 * @param {function} errors - Function to execute when done
 */
export default function jsLinter(fullcode, errors) {
  var result = [];
  const linter = new eslint.Linter();

  const messages = linter.verify(fullcode, {
    rules: rules
  }, { filename: document.querySelector(".sbfile-open").innerText });

  messages.forEach(message => {
    if (!message.message.toLowerCase().startsWith("extra semicolon")) {
      result.push({
        line: message.line,
        index: message.column,
        code: fullcode.split("\n")[message.line - 1],
        message: message.message,
        type: message.fatal ? "error" : "warning"
      })
    }
  })
  
  errors(result);
}

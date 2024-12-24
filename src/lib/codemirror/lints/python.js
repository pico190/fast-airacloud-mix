/*
Swiftly Open Source
- You can use this as you want
*/

import $ from "jquery"; // Importing jQuery library

/**
 * Function to lint python code and identify syntax errors
 * @param {string} fullcode - The full python code to be linted
 * @param {function} errors - Function to set syntax errors
 */
export default function pythonLinter(fullcode, errors) {
    $.post("https://"+window.location.host+"/lint/python", {
        source: fullcode
    }, (data) => {
        var result = [];
        data.messages.forEach(error => {
            var erlines = error.detail.split("\n");
            if (erlines.length >= 3) {
                var message = erlines.splice(2).join("\n").trim();
                var column = erlines[1].split("").length - 2;
                result.push({
                    line: error.line,
                    index: column,
                    code: erlines[1],
                    message: message,
                    type: "error"
                })
            } else if (erlines.length <= 2) {
                result.push({
                    line: error.line,
                    index: 0,
                    code: fullcode.split("\n")[error.line - 1],
                    message: error.detail.replaceAll("Sorry: ", "").replaceAll("IndentationError", "indentation error"),
                    type: "error"
                })
            }
        })
        console.log(result);
        errors(result);
    })
}

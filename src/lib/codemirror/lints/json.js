/*
Swiftly Open Source
- You can use this as you want
*/

import $ from "jquery";
let translationsCache = null;

/**
 * Get JSON Translations
 * @returns {Object}
 */
function getTranslations() {
  if (translationsCache) {
    return $.Deferred().resolve(translationsCache).promise();
  }

  return $.ajax({
    url: "https://swiftlystatic.vercel.app/airacloud/intelli?syntax=json&lang=es&lint",
    method: "GET",
    dataType: "json",
  }).done((data) => {
    translationsCache = data;
  });
}

/**
 * Replaces the english error messages to another lang
 * @param {Object} errors - Errors
 * @param {Object} translations - All translated errors
 * @returns {Object} - Translated errors
 */
function replaceErrorMessages(errors, translations) {
  return errors.map((error) => {
    const translatedMessage = translations[error.message] || error.message;
    return { ...error, message: translatedMessage };
  });
}

/**
 * Function to lint JSON code and identify syntax errors
 * @param {string} fullcode - The full JSON code to be linted
 * @param {function} errors - Function to execute when done
 */
export default function jsonLinter(fullcode, errors) {
  getTranslations().done((translations) => {
    var result = [];
    try {
      JSON.parse(fullcode);
    } catch (err) {
      var line = parseInt(
        err.message.split("line")[1].split("column")[0].trim()
      );
      var index = parseInt(
        err.message.split("column")[1].split("of")[0].trim()
      );
      var clines = fullcode.split("\n");
      var message = err.message;

      if (message.includes("expected double-quoted property name")) {
        message = "expected double-quoted property name";
        line -= 1;
        var linesplit = clines[line - 1].split("");
        index = linesplit.length;
      }

      result.push({
        line: line,
        index: index,
        code: fullcode.split("\n")[line - 1],
        message: message
          .split("at line")[0]
          .replace(" in object", ".")
          .replace("JSON.parse: ", ""),
        type: "error"
      });

      result = replaceErrorMessages(result, translations);
    }

    errors(result);
  });
}
